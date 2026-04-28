import { useReveal } from '../hooks/useReveal'

const conditions = [
  { icon: '🫀', name: 'Hypertension' },
  { icon: '🩸', name: 'Diabetes (Type 1 & 2)' },
  { icon: '🧠', name: 'Anxiety & Depression' },
  { icon: '⚖️', name: 'Obesity / Weight Issues' },
  { icon: '🦠', name: 'UTIs & Infections' },
  { icon: '🤧', name: 'Cold, Flu & Allergies' },
  { icon: '🫁', name: 'Asthma & Breathing' },
  { icon: '🦋', name: 'Thyroid Disorders' },
  { icon: '💊', name: 'Medication Refills' },
  { icon: '🩺', name: 'Annual Wellness Exams' },
  { icon: '👩', name: "Women's Health" },
  { icon: '🔬', name: 'Lab Result Reviews' },
]

export default function Conditions() {
  const titleRef = useReveal()
  return (
    <section id="conditions" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={titleRef} className="reveal text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 mb-3">Conditions <span className="text-[#2ecc71]">We Treat</span></h2>
          <p className="text-gray-500 text-lg">From chronic conditions to acute care — we've got you covered</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {conditions.map((c, i) => <ConditionItem key={i} c={c} />)}
        </div>
        <div className="reveal text-center mt-10">
          <p className="text-gray-500 mb-4">Don't see your condition? Contact us — we may still be able to help.</p>
          <a href="#appointment" className="inline-block bg-[#1a6fb5] hover:bg-[#0d4a8a] text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md">
            Ask About Your Condition
          </a>
        </div>
      </div>
    </section>
  )
}

function ConditionItem({ c }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-[#1a6fb5]/30 rounded-xl p-4 flex items-center gap-3 transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-default">
      <span className="text-2xl">{c.icon}</span>
      <span className="text-gray-700 font-medium text-sm">{c.name}</span>
    </div>
  )
}
