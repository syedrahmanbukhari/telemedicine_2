import { useReveal } from '../hooks/useReveal'

const plans = [
  { icon: '♥', color: 'text-purple-600', name: 'Aetna' },
  { icon: '⊕', color: 'text-blue-500', name: 'Anthem' },
  { icon: '🏥', color: 'text-red-500', name: 'BCBS' },
  { icon: '+', color: 'text-green-500', name: 'UnitedHealth' },
]

export default function Insurance() {
  const ref = useReveal()
  return (
    <section id="insurance" className="bg-gray-50 py-10 border-b">
      <div className="max-w-6xl mx-auto px-6">
        {/* Insurance row */}
        <div ref={ref} className="reveal flex flex-col sm:flex-row items-center justify-center gap-6 text-center mb-8">
          <p className="text-gray-700 font-semibold text-lg">Accepted by major insurance plans</p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {plans.map(p => (
              <div key={p.name} className="insurance-badge flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
                <span className={`${p.color} font-bold text-lg`}>{p.icon}</span>
                <span className="font-bold text-gray-700">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment info grid */}
        <div className="reveal grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-3">🏥</div>
            <h3 className="font-bold text-gray-800 mb-2">Insurance Accepted</h3>
            <p className="text-gray-500 text-sm">We accept most major plans. Contact us to verify your specific coverage before your visit.</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-6 shadow-sm border border-yellow-200 text-center">
            <div className="text-3xl mb-3">💳</div>
            <h3 className="font-bold text-gray-800 mb-2">Self-Pay Available</h3>
            <p className="text-gray-500 text-sm">No insurance? No problem. Affordable self-pay options starting at $80. Secure payment via Square.</p>
            <a href="#self-pay" className="inline-block mt-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-105">
              View Pricing
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-bold text-gray-800 mb-2">HIPAA Compliant</h3>
            <p className="text-gray-500 text-sm">Our telehealth platform is fully HIPAA-compliant. Your health information is always secure and private.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
