import admin from 'firebase-admin'

if (!admin.apps.length) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mailplus-outbound-leads-crm'
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY

  if (clientEmail && privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
      projectId
    })
  } else {
    try {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        projectId
      })
    } catch (error) {
      console.warn('[Firebase Admin] Failed to initialize with applicationDefault, falling back to default config:', error)
      admin.initializeApp({
        projectId
      })
    }
  }
}

export const adminDb = admin.firestore()
export { admin }
