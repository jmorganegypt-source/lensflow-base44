import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const HUBSPOT_CONNECTOR_ID = '6a158d724efc9633889457e2';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { customerId } = await req.json();
    if (!customerId) {
      return Response.json({ error: 'customerId required' }, { status: 400 });
    }

    // Get customer record
    const customer = await base44.entities.Customer.get(customerId);
    if (!customer) {
      return Response.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Only sync to HubSpot
    if (customer.crm_type !== 'hubspot') {
      return Response.json({ error: 'Customer not configured for HubSpot sync' }, { status: 400 });
    }

    // Get app user's HubSpot connection
    const { accessToken } = await base44.asServiceRole.connectors.getCurrentAppUserConnection(HUBSPOT_CONNECTOR_ID);

    // Prepare contact data
    const properties = [
      { property: 'firstname', value: customer.customer_name.split(' ')[0] || '' },
      { property: 'lastname', value: customer.customer_name.split(' ').slice(1).join(' ') || '' },
      { property: 'email', value: customer.email },
      { property: 'phone', value: customer.phone },
    ];

    // Search for existing contact
    let existingContactId = customer.hubspot_contact_id;
    
    if (!existingContactId) {
      const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: customer.email,
                },
              ],
            },
          ],
          limit: 1,
        }),
      });

      const searchData = await searchRes.json();
      if (searchData.results && searchData.results.length > 0) {
        existingContactId = searchData.results[0].id;
      }
    }

    // Create or update contact
    let hubspotId = existingContactId;
    if (existingContactId) {
      // Update existing contact
      await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingContactId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      });
    } else {
      // Create new contact
      const createRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ properties }),
      });

      const createData = await createRes.json();
      hubspotId = createData.id;
    }

    // Update customer record with HubSpot ID and sync status
    await base44.entities.Customer.update(customerId, {
      hubspot_contact_id: hubspotId,
      synced_to_crm: true,
    });

    return Response.json({ success: true, hubspotId });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});