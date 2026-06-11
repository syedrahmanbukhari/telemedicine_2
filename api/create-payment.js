import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { amount, planName, patientName, patientEmail } = req.body

  console.log('[CREATE-PAYMENT] Request received:', { amount, planName, patientName, patientEmail })

  if (!amount || !patientName || !patientEmail) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Check if Stripe key is present
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('[CREATE-PAYMENT] ❌ STRIPE_SECRET_KEY not found in environment')
    return res.status(500).json({ error: 'Stripe configuration missing' })
  }

  console.log('[CREATE-PAYMENT] Using Stripe key:', process.env.STRIPE_SECRET_KEY.substring(0, 20) + '...')

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // in cents
      currency: 'usd',
      description: `Telemedicine Visit: ${planName}`,
      metadata: {
        patientName,
        patientEmail,
        planName,
      },
      receipt_email: patientEmail,
    })

    console.log('[CREATE-PAYMENT] ✅ Payment Intent created:', paymentIntent.id)

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('[CREATE-PAYMENT] ❌ Stripe error:', error.message, error.type)
    res.status(500).json({
      error: error.message || 'Payment failed. Please try again.',
    })
  }
}
