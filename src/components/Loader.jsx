import React from 'react'

const Loader = () => {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 bg-[#0000005e] h-screen w-full flex justify-center items-center z-50">
        <div className="pl">
          <div className="pl__dot green"></div>
          <div className="pl__dot green"></div>
          <div className="pl__dot green"></div>
          <div className="pl__dot red"></div>
          <div className="pl__dot red"></div>
          <div className="pl__dot red"></div>
          <div className="pl__dot yellow"></div>
          <div className="pl__dot yellow"></div>
          <div className="pl__dot yellow"></div>
          <div className="pl__dot blue"></div>
          <div className="pl__dot blue"></div>
          <div className="pl__dot blue"></div>
          <div className="pl__text">Estimating...</div>
        </div>
      </div>
    </>
  )
}

export default Loader

