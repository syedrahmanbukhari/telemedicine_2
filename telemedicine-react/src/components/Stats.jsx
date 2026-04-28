import { useEffect, useRef } from 'react'

const stats = [
  { target: 500, suffix: '+', label: 'Happy Patients', color: 'text-[#1a6fb5]' },
  { target: 98, suffix: '%', label: 'Satisfaction', color: 'text-[#2ecc71]' },
  { target: 24, suffix: 'hr', label: 'Response Time', color: 'text-[#1a6fb5]' },
  { target: 5, suffix: '★', label: 'Star Rating', color: 'text-[#2ecc71]' },
]

function StatItem({ s }) {
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        const el = ref.current
        const duration = 1800
        const step = s.target / (duration / 16)
        let current = 0
        const timer = setInterval(() => {
          current += step
          if (current >= s.target) { current = s.target; clearInterval(timer) }
          if (el) el.textContent = Math.floor(current) + s.suffix
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [s])

  return (
    <div className="stat-item text-center">
      <div ref={ref} className={`text-4xl font-black ${s.color}`}>0{s.suffix}</div>
      <div className="text-gray-500 mt-1">{s.label}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(s => <StatItem key={s.label} s={s} />)}
      </div>
    </section>
  )
}
