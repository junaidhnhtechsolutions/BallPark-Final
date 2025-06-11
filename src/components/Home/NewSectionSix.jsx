import { Link } from 'react-router-dom'

function NewSectionSix() {
  return (
    <>
      <section className="relative h-screen w-full
      flex items-center justify-center overflow-hidden">
        <div className="relative mx-auto md:w-4/12 flex flex-col justify-center space-y-5">
          <h1 class="text-white text-center text-xl font-extrabold tracking-wide uppercase drop-shadow-md">
            Try it for yourself, check out our example scenario under the “Navigating the Ballpark” tab — or simply click “Test Run” to explore it firsthand.
          </h1>
          <Link
            to="/navigating-park"
            className="
              px-12 py-3 
              rounded-full
              text-white 
              font-bold 
              w-56
              flex
              items-center
              justify-center
              mx-auto
              uppercase
              tracking-wider
              bg-gradient-to-b from-[#F1E09E] via-[#877C57] to-[#B9AB78]
              shadow-[0_4px_12px_rgba(244,208,63,0.5)]
              transform hover:scale-105 transition-transform duration-200
              hover:shadow-[0_6px_16px_rgba(244,208,63,0.6)]
              active:scale-95">
            LEARN MORE
          </Link>
        </div>
      </section>
    </>
  )
}

export default NewSectionSix
