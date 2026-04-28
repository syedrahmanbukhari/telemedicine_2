import { useReveal } from '../hooks/useReveal'

const services = [
  {
    bg: 'bg-green-100', iconColor: 'text-green-600',
    icon: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
    title: 'Chronic Care Management',
    items: ['Diabetes', 'Hypertension', 'Cholesterol', 'Thyroid Disorders'],
  },
  {
    bg: 'bg-blue-100', iconColor: 'text-blue-600',
    icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
    title: 'Acute Care Visits',
    items: ['UTIs', 'Cold & Flu', 'Minor Infections', 'GI Symptoms'],
  },
  {
    bg: 'bg-purple-100', iconColor: 'text-purple-600',
    icon: <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />,
    title: 'PMN Care',
    items: ['Annual Wellness Exams', 'Lab Testing', 'Health Screenings'],
  },
  {
    bg: 'bg-orange-100', iconColor: 'text-orange-500',
    icon: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    title: 'Medication Management',
    items: ['Prescription Refills', 'Adjustments', 'Monitoring'],
  },
  {
    bg: 'bg-teal-100', iconColor: 'text-teal-600',
    icon: <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />,
    title: 'Weight Management',
    items: ['Metabolic Care', 'Nutrition Guidance', 'GLP-1 Medications', 'Progress Monitoring'],
  },
  {
    bg: 'bg-pink-100', iconColor: 'text-pink-600',
    icon: <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
    title: "Women's Health",
    items: ['Hormonal Health', 'Contraception', 'Menopause Care', 'Prenatal Guidance'],
  },
  {
    bg: 'bg-indigo-100', iconColor: 'text-indigo-600',
    icon: <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
    title: 'Mental Health Support',
    items: ['Anxiety & Stress', 'Depression Screening', 'Behavioral Health', 'Referral Support'],
  },
  {
    bg: 'bg-cyan-100', iconColor: 'text-cyan-600',
    icon: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
    title: 'Chronic Care (CCM)',
    items: ['Care Coordination', 'Monthly Check-ins', 'Specialist Referrals', 'Patient Education'],
  },
]

function ServiceCard({ s, delay }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="service-card reveal bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
      style={{ transitionDelay: `${delay}s` }}>
      <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-4`}>
        <svg className={`w-6 h-6 ${s.iconColor}`} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          {s.icon}
        </svg>
      </div>
      <h3 className="font-bold text-gray-800 text-lg mb-3">{s.title}</h3>
      <ul className="space-y-2">
        {s.items.map(item => (
          <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="text-green-500">✓</span> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Services() {
  const titleRef = useReveal()
  const btnRef = useReveal()
  return (
    <section id="services" className="py-20" style={{ background: "url('/our-service-bg.png') center center / cover no-repeat" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="reveal text-center mb-14">
          <h2 className="text-4xl font-black text-gray-800 mb-3">Our <span className="text-[#2ecc71]">Services</span></h2>
          <p className="text-gray-500 text-lg">Comprehensive care from the comfort of your home</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {services.map((s, i) => <ServiceCard key={s.title} s={s} delay={i * 0.08} />)}
        </div>
        <div ref={btnRef} className="reveal text-center flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#appointment" className="inline-block bg-[#27ae60] hover:bg-green-700 text-white font-bold px-10 py-4 rounded-lg text-lg shadow-lg transition-all duration-300 hover:scale-105">
            📅 Schedule Your Visit
          </a>
          <a href="#self-pay" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-10 py-4 rounded-lg text-lg shadow-lg transition-all duration-300 hover:scale-105">
            💳 Self-Pay Options
          </a>
        </div>
      </div>
    </section>
  )
}
