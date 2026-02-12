import express from 'express';
import Stripe from 'stripe';

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Create payment intent
router.post('/create-intent', async (req: express.Request, res: express.Response) => {
  try {
    const { amount, currency, bookingId, description } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        bookingId: bookingId || '',
        description: description || 'World Cup Store Purchase',
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: error.message || 'Payment failed' });
  }
});

// Confirm payment
router.post('/confirm', async (req: express.Request, res: express.Response) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      status: paymentIntent.status,
      paymentIntent,
    });
  } catch (error: any) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ error: error.message || 'Confirmation failed' });
  }
});

// Webhook for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req: express.Request, res: express.Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded:', paymentIntent.id);
        // Update booking status, send confirmation email, etc.
        break;
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedPayment.id);
        // Handle failed payment
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    res.status(400).json({ error: `Webhook Error: ${error.message}` });
  }
});

// Get payment history
router.get('/history', async (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.query;

    // In production, fetch from database
    res.json({
      payments: [],
      message: 'Payment history endpoint - requires database integration',
    });
  } catch (error: any) {
    console.error('Payment history error:', error);
    res.status(500).json({ error: error.message || 'Failed to get history' });
  }
});

// Refund
router.post('/refund', async (req: express.Request, res: express.Response) => {
  try {
    const { paymentIntentId, reason } = req.body;

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: reason as Stripe.RefundCreateParams.Reason || 'requested_by_customer',
    });

    res.json({ refund });
  } catch (error: any) {
    console.error('Refund error:', error);
    res.status(500).json({ error: error.message || 'Refund failed' });
  }
});

export default router;
