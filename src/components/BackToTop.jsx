import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 bg-[#1a6fb5] hover:bg-[#0d4a8a] text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-xl z-50 transition-all duration-300 hover:scale-110 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      ↑
    </button>
  )
}
