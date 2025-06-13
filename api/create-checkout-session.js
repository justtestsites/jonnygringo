import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Map your frontend plan IDs to Stripe Price IDs (set these in Vercel env vars)
const priceIdMap = {
  'mix-match-biweekly': process.env.STRIPE_PRICE_ID_MIX_MATCH_BIWEEKLY,
  'mild-spicy-monthly': process.env.STRIPE_PRICE_ID_MILD_SPICY_MONTHLY,
  'mild-2-biweekly': process.env.STRIPE_PRICE_ID_MILD_2_BIWEEKLY,
  'spicy-2-biweekly': process.env.STRIPE_PRICE_ID_SPICY_2_BIWEEKLY,
  'mild-2-monthly': process.env.STRIPE_PRICE_ID_MILD_2_MONTHLY,
  'spicy-2-monthly': process.env.STRIPE_PRICE_ID_SPICY_2_MONTHLY,
  'mild-salsa': process.env.STRIPE_PRICE_ID_MILD_SALSA,
  'spicy-salsa': process.env.STRIPE_PRICE_ID_SPICY_SALSA,
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { planId, cartItems } = req.body;
  let session;

  try {
    if (planId) {
      // Handle subscription checkout
      const priceId = priceIdMap[planId];

      if (!priceId) {
        return res.status(400).json({ error: 'Invalid plan selected' });
      }

      session = await stripe.checkout.sessions.create({
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
    } else if (cartItems && cartItems.length > 0) {
      // Handle one-time product checkout
      const line_items = cartItems.map(item => {
        const priceId = priceIdMap[item.id];
        if (!priceId) {
          throw new Error(`Price ID not found for product: ${item.id}`);
        }
        return {
          price: priceId,
          quantity: item.quantity,
        };
      });

      session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: line_items,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cart`,
      });
    } else {
      return res.status(400).json({ error: 'No plan or cart items provided' });
    }

    return res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe error:', err);
    return res.status(500).json({ error: err.message });
  }
}; 