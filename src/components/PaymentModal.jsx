import { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

export default function PaymentModal({ plan, onClose }) {
  const stripe = useStripe()
  const elements = useElements()
  const [step, setStep] = useState('info') // 'info' | 'pay' | 'success' | 'error'
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const amountCents = plan.amountCents

  // Check if Stripe is loaded
  if (!stripe || !elements) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-black text-gray-800 mb-2">Payment Not Available</h3>
          <p className="text-gray-500 text-sm mb-6">Stripe is not properly configured. Please check your environment variables.</p>
          <button onClick={onClose}
            className="bg-gray-100 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105">
            Close
          </button>
        </div>
      </div>
    )
  }

  const handleInfoSubmit = (e) => {
    e.preventDefault()
    setStep('pay')
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setErrorMsg('')

    try {
      // Create Payment Intent on backend
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountCents,
          planName: plan.title,
          patientName: form.name,
          patientEmail: form.email,
        }),
      })

      const data = await res.json()
      if (!data.clientSecret) {
        throw new Error(data.error || 'Failed to create payment intent')
      }

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: form.name,
            email: form.email,
          },
        },
      })

      if (error) {
        setErrorMsg(error.message || 'Payment failed.')
        setStep('error')
      } else if (paymentIntent.status === 'succeeded') {
        setStep('success')
      } else {
        setErrorMsg('Payment processing failed. Please try again.')
        setStep('error')
      }
    } catch (err) {
      setErrorMsg(err.message || 'Network error. Please try again.')
      setStep('error')
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative animate-scaleIn overflow-hidden">

        {/* Header */}
        <div className="p-6 pb-4" style={{ background: 'linear-gradient(135deg, #1a6fb5, #2ecc71)' }}>
          <button onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl transition-colors duration-200">✕</button>
          <div className="text-white">
            <div className="text-sm font-medium text-white/80 mb-1">💳 Secure Payment</div>
            <h3 className="text-xl font-black">{plan.title}</h3>
            <div className="text-3xl font-black mt-1">{plan.displayPrice}</div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Patient Info */}
          {step === 'info' && (
            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <h4 className="font-bold text-gray-800 mb-3">Your Information</h4>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">Full Name *</label>
                <input type="text" required placeholder="John Doe"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a6fb5] transition-all duration-200" />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">Email *</label>
                <input type="email" required placeholder="john@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a6fb5] transition-all duration-200" />
              </div>
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-1">Phone</label>
                <input type="tel" placeholder="702-000-0000"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a6fb5] transition-all duration-200" />
              </div>
              <button type="submit"
                className="w-full bg-[#1a6fb5] hover:bg-[#0d4a8a] text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-md">
                Continue to Payment →
              </button>
              <p className="text-center text-gray-400 text-xs flex items-center justify-center gap-1">
                🔒 Secured by Stripe • HIPAA Compliant
              </p>
            </form>
          )}

          {/* Step 2: Payment */}
          {step === 'pay' && (
            <form onSubmit={handlePayment}>
              <div className="flex items-center gap-2 mb-4">
                <button type="button" onClick={() => setStep('info')} className="text-[#1a6fb5] text-sm hover:underline">← Back</button>
                <h4 className="font-bold text-gray-800">Payment Details</h4>
              </div>
              <div className="mb-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
              <button type="submit" disabled={!stripe || loading}
                className={`w-full ${loading ? 'bg-gray-400' : 'bg-[#1a6fb5] hover:bg-[#0d4a8a]'} text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md disabled:cursor-not-allowed`}>
                {loading ? 'Processing...' : `Pay ${plan.displayPrice}`}
              </button>
              <p className="text-center text-gray-400 text-xs mt-3 flex items-center justify-center gap-1">
                🔒 PCI-compliant • Powered by Stripe
              </p>
            </form>
          )}

          {/* Success */}
          {step === 'success' && (
            <div className="text-center py-6">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Payment Successful!</h3>
              <p className="text-gray-500 mb-2">Thank you, <strong>{form.name}</strong>!</p>
              <p className="text-gray-500 text-sm mb-6">A confirmation has been sent to <strong>{form.email}</strong>. We'll contact you shortly to schedule your visit.</p>
              <button onClick={onClose}
                className="bg-[#27ae60] hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
                Done
              </button>
            </div>
          )}

          {/* Error */}
          {step === 'error' && (
            <div className="text-center py-6">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-xl font-black text-gray-800 mb-2">Payment Failed</h3>
              <p className="text-red-500 text-sm mb-6">{errorMsg}</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setStep('pay')}
                  className="bg-[#1a6fb5] text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105">
                  Try Again
                </button>
                <button onClick={onClose}
                  className="bg-gray-100 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
