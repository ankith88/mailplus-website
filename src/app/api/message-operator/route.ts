import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import nodemailer from 'nodemailer'

function extractCleanEmail(toField: string): string {
  const match = toField.match(/<([^>]+)>/)
  if (match) {
    return match[1].trim().toLowerCase()
  }
  return toField.split(',')[0].trim().toLowerCase()
}

function isInternalRecipient(toField: string): boolean {
  if (!toField) return false
  const parts = toField.split(',')
  for (const part of parts) {
    const match = part.match(/<([^>]+)>/)
    const email = match ? match[1].trim().toLowerCase() : part.trim().toLowerCase()
    if (email && !email.endsWith('@mailplus.com.au')) {
      return false
    }
  }
  return true
}

async function sendPhysicalEmail({
  to,
  subject,
  html,
  customFrom,
  cc,
  bcc,
  prospectPlusId,
}: {
  to: string
  subject: string
  html: string
  customFrom?: string
  cc?: string
  bcc?: string
  prospectPlusId?: string
}): Promise<{ success: boolean; simulated: boolean; error?: string }> {
  try {
    const configSnap = await adminDb.collection('outlook_integrations').doc('active_config').get()
    if (!configSnap.exists) {
      console.warn('[Email Dispatcher] No active config found. Defaulting to simulation mode.')
      return { success: true, simulated: true }
    }

    const config = configSnap.data()
    if (!config) {
      return { success: true, simulated: true }
    }

    const { type, senderEmail } = config
    const finalSender = (customFrom && customFrom.endsWith('@mailplus.com.au')) ? customFrom : senderEmail

    let updatedHtml = html
    if (prospectPlusId && !isInternalRecipient(to)) {
      const idBadge = `<div class="prospectplus-id-badge" style="float: right; font-size: 10px; color: #a0aec0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 5px 10px; text-align: right; user-select: all;">ID: ${prospectPlusId}</div><div style="clear: both;"></div>`
      const bodyIndex = html.toLowerCase().indexOf('<body')
      if (bodyIndex !== -1) {
        const bodyTagEnd = html.indexOf('>', bodyIndex)
        if (bodyTagEnd !== -1) {
          updatedHtml = html.slice(0, bodyTagEnd + 1) + '\n' + idBadge + html.slice(bodyTagEnd + 1)
        } else {
          updatedHtml = idBadge + html
        }
      } else {
        updatedHtml = idBadge + html
      }
    }

    if (type === 'smtp') {
      const { host, port, username, password } = config
      if (!host || host.includes('example.com') || !password || password === 'invalid' || password === 'test' || password === '') {
        console.log('[Email Dispatcher] SMTP using mock/placeholder credentials. Running in Simulation mode.')
        return { success: true, simulated: true }
      }

      const transporter = nodemailer.createTransport({
        host,
        port: parseInt(port || '587', 10),
        secure: config.secure === 'ssl',
        auth: {
          user: username || senderEmail,
          pass: password
        },
        tls: {
          rejectUnauthorized: false
        }
      })

      await transporter.sendMail({
        from: `"${config.senderName || 'MailPlus Outbound'}" <${finalSender}>`,
        to,
        cc,
        bcc,
        subject,
        html: updatedHtml
      })

      return { success: true, simulated: false }
    } else if (type === 'graph') {
      const { clientId, tenantId, clientSecret } = config
      if (!clientId || !tenantId || !clientSecret || clientSecret === 'invalid' || clientSecret === 'test' || clientSecret === '') {
        console.log('[Email Dispatcher] MS Graph using mock/placeholder credentials. Running in Simulation mode.')
        return { success: true, simulated: true }
      }

      const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`
      const tokenBody = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default'
      })

      const tokenRes = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: tokenBody.toString()
      })

      if (!tokenRes.ok) {
        const errText = await tokenRes.text()
        throw new Error(`Azure AD Auth Failed: ${errText}`)
      }

      const tokenData = await tokenRes.json()
      const accessToken = tokenData.access_token

      const sendMailUrl = `https://graph.microsoft.com/v1.0/users/${finalSender}/sendMail`
      const mailPayload: any = {
        message: {
          subject,
          body: {
            contentType: 'HTML',
            content: updatedHtml
          },
          toRecipients: to.split(',').map(e => ({ emailAddress: { address: e.trim() } }))
        },
        saveToSentItems: 'true'
      }

      if (cc) {
        mailPayload.message.ccRecipients = cc.split(',').map(e => ({ emailAddress: { address: e.trim() } }))
      }
      if (bcc) {
        mailPayload.message.bccRecipients = bcc.split(',').map(e => ({ emailAddress: { address: e.trim() } }))
      }

      const graphRes = await fetch(sendMailUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mailPayload)
      })

      if (!graphRes.ok) {
        const errText = await graphRes.text()
        throw new Error(`Microsoft Graph API Failed: ${errText}`)
      }

      return { success: true, simulated: false }
    }

    return { success: true, simulated: true }
  } catch (error: any) {
    console.error('[Email Dispatcher] Real Email Transmission Failed:', error)
    return { success: false, simulated: false, error: error.message || 'Transmission failure.' }
  }
}

