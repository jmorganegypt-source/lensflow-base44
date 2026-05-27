import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { event, data } = await req.json();
    const reel = data;

    if (!reel || reel.status !== 'complete') {
      return Response.json({ message: 'Not a completed reel, skipping' }, { status: 200 });
    }

    // Get the customer/contact associated with this property
    const customers = await base44.entities.Customer.filter(
      { property_address: reel.property_address },
      '-created_date',
      1
    );

    if (!customers || customers.length === 0) {
      return Response.json({ message: 'No customer found for this property' }, { status: 200 });
    }

    const customer = customers[0];

    // Sync to HubSpot via app user connector
    const syncResult = await base44.functions.invoke('syncToCRMAppUser', {
      customerId: customer.id,
      reelId: reel.id,
      videoUrl: reel.video_url,
    });

    return Response.json({
      success: true,
      message: 'Reel synced to HubSpot contact',
      result: syncResult,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});