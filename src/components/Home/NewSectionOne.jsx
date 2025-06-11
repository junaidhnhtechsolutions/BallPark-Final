import React from 'react';

function NewSectionOne() {
  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
      style={{
        backgroundImage: 'url("/assets/img/banner/rotate-yes.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="absolute top-0 inset-0 flex items-center justify-center max-h-[35rem] md:w-4/12 mx-auto"
        style={{
          backgroundImage: 'url("/assets/vector.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      >
        <h1 className="text-white text-center text-2xl md:text-2xl font-extrabold uppercase leading-relaxed px-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]">
          <span className="whitespace-pre-line text-shadow-heavy">
          WE WILL BALLPARK COST YOUR EVENT IN MINUTES.
          </span>
        </h1>
      </div>
    </section>
  );
}

export default NewSectionOne;
