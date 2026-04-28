export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        <div>
          <div className="mb-4">
            <img src="/logo.png" alt="Telemedicine Wellness LLC" style={{ width: 200, height: 'auto' }} />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Comprehensive telemedicine care for Nevada residents. Fast, convenient, and trusted healthcare from home.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4 text-[#2ecc71]">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            {['home', 'services', 'about', 'faqs', 'appointment'].map(l => (
              <li key={l}><a href={`#${l}`} className="hover:text-white transition-colors duration-200 capitalize">{l === 'faqs' ? 'FAQs' : l.charAt(0).toUpperCase() + l.slice(1)}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4 text-[#2ecc71]">Contact Us</h4>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-3"><span>📞</span>
              <a href="tel:7022729427" className="hover:text-white transition-colors duration-200">702-272-9427</a></li>
            <li className="flex items-center gap-3"><span>✉️</span>
              <a href="mailto:ctchouanang@telemedchecks.com" className="hover:text-white transition-colors duration-200">ctchouanang@telemedchecks.com</a></li>
            <li className="flex items-center gap-3"><span>📍</span> Nevada, United States</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        © 2026 Telemedicine Wellness LLC. All rights reserved.
      </div>
    </footer>
  )
}
