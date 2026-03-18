/**
 * NetSuite lead submission via JSONP.
 *
 * The endpoint doesn't support CORS so we use the same JSONP pattern
 * as the original jQuery.ajax call: inject a <script> tag, let the server
 * wrap the JSON response in the callback name, then clean up.
 */

const NS_URL =
  'https://1048144.extforms.netsuite.com/app/site/hosting/scriptlet.nl' +
  '?script=1652&deploy=1&compid=1048144' +
  '&ns-at=AAEJ7tMQpW2i4UkvmLt95ULLGNj-ZbdrrYceOVnqb2Qx_mxlvlw'

export interface NetSuitePayload {
  business_name?: string
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  postcode?: string
  lat?: string
  lng?: string
  avg_daily_shipments?: string
  services_of_interest?: string
  how_did_you_hear_about_us?: string
  current_carrier?: string
  pageURL?: string
  subscribe?: string
}

/* ─── Delivery support endpoint (script 1250) ──────────── */

const NS_DELIVERY_URL =
  'https://1048144.extforms.netsuite.com/app/site/hosting/scriptlet.nl' +
  '?script=1250&deploy=1&compid=1048144' +
  '&ns-at=AAEJ7tMQKbDU37GmGXMY7egpNDHZL4Ys3ArzZlM7X4cHVJ38PpQ'

export interface NetSuiteDeliveryPayload {
  barcode?: string
  company_name?: string
  first_name?: string
  del_first_name?: string
  last_name?: string
  del_last_name?: string
  email?: string
  phone_number?: string
  del_phone_number?: string
  issues?: string
  sender_or_receiver?: string
  addr1?: string
  addr2?: string
  city?: string
  state?: string
  postcode?: string
  comments?: string
}

export function submitDeliveryToNetSuite(payload: NetSuiteDeliveryPayload): Promise<unknown> {
  const params = Object.fromEntries(
    Object.entries(payload).map(([k, v]) => [k, v ?? ''])
  )
  return jsonpCall(NS_DELIVERY_URL, params)
}

/* ─── ShipMate support endpoint (script 1312) ──────────── */

const NS_SHIPMATE_URL =
  'https://1048144.extforms.netsuite.com/app/site/hosting/scriptlet.nl' +
  '?script=1312&deploy=1&compid=1048144' +
  '&ns-at=AAEJ7tMQcp3YPj3fVdexI_ktAY8qYCl1Mc3eWtVnDG4FSR8n4rM'

export interface NetSuiteShipMatePayload {
  company_name?: string
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
  comments?: string
}

export function submitShipMateToNetSuite(payload: NetSuiteShipMatePayload): Promise<unknown> {
  const params = Object.fromEntries(
    Object.entries(payload).map(([k, v]) => [k, v ?? ''])
  )
  return jsonpCall(NS_SHIPMATE_URL, params)
}

/* ─── Franchisee enquiry endpoint (script 1234) ────────── */

const NS_FRANCHISE_URL =
  'https://1048144.extforms.netsuite.com/app/site/hosting/scriptlet.nl' +
  '?script=1234&deploy=1&compid=1048144' +
  '&ns-at=AAEJ7tMQ7ScqEZZiDs8p6CCsVTKbbQXb3fXnFWd22HQLl0ozt3c'

export interface NetSuiteFranchisePayload {
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
  postcode?: string
  comments?: string
  investor_radio?: string
  owner_radio?: string
  seeking_employment_radio?: string
  residentialpostcode?: string
  vehicle?: string
  experience?: string
  employment_type?: string
  suburb?: string
  pathname?: string
}

export function submitFranchiseeToNetSuite(payload: NetSuiteFranchisePayload): Promise<unknown> {
  const params = Object.fromEntries(
    Object.entries(payload).map(([k, v]) => [k, v ?? ''])
  )
  return jsonpCall(NS_FRANCHISE_URL, params)
}

/* ─── Referral endpoint (script 1614) ──────────────────── */

const NS_REFER_URL =
  'https://1048144.extforms.netsuite.com/app/site/hosting/scriptlet.nl' +
  '?script=1614&deploy=1&compid=1048144' +
  '&ns-at=AAEJ7tMQnqTjJm5ls5M08ctD8YwsJDXQSbDfPmWHr1SBSppOtyo'

export interface NetSuiteReferralPayload {
  ref_first_name?: string
  ref_last_name?: string
  ref_email?: string
  ref_phone_number?: string
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
  postcode?: string
  comments?: string
  investor_radio?: string
  owner_radio?: string
  seeking_employment_radio?: string
  residentialpostcode?: string
  vehicle?: string
  experience?: string
  employment_type?: string
  suburb?: string
  pathname?: string
}

function jsonpCall(url: string, payload: Record<string, string>): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const cbName = `__ns_${Date.now()}_${Math.random().toString(36).slice(2)}`
    const qs = new URLSearchParams(payload).toString()
    const script = document.createElement('script')
    script.src = `${url}&${qs}&jsoncallback=${cbName}`

    const timer = setTimeout(() => {
      reject(new Error('NetSuite request timed out'))
      cleanup()
    }, 15_000)

    ;(window as unknown as Record<string, unknown>)[cbName] = (data: unknown) => {
      clearTimeout(timer)
      resolve(data)
      cleanup()
    }

    script.onerror = () => {
      clearTimeout(timer)
      reject(new Error('NetSuite request failed'))
      cleanup()
    }

    function cleanup() {
      delete (window as unknown as Record<string, unknown>)[cbName]
      script.parentNode?.removeChild(script)
    }

    document.body.appendChild(script)
  })
}

export function submitReferralToNetSuite(payload: NetSuiteReferralPayload): Promise<unknown> {
  const params = Object.fromEntries(
    Object.entries(payload).map(([k, v]) => [k, v ?? ''])
  )
  return jsonpCall(NS_REFER_URL, params)
}

export function submitToNetSuite(payload: NetSuitePayload): Promise<unknown> {
  const params = Object.fromEntries(
    Object.entries(payload).map(([k, v]) => [k, v ?? ''])
  )
  return jsonpCall(NS_URL, params)
}
