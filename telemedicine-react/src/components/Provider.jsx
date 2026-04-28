import { useReveal } from '../hooks/useReveal'

const testimonials = [
  { color: 'from-blue-50', border: 'border-blue-100', bg: 'bg-[#1a6fb5]', initial: 'S', name: 'Sarah M.', location: 'Elk, NY', text: '"Very convenient and professional care from home."' },
  { color: 'from-green-50', border: 'border-green-100', bg: 'bg-[#2ecc71]', initial: 'J', name: 'James R.', location: 'Las Vegas, NV', text: '"Got an appointment same day. The provider was thorough and caring."' },
  { color: 'from-purple-50', border: 'border-purple-100', bg: 'bg-purple-500', initial: 'M', name: 'Maria L.', location: 'Reno, NV', text: '"No waiting room, no travel. Best healthcare experience I\'ve had!"' },
]

export default function Provider() {
  const providerRef = useReveal()
  const testiRef = useReveal()
  return (
    <section id="testimonials" className="py-20" style={{ background: "url('/our-service-bg.png') center center / cover no-repeat" }}>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        <div ref={providerRef} className="reveal">
          <h2 className="text-4xl font-black text-gray-800 mb-6">Meet Your <span className="text-[#2ecc71]">Provider</span></h2>
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-[#1a6fb5] mb-1">Christle Tchouanang, FNP-BC, APRN</h3>
            <p className="text-gray-500 mb-6">Family Nurse Practitioner</p>
            <ul className="space-y-3">
              {['Board-Certified Nurse Practitioner', 'Experienced in primary and chronic care', 'Dedicated to accessible, patient-centered care'].map(i => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="text-green-500 mt-0.5">✓</span> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={testiRef} className="reveal">
          <h2 className="text-4xl font-black text-gray-800 mb-6">What Patients <span className="text-[#2ecc71]">Say</span></h2>
          <div className="space-y-4">
            {testimonials.map(t => (
              <div key={t.name} className={`testimonial-card bg-gradient-to-br ${t.color} to-white border ${t.border} rounded-2xl p-6 shadow-md`}>
                <div className="flex gap-1 text-yellow-400 text-xl mb-3">★★★★★</div>
                <p className="text-gray-700 italic mb-4">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${t.bg} rounded-full flex items-center justify-center text-white font-bold`}>{t.initial}</div>
                  <div>
                    <div className="font-semibold text-gray-800">{t.name}</div>
                    <div className="text-gray-500 text-sm">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
