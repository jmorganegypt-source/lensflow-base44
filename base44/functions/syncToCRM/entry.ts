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

    const customer = await base44.entities.Customer.get(customerId);
    if (!customer) {
      return Response.json({ error: 'Customer not found' }, { status: 404 });
    }

    if (customer.crm_type === 'none') {
      return Response.json({ error: 'No CRM configured for this customer' }, { status: 400 });
    }

    if (customer.crm_type === 'hubspot') {
      return await syncToHubSpot(customer, customerId);
    } else if (customer.crm_type === 'salesforce') {
      return await syncToSalesforce(customer, customerId);
    }

    return Response.json({ error: 'Invalid CRM type' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function syncToHubSpot(customer, customerId) {
  const hubspotToken = Deno.env.get('HUBSPOT_API_TOKEN');
  if (!hubspotToken) {
    return Response.json({ error: 'HubSpot API token not configured' }, { status: 500 });
  }

  const contactData = {
    properties: {
      firstname: customer.customer_name.split(' ')[0] || '',
      lastname: customer.customer_name.split(' ')[1] || '',
      email: customer.email,
      phone: customer.phone,
      address: customer.property_address,
    },
  };

  let hubspotContactId = customer.hubspot_contact_id;

  if (!hubspotContactId) {
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
  const base44 = createClientFromRequest(new Request('http://localhost'));
  
  await base44.asServiceRole.entities.Customer.update(customerId, {
    hubspot_contact_id: hsData.id,
    synced_to_crm: true,
  });

  return Response.json({ success: true, contactId: hsData.id });
}

async function syncToSalesforce(customer, customerId) {
  const sfToken = Deno.env.get('SALESFORCE_API_TOKEN');
  const sfInstance = Deno.env.get('SALESFORCE_INSTANCE_URL');
  
  if (!sfToken || !sfInstance) {
    return Response.json({ error: 'Salesforce credentials not configured' }, { status: 500 });
  }

  const contactData = {
    FirstName: customer.customer_name.split(' ')[0] || '',
    LastName: customer.customer_name.split(' ')[1] || '',
    Email: customer.email,
    Phone: customer.phone,
    BillingStreet: customer.property_address,
  };

  let salesforceContactId = customer.salesforce_contact_id;

  if (!salesforceContactId) {
    const searchRes = await fetch(
      `${sfInstance}/services/data/v57.0/search/?q=SELECT+Id+FROM+Contact+WHERE+Email='${encodeURIComponent(customer.email)}'`,
      {
        headers: { 'Authorization': `Bearer ${sfToken}` },
      }
    );

    const searchData = await searchRes.json();
    if (searchData.records && searchData.records.length > 0) {
      salesforceContactId = searchData.records[0].Id;
    }
  }

  let apiRes;
  if (salesforceContactId) {
    apiRes = await fetch(
      `${sfInstance}/services/data/v57.0/sobjects/Contact/${salesforceContactId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${sfToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      }
    );
  } else {
    apiRes = await fetch(
      `${sfInstance}/services/data/v57.0/sobjects/Contact`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sfToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      }
    );
  }

  if (!apiRes.ok) {
    const error = await apiRes.json();
    return Response.json({ error: error.message || 'Salesforce sync failed' }, { status: apiRes.status });
  }

  const sfData = await apiRes.json();
  const base44 = createClientFromRequest(new Request('http://localhost'));
  
  await base44.asServiceRole.entities.Customer.update(customerId, {
    salesforce_contact_id: sfData.id,
    synced_to_crm: true,
  });

  return Response.json({ success: true, contactId: sfData.id });
}