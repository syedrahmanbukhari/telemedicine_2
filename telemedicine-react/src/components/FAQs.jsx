import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const faqs = [
  { q: 'What is telemedicine?', a: 'Telemedicine allows you to consult with a healthcare provider via video, phone, or secure messaging — from the comfort of your home. No travel, no waiting rooms.' },
  { q: 'How do I book an appointment?', a: 'Simply fill out the appointment form below, or call us at 702-272-9427. We offer same-day and next-day appointments for your convenience.' },
  { q: 'Is my insurance accepted?', a: 'We accept most major insurance plans including Aetna, Anthem, BCBS, and UnitedHealth. Contact us to verify your specific coverage.' },
  { q: 'What states do you serve?', a: 'We primarily serve Nevada residents, including rural communities. Contact us to check if we can serve your specific location.' },
  { q: 'Can I get prescriptions through telemedicine?', a: 'Yes! Our provider can prescribe medications, refill existing prescriptions, and manage your medication regimen through telemedicine visits.' },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal faq-item bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex justify-between items-center font-semibold text-gray-800 hover:text-[#1a6fb5] transition-colors duration-200">
        <span>{faq.q}</span>
        <span className={`text-[#1a6fb5] text-xl transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
      )}
    </div>
  )
}

export default function FAQs() {
  const titleRef = useReveal()
  return (
    <section id="faqs" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={titleRef} className="reveal text-center mb-14">
          <h2 className="text-4xl font-black text-gray-800 mb-3">Frequently Asked <span className="text-[#2ecc71]">Questions</span></h2>
          <p className="text-gray-500">Everything you need to know about our telemedicine services</p>
        </div>
        <div className="space-y-4">
          {faqs.map(f => <FAQItem key={f.q} faq={f} />)}
        </div>
      </div>
    </section>
  )
}
