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
      return Response.json({ error: 'customerId required' }, { status: 400 });
    }

    // Get customer
    const customer = await base44.entities.Customer.get(customerId);
    if (!customer) {
      return Response.json({ error: 'Customer not found' }, { status: 404 });
    }

    // Get HubSpot API token from environment
    const hubspotToken = Deno.env.get('HUBSPOT_API_TOKEN');
    if (!hubspotToken) {
      return Response.json({ error: 'HubSpot API token not configured' }, { status: 500 });
    }

    // Prepare contact data
    const contactData = {
      properties: {
        firstname: customer.customer_name.split(' ')[0] || '',
        lastname: customer.customer_name.split(' ')[1] || '',
        email: customer.email,
        phone: customer.phone,
        address: customer.property_address,
      },
    };

    // Check if contact exists by email
    let hubspotContactId = customer.hubspot_contact_id;

    if (!hubspotContactId) {
      // Search for existing contact
      const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hubspotToken}`,
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
        hubspotContactId = searchData.results[0].id;
      }
    }

    let apiRes;
    if (hubspotContactId) {
      // Update existing contact
      apiRes = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${hubspotContactId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${hubspotToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactData),
        }
      );
    } else {
      // Create new contact
      apiRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hubspotToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
    }

    if (!apiRes.ok) {
      const error = await apiRes.json();
      return Response.json({ error: error.message || 'HubSpot sync failed' }, { status: apiRes.status });
    }

    const hsData = await apiRes.json();
    const finalContactId = hsData.id;

    // Update customer with HubSpot ID
    await base44.entities.Customer.update(customerId, {
      hubspot_contact_id: finalContactId,
      synced_to_hubspot: true,
    });

    return Response.json({ success: true, contactId: finalContactId });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});