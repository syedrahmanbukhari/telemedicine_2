import { Client, Environment } from 'square'
import { randomUUID } from 'crypto'

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT === 'production'
    ? Environment.Production
    : Environment.Sandbox,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { sourceId, amount, planName, patientName, patientEmail } = req.body

  if (!sourceId || !amount) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const { result } = await client.paymentsApi.createPayment({
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: BigInt(amount), // in cents
        currency: 'USD',
      },
      locationId: process.env.SQUARE_LOCATION_ID,
      note: `Telemedicine Visit: ${planName} - ${patientName}`,
      buyerEmailAddress: patientEmail,
    })

    res.status(200).json({
      success: true,
      paymentId: result.payment.id,
      status: result.payment.status,
    })
  } catch (error) {
    console.error('Square payment error:', error)
    res.status(500).json({
      error: error.errors?.[0]?.detail || 'Payment failed. Please try again.',
    })
  }
}
