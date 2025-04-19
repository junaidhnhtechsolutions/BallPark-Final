import React from 'react';

function NewSectionFour() {
  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
      style={{
        backgroundImage: 'url("/assets/img/banner/rotate-yes.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div>
        <h1 className="text-white text-center text-2xl md:text-6xl font-extrabold uppercase leading-relaxed px-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] mb-5">
          <span className="whitespace-pre-line text-shadow-heavy">
            NO MORE!
          </span>
        </h1>
        <h1 className="text-white text-center text-2xl md:text-3xl font-extrabold uppercase leading-relaxed px-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]">
          <span className="whitespace-pre-line text-shadow-heavy">
            IN EVENTS TIME IS ONE OF THE MOST EXPENSIVE RESOURCES. <br /> WHETHER IT BE BEING FAST ENOUGH TO WIN THE JOB OR HIRING <br /> PEOPLE TO HELP YOU WIN IT.
          </span>
        </h1>
      </div>
    </section>
  );
}

export default NewSectionFour;
