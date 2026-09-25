import { getAccessToken } from './firebase';

export interface GoogleContact {
  resourceName: string;
  etag: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  photoUrl?: string;
}

export async function fetchGoogleContacts(): Promise<GoogleContact[]> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Google Workspace OAuth token not available. Please sign in with Google to grant Contacts access.');
  }

  const response = await fetch(
    'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses,phoneNumbers,organizations,photos&pageSize=100',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google People API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const connections = data.connections || [];

  return connections.map((person: any): GoogleContact => {
    const nameObj = person.names?.[0];
    const emailObj = person.emailAddresses?.[0];
    const phoneObj = person.phoneNumbers?.[0];
    const orgObj = person.organizations?.[0];
    const photoObj = person.photos?.[0];

    return {
      resourceName: person.resourceName || '',
      etag: person.etag || '',
      name: nameObj?.displayName || 'Unnamed Contact',
      email: emailObj?.value || '',
      phone: phoneObj?.value || '',
      company: orgObj?.name || 'Acme Co.',
      jobTitle: orgObj?.title || 'Team Member',
      photoUrl: photoObj?.url,
    };
  });
}

export async function createGoogleContact(contact: {
  givenName: string;
  familyName: string;
  email: string;
  phoneNumber?: string;
  jobTitle?: string;
  company?: string;
}): Promise<GoogleContact> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Google Workspace OAuth token not available.');
  }

  const payload = {
    names: [
      {
        givenName: contact.givenName,
        familyName: contact.familyName,
      },
    ],
    emailAddresses: [
      {
        value: contact.email,
        type: 'work',
      },
    ],
    ...(contact.phoneNumber
      ? {
          phoneNumbers: [
            {
              value: contact.phoneNumber,
              type: 'work',
            },
          ],
        }
      : {}),
    ...(contact.jobTitle || contact.company
      ? {
          organizations: [
            {
              name: contact.company || 'Gusto Partner',
              title: contact.jobTitle || 'Contractor',
            },
          ],
        }
      : {}),
  };

  const response = await fetch('https://people.googleapis.com/v1/people:createContact', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create Google Contact: ${errorText}`);
  }

  const data = await response.json();
  return {
    resourceName: data.resourceName || '',
    etag: data.etag || '',
    name: `${contact.givenName} ${contact.familyName}`,
    email: contact.email,
    phone: contact.phoneNumber || '',
    company: contact.company || '',
    jobTitle: contact.jobTitle || '',
  };
}
