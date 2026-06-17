export interface LeadPayload {
  companyName: string;
  customerPhone: string;
  customerServiceEmail: string;
  interestedIn: string;
  weeklyParcels: string;
  bucket: string;
  address: {
    address1: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    latitude: number;
    longitude: number;
  };
  contacts: {
    name: string;
    email: string;
    phone: string;
  }[];
}

export interface LeadResponse {
  success: boolean;
  id?: string;
  isDuplicate?: boolean;
  syncedWithNetSuite?: boolean;
  outOfTerritory?: boolean;
  message?: string;
}

export async function submitLead(data: LeadPayload): Promise<LeadResponse> {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error('Failed to submit lead', await res.text());
      return { success: false, message: 'Server error' };
    }

    return await res.json();
  } catch (err) {
    console.error('Error submitting lead', err);
    return { success: false, message: 'Network error' };
  }
}
