import React from 'react';

function NewSectionFive() {
  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
      style={{
        backgroundImage: 'url("/assets/img/banner/rotate-no.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center max-h-[35rem] md:w-4/12 mx-auto"
        style={{
          backgroundImage: 'url("/assets/vector.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      >
        <h1 className="text-white text-center text-xl md:text-[23px] font-extrabold uppercase leading-relaxed px-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]">
          <span className="whitespace-pre-line text-shadow-heavy">
            We've collaborated with top <br /> venues, set builders, florists, <br /> and AV companies to offer <br /> customisable, pre-costed event <br /> shells. Plus we've developed the <br /> world's first AI capable of <br /> estimating costs directly from <br /> images.
          </span>
        </h1>
      </div>
    </section>
  );
}

export default NewSectionFive;
