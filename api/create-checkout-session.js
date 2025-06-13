const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Map your frontend plan IDs to Stripe Price IDs (set these in Vercel env vars)
const priceIdMap = {
  'mix-match-biweekly': process.env.STRIPE_PRICE_ID_MIX_MATCH_BIWEEKLY,
  'mild-spicy-monthly': process.env.STRIPE_PRICE_ID_MILD_SPICY_MONTHLY,
  'mild-2-biweekly': process.env.STRIPE_PRICE_ID_MILD_2_BIWEEKLY,
  'spicy-2-biweekly': process.env.STRIPE_PRICE_ID_SPICY_2_BIWEEKLY,
  'mild-2-monthly': process.env.STRIPE_PRICE_ID_MILD_2_MONTHLY,
  'spicy-2-monthly': process.env.STRIPE_PRICE_ID_SPICY_2_MONTHLY,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { planId } = req.body;
  const priceId = priceIdMap[planId];

  if (!priceId) {
    return res.status(400).json({ error: 'Invalid plan selected' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/salsaclub`,
    });
    return res.status(200).json({ sessionId: session.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
} 