async function findCompanyAndFranchisee(customerid: string) {
  const companiesRef = adminDb.collection('companies')
  let companySnap = await companiesRef.where('internalid', '==', customerid).limit(1).get()

  if (companySnap.empty) {
    const numId = parseInt(customerid, 10)
    if (!isNaN(numId)) {
      companySnap = await companiesRef.where('internalid', '==', numId).limit(1).get()
    }
  }

  let isLead = false
  let companyDoc = !companySnap.empty ? companySnap.docs[0] : null

  if (!companyDoc) {
    // Try searching the leads collection
    const leadsRef = adminDb.collection('leads')
    let leadSnap = await leadsRef.where('internalid', '==', customerid).limit(1).get()
    if (leadSnap.empty) {
      const numId = parseInt(customerid, 10)
      if (!isNaN(numId)) {
        leadSnap = await leadsRef.where('internalid', '==', numId).limit(1).get()
      }
    }
    if (!leadSnap.empty) {
      companyDoc = leadSnap.docs[0]
      isLead = true
    }
  }

  if (!companyDoc) {
    return { company: null, franchisee: null }
  }

  const companyData = companyDoc.data()
  const companyId = companyDoc.id
  const collectionName = isLead ? 'leads' : 'companies'

  let franchiseeData: any = null
  if (companyData.franchisee_id) {
    const franchiseeDoc = await adminDb.collection('franchisees').doc(companyData.franchisee_id).get()
    if (franchiseeDoc.exists) {
      franchiseeData = franchiseeDoc.data()
    }
  }

  return {
    company: {
      id: companyId,
      collectionName,
      ...companyData
    } as any,
    franchisee: franchiseeData
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const customerid = searchParams.get('customerid')
    const loginemail = searchParams.get('loginemail')

    if (!customerid || !loginemail) {
      return NextResponse.json({ error: 'Missing customerid or loginemail' }, { status: 400 })
    }

    const { company, franchisee } = await findCompanyAndFranchisee(customerid)

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    return NextResponse.json({
      companyName: company.companyName,
      prospectPlusId: company.prospectPlusId,
      franchiseeName: franchisee?.name || company.franchisee || 'Linked Franchisee',
      franchiseeEmail: franchisee?.email || null
    })
  } catch (error: any) {
    console.error('Error verifying customer:', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { customerid, loginemail, message } = await request.json()

    if (!customerid || !loginemail || !message) {
      return NextResponse.json({ error: 'Missing customerid, loginemail, or message' }, { status: 400 })
    }

    const { company, franchisee } = await findCompanyAndFranchisee(customerid)

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    const franchiseeEmail = franchisee?.email
    if (!franchiseeEmail) {
      return NextResponse.json({ error: 'Franchisee email address not found.' }, { status: 404 })
    }

    // Format the email body
    const emailHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #2d3748;
        line-height: 1.6;
        padding: 20px;
        margin: 0;
        background-color: #f7fafc;
      }
      .container {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        border: 1px solid #e2e8f0;
        max-width: 600px;
        margin: 0 auto;
        padding: 30px;
        position: relative;
      }
      .top-right {
        float: right;
        font-size: 11px;
        color: #a0aec0;
        text-align: right;
        margin-bottom: 20px;
      }
      .clear {
        clear: both;
      }
      h2 {
        color: #095c7b;
        font-size: 20px;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 20px;
        border-bottom: 2px solid #edf2f7;
        padding-bottom: 10px;
      }
      .field {
        margin-bottom: 12px;
      }
      .label {
        font-weight: bold;
        color: #4a5568;
        display: inline-block;
        width: 120px;
      }
      .value {
        color: #2d3748;
      }
      .message-box {
        background-color: #f7fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 15px;
        margin-top: 20px;
        white-space: pre-wrap;
        color: #2d3748;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="top-right">ID: ${company.prospectPlusId || 'N/A'}</div>
      <div class="clear"></div>
      <h2>Message from Customer</h2>
      <div class="field">
        <span class="label">Company:</span>
        <span class="value">${company.companyName}</span>
      </div>
      <div class="field">
        <span class="label">Customer ID:</span>
        <span class="value">${customerid}</span>
      </div>
      <div class="field">
        <span class="label">Login Email:</span>
        <span class="value">${loginemail}</span>
      </div>
      <div class="message-box">${message}</div>
    </div>
  </body>
</html>
    `

    const subject = `Message from Customer: ${company.companyName}`

    // Send the email
    const sendResult = await sendPhysicalEmail({
      to: franchiseeEmail,
      subject,
      html: emailHtml,
      prospectPlusId: company.prospectPlusId
    })

    if (!sendResult.success) {
      return NextResponse.json({ error: sendResult.error || 'Failed to dispatch email.' }, { status: 500 })
    }

    // Log the sent email and action details in Firestore
    try {
      const companyRef = adminDb.collection(company.collectionName).doc(company.id)
      
      // Log to emails subcollection
      await companyRef.collection('emails').add({
        subject,
        bodyHtml: emailHtml,
        sentAt: new Date().toISOString(),
        sender: 'system@mailplus.com.au',
        recipient: franchiseeEmail,
        status: sendResult.simulated ? 'simulated' : 'sent'
      })

      // Log to activity subcollection
      await companyRef.collection('activity').add({
        type: 'Email',
        date: new Date().toISOString(),
        notes: `Sent email message to franchisee (${franchiseeEmail}). Subject: "${subject}".`,
        author: 'Customer Portal'
      })
    } catch (logError) {
      console.error('Failed to log email activities in Firestore:', logError)
    }

    return NextResponse.json({
      success: true,
      message: 'Email dispatched successfully.',
      simulated: sendResult.simulated
    })
  } catch (error: any) {
    console.error('Error sending message to operator:', error)
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 })
  }
}
