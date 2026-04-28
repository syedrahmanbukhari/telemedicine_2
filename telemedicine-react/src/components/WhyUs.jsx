import { useReveal } from '../hooks/useReveal'

const items = [
  'Same-day or next-day appointments',
  'No waiting rooms',
  'Care from home',
  'Personalized treatment plans',
  'Serving rural Nevada communities',
]

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" />
  </svg>
)

export default function WhyUs() {
  const ref = useReveal()
  return (
    <section id="about" className="py-16" style={{ background: "url('/why-tele.png') center center / cover no-repeat", minHeight: 380 }}>
      <div className="max-w-7xl mx-auto px-10 flex items-center min-h-[380px]">
        <div ref={ref} className="reveal max-w-lg">
          <h2 className="text-3xl font-black text-gray-800 mb-6">
            Why <span className="text-[#1a6fb5]">Telemedicine</span> <span className="text-[#2ecc71]">Wellness LLC?</span>
          </h2>
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i} className="why-list-item flex items-center gap-3 font-medium cursor-default">
                <span className="why-check"><CheckIcon /></span>
                <span className="why-text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
