import { useState, useEffect } from 'react'

const links = ['home', 'services', 'about', 'faqs', 'testimonials']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = document.querySelectorAll('section[id]')
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) setActive(s.id)
      })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white transition-all duration-300"
      style={{ boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div style={{ overflow: 'hidden', width: 180, height: 56 }}>
          <img src="/logo.png" alt="Telemedicine Wellness LLC"
            style={{ height: 56, width: 'auto', transform: 'scale(2.8)', transformOrigin: 'left center' }} />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              className={`nav-link font-medium text-sm transition-colors duration-200 capitalize ${active === l ? 'text-[#1a6fb5] font-bold' : 'text-gray-700 hover:text-[#1a6fb5]'}`}>
              {l === 'faqs' ? 'FAQs' : l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
          <a href="#self-pay"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 shadow-sm">
            💳 Self-Pay
          </a>
          <a href="#appointment"
            className="bg-[#27ae60] hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105 shadow-md">
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-[#1a6fb5] text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-6 pb-4">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              className="block w-full text-left py-2.5 text-gray-700 hover:text-[#1a6fb5] font-medium text-sm border-b border-gray-50 capitalize">
              {l === 'faqs' ? 'FAQs' : l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
          <div className="flex gap-3 mt-3">
            <a href="#self-pay" onClick={() => setMenuOpen(false)}
              className="flex-1 text-center bg-yellow-400 text-gray-900 py-2 rounded-lg font-bold text-sm">
              💳 Self-Pay
            </a>
            <a href="#appointment" onClick={() => setMenuOpen(false)}
              className="flex-1 text-center bg-[#27ae60] text-white py-2 rounded-lg font-bold text-sm">
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
