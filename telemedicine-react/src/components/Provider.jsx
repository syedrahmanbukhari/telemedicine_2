import { useReveal } from '../hooks/useReveal'

const testimonials = [
  { color: 'from-blue-50', border: 'border-blue-100', bg: 'bg-[#1a6fb5]', initial: 'S', name: 'Sarah M.', location: 'Elk, NY', text: '"Very convenient and professional care from home."' },
  { color: 'from-green-50', border: 'border-green-100', bg: 'bg-[#2ecc71]', initial: 'J', name: 'James R.', location: 'Las Vegas, NV', text: '"Got an appointment same day. The provider was thorough and caring."' },
  { color: 'from-purple-50', border: 'border-purple-100', bg: 'bg-purple-500', initial: 'M', name: 'Maria L.', location: 'Reno, NV', text: '"No waiting room, no travel. Best healthcare experience I\'ve had!"' },
  { color: 'from-orange-50', border: 'border-orange-100', bg: 'bg-orange-500', initial: 'D', name: 'David K.', location: 'Henderson, NV', text: '"Self-pay was so affordable. Got my prescription same day!"' },
]

const trustBadges = [
  { icon: '🎓', label: 'Board-Certified', sub: 'FNP-BC, APRN' },
  { icon: '📋', label: 'Licensed in Nevada', sub: 'State Licensed' },
  { icon: '🔒', label: 'HIPAA Compliant', sub: 'Secure Platform' },
  { icon: '⭐', label: '5-Star Rated', sub: 'Patient Reviews' },
]

export default function Provider() {
  const providerRef = useReveal()
  const testiRef = useReveal()
  const badgeRef = useReveal()
  return (
    <section id="testimonials" className="py-20" style={{ background: "url('/our-service-bg.png') center center / cover no-repeat" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Trust badges */}
        <div ref={badgeRef} className="reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {trustBadges.map(b => (
            <div key={b.label} className="trust-badge bg-white/90 backdrop-blur rounded-xl p-4 text-center shadow-md border border-white">
              <div className="text-3xl mb-2">{b.icon}</div>
              <div className="font-bold text-gray-800 text-sm">{b.label}</div>
              <div className="text-gray-500 text-xs">{b.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div ref={providerRef} className="reveal">
            <h2 className="text-4xl font-black text-gray-800 mb-6">Meet Your <span className="text-[#2ecc71]">Provider</span></h2>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-md">
              <h3 className="text-2xl font-bold text-[#1a6fb5] mb-1">Christle Tchouanang, FNP-BC, APRN</h3>
              <p className="text-gray-500 mb-1">Family Nurse Practitioner</p>
              <p className="text-[#27ae60] text-sm font-semibold mb-6">Licensed in Nevada • HIPAA-Compliant Platform</p>
              <ul className="space-y-3 mb-6">
                {[
                  'Board-Certified Nurse Practitioner (FNP-BC, APRN)',
                  'Licensed in Nevada',
                  'Experienced in primary and chronic care',
                  'Dedicated to accessible, patient-centered care',
                  'HIPAA-compliant telehealth platform',
                ].map(i => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-green-500 mt-0.5">✓</span> {i}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#appointment" className="flex-1 text-center bg-[#27ae60] hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md">
                  📅 Book Appointment
                </a>
                <a href="#self-pay" className="flex-1 text-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-md">
                  💳 Self-Pay Visit
                </a>
              </div>
            </div>
          </div>

          <div ref={testiRef} className="reveal">
            <h2 className="text-4xl font-black text-gray-800 mb-6">What Patients <span className="text-[#2ecc71]">Say</span></h2>
            <div className="space-y-4">
              {testimonials.map(t => (
                <div key={t.name} className={`testimonial-card bg-gradient-to-br ${t.color} to-white border ${t.border} rounded-2xl p-5 shadow-md`}>
                  <div className="flex gap-1 text-yellow-400 text-lg mb-2">★★★★★</div>
                  <p className="text-gray-700 italic mb-3 text-sm">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 ${t.bg} rounded-full flex items-center justify-center text-white font-bold text-sm`}>{t.initial}</div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
                      <div className="text-gray-500 text-xs">{t.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
