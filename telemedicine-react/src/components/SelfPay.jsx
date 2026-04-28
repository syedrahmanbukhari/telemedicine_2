import { useReveal } from '../hooks/useReveal'

const plans = [
  {
    tag: '🎉 PROMOTIONAL',
    tagColor: 'bg-yellow-400 text-gray-900',
    title: 'New Patient Telemedicine Visit',
    price: '$120 – $150',
    desc: 'Comprehensive first visit with full health assessment',
    features: ['Full health evaluation', 'Treatment plan', 'Prescription if needed', 'Follow-up instructions'],
    link: 'https://square.link/u/newpatient',
    btnColor: 'bg-[#1a6fb5] hover:bg-[#0d4a8a]',
    highlight: true,
  },
  {
    tag: '🔄 FOLLOW-UP',
    tagColor: 'bg-green-100 text-green-800',
    title: 'Follow-Up Visit',
    price: '$80 – $100',
    desc: 'Continued care and medication management',
    features: ['Progress review', 'Medication adjustments', 'Lab result review', 'Care plan update'],
    link: 'https://square.link/u/followup',
    btnColor: 'bg-[#27ae60] hover:bg-green-700',
    highlight: false,
  },
  {
    tag: '⚡ SAME-DAY',
    tagColor: 'bg-red-100 text-red-700',
    title: 'Same-Day Urgent Visit',
    price: '$90 – $120',
    desc: 'Fast care for acute symptoms — available today',
    features: ['Same-day availability', 'Acute symptom care', 'Prescription if needed', 'Quick turnaround'],
    link: 'https://square.link/u/sameday',
    btnColor: 'bg-orange-500 hover:bg-orange-600',
    highlight: false,
  },
]

export default function SelfPay() {
  const titleRef = useReveal()
  return (
    <section id="self-pay" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="reveal text-center mb-6">
          <span className="inline-block bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1 rounded-full mb-4">
            💳 SELF-PAY OPTIONS
          </span>
          <h2 className="text-4xl font-black text-gray-800 mb-3">
            No Insurance? <span className="text-[#2ecc71]">No Problem.</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Affordable self-pay visits available. Secure payment powered by Square — funds deposited directly to our account.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {plans.map((p, i) => <PlanCard key={i} p={p} />)}
        </div>

        {/* Trust note */}
        <div className="reveal text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-md border border-gray-100">
            <span className="text-2xl">🔒</span>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold text-gray-800">Secure payments via Square.</span> HIPAA-compliant platform. Your data is protected.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function PlanCard({ p }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${p.highlight ? 'ring-2 ring-[#1a6fb5]' : ''}`}>
      <div className={`px-6 py-2 text-xs font-bold ${p.tagColor}`}>{p.tag}</div>
      <div className="p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{p.title}</h3>
        <div className="text-3xl font-black text-[#1a6fb5] mb-2">{p.price}</div>
        <p className="text-gray-500 text-sm mb-4">{p.desc}</p>
        <ul className="space-y-2 mb-6">
          {p.features.map(f => (
            <li key={f} className="flex items-center gap-2 text-gray-600 text-sm">
              <span className="text-green-500">✓</span> {f}
            </li>
          ))}
        </ul>
        <a href={p.link} target="_blank" rel="noopener noreferrer"
          className={`block text-center ${p.btnColor} text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md`}>
          Start Visit – Pay Now
        </a>
      </div>
    </div>
  )
}
