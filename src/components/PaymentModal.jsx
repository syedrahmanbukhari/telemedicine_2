import { useState } from 'react'
import { PaymentForm, CreditCard, GooglePay, ApplePay } from 'react-square-web-payments-sdk'

const APP_ID = import.meta.env.VITE_SQUARE_APP_ID || 'sandbox-sq0idb-REPLACE_ME'
const LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID || 'REPLACE_ME'

export default function PaymentModal({ plan, onClose }) {
  const [step, setStep] = useState('info') // 'info' | 'pay' | 'success' | 'error'
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const amountCents = plan.amountCents

  const handleInfoSubmit = (e) => {
    e.preventDefault()
    setStep('pay')
  }

  const handlePayment = async (token) => {
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceId: token.token,
          amount: amountCents,
          planName: plan.title,
          patientName: form.name,
          patientEmail: form.email,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStep('success')
      } else {
        setErrorMsg(data.error || 'Payment failed.')
        setStep('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
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
                🔒 Secured by Square • HIPAA Compliant
              </p>
            </form>
          )}

          {/* Step 2: Payment */}
          {step === 'pay' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => setStep('info')} className="text-[#1a6fb5] text-sm hover:underline">← Back</button>
                <h4 className="font-bold text-gray-800">Payment Details</h4>
              </div>
              <PaymentForm
                applicationId={APP_ID}
                locationId={LOCATION_ID}
                cardTokenizeResponseReceived={handlePayment}
                createPaymentRequest={() => ({
                  countryCode: 'US',
                  currencyCode: 'USD',
                  total: { amount: String(amountCents / 100), label: plan.title },
                })}
              >
                <CreditCard
                  buttonProps={{
                    css: {
                      backgroundColor: '#1a6fb5',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: 'white',
                      borderRadius: '12px',
                      padding: '12px',
                      width: '100%',
                      marginTop: '12px',
                    },
                  }}
                >
                  {loading ? 'Processing...' : `Pay ${plan.displayPrice}`}
                </CreditCard>
                <div className="my-3 text-center text-gray-400 text-sm">— or pay with —</div>
                <GooglePay />
                <ApplePay />
              </PaymentForm>
              <p className="text-center text-gray-400 text-xs mt-3 flex items-center justify-center gap-1">
                🔒 PCI-compliant • Powered by Square
              </p>
            </div>
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
