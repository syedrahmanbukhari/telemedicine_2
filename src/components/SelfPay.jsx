import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import PaymentModal from './PaymentModal'

const plans = [
  {
    tag: '🎉 PROMOTIONAL',
    tagBg: 'bg-[#2196f3]', tagText: 'text-white',
    title: 'New Patient Telemedicine Visit',
    displayPrice: '$120',
    priceRange: '$120 – $150',
    amountCents: 12000,
    desc: 'Comprehensive first visit with full health assessment',
    features: ['Full health evaluation', 'Treatment plan', 'Prescription if needed', 'Follow-up instructions'],
    btnColor: 'bg-[#2196f3] hover:bg-[#1565c0]',
    highlight: true,
  },
  {
    tag: '🔄 FOLLOW-UP',
    tagBg: 'bg-green-100', tagText: 'text-green-800',
    title: 'Follow-Up Visit',
    displayPrice: '$80',
    priceRange: '$80 – $100',
    amountCents: 8000,
    desc: 'Continued care and medication management',
    features: ['Progress review', 'Medication adjustments', 'Lab result review', 'Care plan update'],
    btnColor: 'bg-[#27ae60] hover:bg-green-700',
    highlight: false,
  },
  {
    tag: '⚡ SAME-DAY',
    tagBg: 'bg-red-100', tagText: 'text-red-700',
    title: 'Same-Day Urgent Visit',
    displayPrice: '$90',
    priceRange: '$90 – $120',
    amountCents: 9000,
    desc: 'Fast care for acute symptoms — available today',
    features: ['Same-day availability', 'Acute symptom care', 'Prescription if needed', 'Quick turnaround'],
    btnColor: 'bg-[#2196f3] hover:bg-[#1565c0]',
    highlight: false,
  },
]

function PlanCard({ p, onPay }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal plan-card bg-white rounded-2xl shadow-md overflow-hidden ${p.highlight ? 'ring-2 ring-[#2196f3]' : ''}`}>
      <div className={`px-6 py-2 text-xs font-bold ${p.tagBg} ${p.tagText}`}>{p.tag}</div>
      <div className="p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{p.title}</h3>
        <div className="text-3xl font-black text-[#2196f3] mb-1">{p.priceRange}</div>
        <p className="text-gray-500 text-sm mb-4">{p.desc}</p>
        <ul className="space-y-2 mb-6">
          {p.features.map(f => (
            <li key={f} className="flex items-center gap-2 text-gray-600 text-sm">
              <span className="text-green-500">✓</span> {f}
            </li>
          ))}
        </ul>
        <button onClick={() => onPay(p)}
          className={`w-full ${p.btnColor} text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md`}>
          💳 Start Visit – Pay Now
        </button>
      </div>
    </div>
  )
}

export default function SelfPay() {
  const titleRef = useReveal()
  const noteRef = useReveal()
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <section id="self-pay" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="reveal text-center mb-10">
          <span className="inline-block bg-[#2196f3] text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
            💳 SELF-PAY OPTIONS
          </span>
          <h2 className="text-4xl font-black text-gray-800 mb-3">
            No Insurance? <span className="text-[#2ecc71]">No Problem.</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Affordable self-pay visits available. Secure payment powered by Square — Credit Card, Apple Pay & Google Pay accepted.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {plans.map((p, i) => <PlanCard key={i} p={p} onPay={setSelectedPlan} />)}
        </div>

        <div ref={noteRef} className="reveal text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-md border border-gray-100">
            <span className="flex items-center gap-2 text-gray-600 text-sm">🔒 <span className="font-semibold">PCI-Compliant</span></span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-2 text-gray-600 text-sm">🏥 <span className="font-semibold">HIPAA Compliant</span></span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-2 text-gray-600 text-sm">💳 <span className="font-semibold">Powered by Square</span></span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-2 text-gray-600 text-sm">🍎 <span className="font-semibold">Apple & Google Pay</span></span>
          </div>
        </div>
      </div>

      {selectedPlan && (
        <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </section>
  )
}
