import React from 'react'
import { Link } from 'react-router-dom'

function NewSectionSix() {
  const token = localStorage.getItem("token");

  return (
    <>
      {/* bg-[radial-gradient(circle_at_center,#00d1f7_0%,#00b4d8_30%,_#0096c7_80%)]  */}
      <section className="relative h-screen w-full
      flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/img/banner/rotate-yes.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
      >
        <div className="relative mx-auto w-[60%] flex flex-col justify-center space-y-5">
          <h1 class="text-white text-center text-4xl font-extrabold tracking-wide uppercase drop-shadow-md">
            Try it for yourself, check out our example scenario under the “Navigating the Ballpark” tab — or simply click “Test Run” to explore it firsthand.
          </h1>
          {!token &&
            <Link
              to="/login"
              className="
              px-12 py-3 
              rounded-full
              text-white 
              font-bold 
              w-48
              mx-auto
              uppercase
              tracking-wider
              bg-gradient-to-b from-[#F1E09E] via-[#877C57] to-[#B9AB78]
              shadow-[0_4px_12px_rgba(244,208,63,0.5)]
              transform hover:scale-105 transition-transform duration-200
              hover:shadow-[0_6px_16px_rgba(244,208,63,0.6)]
              active:scale-95
            "
            >
              TEST RUN
            </Link>}
        </div>
      </section>
    </>
  )
}

export default NewSectionSix
