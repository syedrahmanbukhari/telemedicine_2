import { useReveal } from '../hooks/useReveal'

const plans = [
  { icon: '♥', color: 'text-purple-600', name: 'aetna' },
  { icon: '⊕', color: 'text-blue-500', name: 'Anthem' },
  { icon: '🏥', color: 'text-red-500', name: 'BCBS' },
  { icon: '+', color: 'text-green-500', name: 'UnitedHealth' },
]

export default function Insurance() {
  const ref = useReveal()
  return (
    <section className="bg-gray-50 py-8 border-b">
      <div ref={ref} className="reveal max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
        <p className="text-gray-700 font-semibold text-lg">Accepted by major insurance plans</p>
        <div className="flex flex-wrap justify-center gap-6 items-center">
          {plans.map(p => (
            <div key={p.name} className="insurance-badge flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
              <span className={`${p.color} font-bold text-lg`}>{p.icon}</span>
              <span className="font-bold text-gray-700">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
