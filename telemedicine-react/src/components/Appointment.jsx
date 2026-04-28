import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function Appointment() {
  const titleRef = useReveal()
  const formRef = useReveal()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.target)
    try {
      const res = await fetch('https://formspree.io/f/xdaygvbz', {
        method: 'POST', body: data, headers: { Accept: 'application/json' }
      })
      if (res.ok) { setSubmitted(true); e.target.reset() }
      else alert('Something went wrong. Please try again.')
    } catch { alert('Network error. Please try again.') }
    setLoading(false)
  }

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a6fb5] focus:border-transparent transition-all duration-200"

  return (
    <section id="appointment" className="py-20 hero-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 z-0" />
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div ref={titleRef} className="reveal text-center mb-10">
          <h2 className="text-4xl font-black text-white mb-3">Book Your <span className="text-[#2ecc71]">Appointment</span></h2>
          <p className="text-white/80 text-lg">Fill out the form and we'll get back to you within 24 hours</p>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="reveal bg-white rounded-3xl shadow-2xl p-8">
          <input type="hidden" name="_replyto" value="bukhari78615@gmail.com" />
          <input type="hidden" name="_subject" value="New Appointment Request - Telemedicine Wellness LLC" />
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div><label className="block text-gray-700 font-semibold mb-2">First Name *</label>
              <input type="text" name="first_name" placeholder="John" required className={inputCls} /></div>
            <div><label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
              <input type="text" name="last_name" placeholder="Doe" required className={inputCls} /></div>
            <div><label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
              <input type="tel" name="phone" placeholder="702-000-0000" required className={inputCls} /></div>
            <div><label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
              <input type="email" name="email" placeholder="john@example.com" required className={inputCls} /></div>
            <div><label className="block text-gray-700 font-semibold mb-2">Service Needed</label>
              <select name="service" className={inputCls}>
                <option>Chronic Care Management</option>
                <option>Acute Care Visit</option>
                <option>PMN Care</option>
                <option>Medication Management</option>
                <option>Other</option>
              </select></div>
            <div><label className="block text-gray-700 font-semibold mb-2">Preferred Date</label>
              <input type="date" name="preferred_date" className={inputCls} /></div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Message / Symptoms</label>
            <textarea rows="4" name="message" placeholder="Briefly describe your symptoms or reason for visit..."
              className={`${inputCls} resize-none`} />
          </div>
          <button type="submit" disabled={loading}
            className="pulse-cta w-full bg-[#27ae60] hover:bg-green-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-70">
            {loading ? 'Sending...' : 'Book Appointment Now'}
          </button>
          {submitted && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-center font-semibold">
              ✅ Thank you! We'll contact you within 24 hours to confirm your appointment.
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
