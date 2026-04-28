export default function Hero() {
  return (
    <section id="home" className="hero-bg relative overflow-hidden" style={{ minHeight: '90vh' }}>
      <div className="relative z-10 flex items-center min-h-[90vh]">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-14 py-16">
          <div className="max-w-lg animate-fadeInLeft">
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6 drop-shadow-lg">
              <span className="text-white">Your Health.</span><br />
              <span className="text-[#2ecc71]">Anywhere.</span>
              <span className="text-white"> Anytime.</span>
            </h1>
            <p className="text-white/90 text-base font-medium mb-1 drop-shadow">
              Comprehensive Telemedicine Care for Nevada Residents
            </p>
            <p className="text-white/80 text-sm mb-8 tracking-wide">
              Fast &nbsp;&bull;&nbsp; Convenient &nbsp;&bull;&nbsp; Trusted
            </p>
            <a href="#appointment"
              className="pulse-cta inline-block bg-[#27ae60] hover:bg-green-700 text-white font-bold px-8 py-3 rounded-md text-base shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl mb-10 border border-green-400/40">
              Book Your Appointment Now
            </a>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-white/90 text-sm">
                <span className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center text-xs">📞</span>
                <span className="font-semibold tracking-wide">702-272-9427</span>
              </div>
              <div className="flex items-center gap-3 text-white/90 text-sm">
                <span className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center text-xs">✉️</span>
                <span>ctchouanang@telemedchecks.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-5 h-9 border-2 border-white/40 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2.5 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
