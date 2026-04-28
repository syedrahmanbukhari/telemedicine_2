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
    <nav className="sticky top-0 z-50 shadow-sm transition-all duration-300 bg-white"
      style={{ boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : undefined }}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="overflow-hidden" style={{ width: 220, height: 56 }}>
          <img src="/logo.png" alt="Telemedicine Wellness LLC"
            style={{ width: 320, maxWidth: 'none', height: 'auto', marginLeft: -55 }} />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              className={`nav-link font-medium text-sm transition-colors duration-200 capitalize ${active === l ? 'text-[#1a6fb5] font-bold' : 'text-gray-700 hover:text-[#1a6fb5]'}`}>
              {l === 'faqs' ? 'FAQs' : l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
          <button className="text-gray-400 hover:text-[#1a6fb5] transition-colors duration-200 ml-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>
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
          <a href="#appointment" className="mt-3 block text-center bg-[#27ae60] text-white py-2 rounded-full font-semibold text-sm">
            Book Appointment
          </a>
        </div>
      )}
    </nav>
  )
}
