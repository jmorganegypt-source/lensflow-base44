import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { customerId } = await req.json();
    
    if (!customerId) {
      return Response.json({ error: 'Missing customerId' }, { status: 400 });
    }

    // Get the app user's HubSpot connection
    const { accessToken } = await base44.asServiceRole.connectors.getCurrentAppUserConnection('6a158d724efc9633889457e2');

    // Fetch customer data
    const customer = await base44.entities.Customer.get(customerId);
    
    if (!customer) {
      return Response.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Prepare contact data for HubSpot
    const contactData = {
      properties: [
        { property: 'firstname', value: customer.customer_name.split(' ')[0] },
        { property: 'lastname', value: customer.customer_name.split(' ').slice(1).join(' ') || '' },
        { property: 'email', value: customer.email },
        { property: 'phone', value: customer.phone },
        { property: 'street_address', value: customer.property_address },
      ]
    };

    let contactId = customer.hubspot_contact_id;

    // Search for existing contact by email
    if (!contactId) {
      const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: customer.email
                }
              ]
            }
          ],
          limit: 1
        })
      });

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (searchData.results && searchData.results.length > 0) {
          contactId = searchData.results[0].id;
        }
      }
    }

    // Create or update contact
    let hubspotRes;
    if (contactId) {
      hubspotRes = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });
    } else {
      hubspotRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });
    }

    if (!hubspotRes.ok) {
      return Response.json({ error: 'HubSpot sync failed' }, { status: 500 });
    }

    const hubspotData = await hubspotRes.json();
    contactId = hubspotData.id;

    // Update customer with HubSpot contact ID and sync status
    await base44.entities.Customer.update(customerId, {
      hubspot_contact_id: contactId,
      synced_to_crm: true
    });

    return Response.json({ success: true, contactId });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});