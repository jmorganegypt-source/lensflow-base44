import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14.21.0';

const PLANS = {
  starter: {
    name: "LensFlow Starter",
    amount: 7900, // AUD cents
    description: "AI Teleprompter, Mia script writer, Glamour Studio, 1080p exports",
  },
  elite: {
    name: "LensFlow Elite",
    amount: 19900,
    description: "Everything in Starter + Mia & Oliver avatars, 5 HD productions/mo, music library",
  },
  concierge: {
    name: "LensFlow Concierge",
    amount: 39900,
    description: "Everything in Elite + Custom AI presenter, voice clone, unlimited productions",
  },
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan, successUrl, cancelUrl } = await req.json();

    const planData = PLANS[plan];
    if (!planData) {
      return Response.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: planData.name,
              description: planData.description,
            },
            unit_amount: planData.amount,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 7,
        metadata: { userId: user.id, plan },
      },
      metadata: { userId: user.id, plan },
      success_url: successUrl || `${req.headers.get('origin')}/generate?subscribed=true`,
      cancel_url: cancelUrl || `${req.headers.get('origin')}/pricing`,
      allow_promotion_codes: true,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});