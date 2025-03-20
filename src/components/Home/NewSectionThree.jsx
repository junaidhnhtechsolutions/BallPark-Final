import React from 'react'

function NewSectionThree() {
  return (
    <>
      <section className="relative h-screen w-full bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)] flex items-center justify-center overflow-hidden">
        <div className="absolute top-[15%] left-[8%]">
          <img
            src="/assets/section-three-one.png"
            className="w-72 2xl:w-96"
            alt="Bubble"
          />
        </div>

        <div className="absolute top-[6%] left-[36%]">
          <img
            src="/assets/section-three-two.png"
            className="w-72 2xl:w-96"
            alt="Bubble"
          />
        </div>


        <div className="absolute top-[18%] right-[10%]">
          <img
            src="/assets/section-three-three.png"
            className="w-72 2xl:w-96"
            alt="Bubble"
          />
        </div>

        <div className="absolute bottom-[2%] left-[25%]">
          <img
            src="/assets/section-three-four.png"
            className="w-72 2xl:w-96"
            alt="Bubble"
          />
        </div>

        <div className="text-center z-10 relative top-5 bottom-5">
          <h1 class="text-white text-center text-xl font-extrabold tracking-wide uppercase drop-shadow-md">
            WHEN YOU'RE PITCHING FOR AN EVENT AND <br /> THE FOLLOWING HAPPENS...
          </h1>
        </div>

        <div className="absolute bottom-[2%] right-[20%]">
          <img
            src="/assets/section-three-five.png"
            className="w-72 2xl:w-96"
            alt="Bubble"
          />
        </div>


        <div className="absolute bottom-0 left-4">
          <img src="/assets/section-two-men.png" className="w-72" alt="Baseball player silhouette" />
        </div>
      </section>
    </>
  )
}

export default NewSectionThree
