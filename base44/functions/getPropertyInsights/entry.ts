import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listingUrl, propertyAddress } = await req.json();

    if (!listingUrl || !propertyAddress) {
      return Response.json({ error: 'Missing listingUrl or propertyAddress' }, { status: 400 });
    }

    // Use InvokeLLM with web search to gather market data
    const marketDataResponse = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a real estate market analyst. Extract and analyze market data for this property listing and location:

Listing URL: ${listingUrl}
Property Address: ${propertyAddress}

Provide detailed market intelligence including:
1. Comparable recent sales (3-5 similar properties sold recently with price and date)
2. Current market velocity (hot/balanced/cool) and reasoning
3. Average days on market (DOM) for similar properties
4. Year-over-year price appreciation percentage
5. Primary buyer demographics for this area
6. Key market trends and insights
7. A compelling 1-2 sentence script enhancement that highlights market strength/opportunity

Format as structured JSON.`,
      add_context_from_internet: true,
      response_json_schema: {
        type: "object",
        properties: {
          comparable_sales: {
            type: "array",
            items: {
              type: "object",
              properties: {
                address: { type: "string" },
                price: { type: "number" },
                sold_date: { type: "string" }
              }
            }
          },
          market_velocity: { type: "string" },
          average_dom: { type: "number" },
          price_appreciation: { type: "number" },
          buyer_demographics: { type: "string" },
          market_insights: { type: "string" },
          script_enhancement: { type: "string" }
        }
      }
    });

    // Create PropertyInsights record
    const insights = await base44.entities.PropertyInsights.create({
      property_address: propertyAddress,
      listing_url: listingUrl,
      comparable_sales: marketDataResponse.comparable_sales || [],
      market_velocity: marketDataResponse.market_velocity || 'balanced',
      average_dom: marketDataResponse.average_dom || 0,
      price_appreciation: marketDataResponse.price_appreciation || 0,
      buyer_demographics: marketDataResponse.buyer_demographics || '',
      market_insights: marketDataResponse.market_insights || '',
      script_enhancement: marketDataResponse.script_enhancement || ''
    });

    return Response.json(insights);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});