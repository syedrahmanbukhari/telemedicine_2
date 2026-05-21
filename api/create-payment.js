import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { amount, planName, patientName, patientEmail } = req.body

  if (!amount || !patientName || !patientEmail) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

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

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Stripe payment error:', error)
    res.status(500).json({
      error: error.message || 'Payment failed. Please try again.',
    })
  }
}
