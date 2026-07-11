import { NextResponse } from 'next/server';
import { getFirebaseClient } from '@/lib/firebase/client';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const identifier = searchParams.get('id')?.trim();

  if (!identifier) {
    return NextResponse.json({ error: 'Missing package identifier' }, { status: 400 });
  }

  try {
    const { db } = getFirebaseClient();
    const packagesRef = collection(db, 'packages');

    // Search by code (barcode), order_number, or connote_numbers (array)
    let pkgDoc = null;

    const qCode = query(packagesRef, where('code', '==', identifier), limit(1));
    const snapCode = await getDocs(qCode);
    if (!snapCode.empty) {
      pkgDoc = snapCode.docs[0];
    }

    if (!pkgDoc) {
      const qOrder = query(packagesRef, where('order_number', '==', identifier), limit(1));
      const snapOrder = await getDocs(qOrder);
      if (!snapOrder.empty) {
        pkgDoc = snapOrder.docs[0];
      }
    }

    if (!pkgDoc) {
      const qConnote = query(packagesRef, where('connote_numbers', 'array-contains', identifier), limit(1));
      const snapConnote = await getDocs(qConnote);
      if (!snapConnote.empty) {
        pkgDoc = snapConnote.docs[0];
      }
    }

    if (!pkgDoc) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    const pkgData = pkgDoc.data();
    const scans = pkgData.scans || [];
    let latestScan = null;

    if (scans.length > 0) {
      latestScan = scans.reduce((latest: any, current: any) => {
        const latestTime = latest.updated_at ? new Date(latest.updated_at).getTime() : 0;
        const currentTime = current.updated_at ? new Date(current.updated_at).getTime() : 0;
        return latestTime > currentTime ? latest : current;
      }, scans[0]);
    }

    // Extract receiver name
    const receiverName = latestScan?.receiver_name || pkgData.receiver_name || '';

    // Extract and format receiver address
    const addressParts = [
      latestScan?.address1 || pkgData.address1,
      latestScan?.address2 || pkgData.address2,
      latestScan?.receiver_suburb || pkgData.receiver_suburb || pkgData.suburb,
      latestScan?.state || pkgData.state,
      latestScan?.post_code || pkgData.post_code || pkgData.postcode
    ].filter(Boolean);

    const receiverAddress = addressParts.join(', ');
    const receiverPhone = latestScan?.phone || pkgData.receiver_phone || pkgData.phone || '';

    // Resolve customer/company details using customer_ns_id from scans
    let customerNsId = pkgData.customer_ns_id || null;
    if (!customerNsId && scans.length > 0) {
      const scanWithNsId = scans.find((s: any) => s.customer_ns_id);
      if (scanWithNsId) customerNsId = scanWithNsId.customer_ns_id;
    }

    let customerCompany = '';
    let customerAccountNumber = '';

    if (customerNsId) {
      const companiesRef = collection(db, 'companies');
      const qComp = query(companiesRef, where('internalid', '==', String(customerNsId)), limit(1));
      const compSnap = await getDocs(qComp);
      let compDoc = compSnap.empty ? null : compSnap.docs[0];

      if (!compDoc) {
        const qCompInt = query(companiesRef, where('internalid', '==', parseInt(String(customerNsId))), limit(1));
        const compSnapInt = await getDocs(qCompInt);
        if (!compSnapInt.empty) {
          compDoc = compSnapInt.docs[0];
        }
      }

      if (compDoc) {
        const compData = compDoc.data();
        customerCompany = compData.companyName || '';
        customerAccountNumber = compData.customerEntityId || compData.entityId || String(customerNsId);
      }
    }

    return NextResponse.json({
      trackingIdentifier: pkgData.code || identifier,
      receiverDetails: {
        name: receiverName,
        address: receiverAddress,
        phone: receiverPhone
      },
      customerDetails: {
        company: customerCompany,
        accountNumber: customerAccountNumber
      }
    });

  } catch (error) {
    console.error('Error looking up package:', error);
    return NextResponse.json({ error: 'Failed to lookup package' }, { status: 500 });
  }
}
