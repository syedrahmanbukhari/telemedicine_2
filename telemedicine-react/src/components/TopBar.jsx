export default function TopBar() {
  return (
    <div className="text-white text-sm py-2 px-6 flex items-center justify-center gap-8 relative"
      style={{ background: 'linear-gradient(90deg, #1565c0 0%, #5dc41a 100%)' }}>
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 text-white/90">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          702-272-9427
        </span>
        <span className="flex items-center gap-2 text-white/90">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          ctchouanang@telemedchecks.com
        </span>
      </div>
      <a href="#appointment"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-[#27ae60] hover:bg-green-600 text-white px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-md">
        Appointment
      </a>
    </div>
  )
}
