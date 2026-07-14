import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mailplus-outbound-leads-crm'
  })
}

export const adminDb = admin.firestore()
export { admin }
