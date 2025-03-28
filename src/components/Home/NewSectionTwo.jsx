// function NewSectionTwo() {
//     return (
//         <section className="relative h-screen w-full bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)] flex items-center justify-center overflow-hidden">
//             <div className="absolute top-[6%] left-[45%]">
//                 <img
//                     src="/assets/section-two-ball.png"
//                     className="w-20"
//                     alt="Bubble"
//                 />
//             </div>

//             <div className="absolute top-[20%] left-[10%]">
//                 <img
//                     src="/assets/section-two-ball.png"
//                     className="w-20"
//                     alt="Bubble"
//                 />
//             </div>

//             <div className="absolute top-[20%] right-[16%]">
//                 <img
//                     src="/assets/section-two-ball.png"
//                     className="w-20"
//                     alt="Bubble"
//                 />
//             </div>

//             <div className="absolute bottom-[15%] left-[30%]">
//                 <img
//                     src="/assets/section-two-ball.png"
//                     className="w-20"
//                     alt="Bubble"
//                 />
//             </div>

//             <div className="flex justify-center z-10">
//                 <h1 class="text-white text-center text-xl font-extrabold tracking-wide uppercase drop-shadow-md">
//                     WHEN YOU'RE PITCHING FOR AN EVENT AND <br /> THE FOLLOWING HAPPENS...
//                 </h1>
//             </div>

//             <div className="absolute bottom-0 left-4">
//                 <img src="/assets/section-two-men.png" className="w-72" alt="Baseball player silhouette" />
//             </div>
//             <div className="absolute bottom-20 right-80">
//                 <img
//                     src="/assets/section-two-ball.png"
//                     className="w-20"
//                     alt="Bubble"
//                 />
//             </div>
//         </section>
//     )
// }

// export default NewSectionTwo


import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

function NewSectionTwo() {
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const ballVariants = {
    initial: { scale: 1 },
    visible: {
      scale: [1, 1.1, 0.9, 1.2, 0.8, 1.3, 0.7, 1.4, 0],
      transition: {
        duration: 1.5,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1],
        ease: "easeInOut",
        delay: 0.5
      }
    }
  }

  // Different delays for each ball
  const ballDelays = [0, 0.2, 0.4, 0.6, 0.8]

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen w-full bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)] flex items-center justify-center overflow-hidden"
    >
      {/* Ball 1 */}
      <motion.div 
        className="absolute top-[6%] left-[45%]"
        initial="initial"
        animate={controls}
        variants={ballVariants}
        custom={0}
      >
        <div className="w-20 h-20 rounded-full bg-[#00d1f7] shadow-lg shadow-cyan-500/50 border border-cyan-300/30"></div>
      </motion.div>

      {/* Ball 2 */}
      <motion.div 
        className="absolute top-[20%] left-[10%]"
        initial="initial"
        animate={controls}
        variants={ballVariants}
        custom={1}
        transition={{ delay: ballDelays[1] }}
      >
        <div className="w-20 h-20 rounded-full bg-[#00d1f7] shadow-lg shadow-cyan-500/50 border border-cyan-300/30"></div>
      </motion.div>

      {/* Ball 3 */}
      <motion.div 
        className="absolute top-[20%] right-[16%]"
        initial="initial"
        animate={controls}
        variants={ballVariants}
        custom={2}
        transition={{ delay: ballDelays[2] }}
      >
        <div className="w-20 h-20 rounded-full bg-[#00d1f7] shadow-lg shadow-cyan-500/50 border border-cyan-300/30"></div>
      </motion.div>

      {/* Ball 4 */}
      <motion.div 
        className="absolute bottom-[15%] left-[30%]"
        initial="initial"
        animate={controls}
        variants={ballVariants}
        custom={3}
        transition={{ delay: ballDelays[3] }}
      >
        <div className="w-20 h-20 rounded-full bg-[#00d1f7] shadow-lg shadow-cyan-500/50 border border-cyan-300/30"></div>
      </motion.div>

      {/* Ball 5 */}
      <motion.div 
        className="absolute bottom-20 right-80"
        initial="initial"
        animate={controls}
        variants={ballVariants}
        custom={4}
        transition={{ delay: ballDelays[4] }}
      >
        <div className="w-20 h-20 rounded-full bg-[#00d1f7] shadow-lg shadow-cyan-500/50 border border-cyan-300/30"></div>
      </motion.div>

      <div className="flex justify-center z-10">
        <motion.h1 
          className="text-white text-center text-lg font-extrabold tracking-wide uppercase drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          WHEN YOU'RE PITCHING FOR AN EVENT AND <br /> THE FOLLOWING HAPPENS...
        </motion.h1>
      </div>

      <div className="absolute bottom-0 left-4">
        <motion.img 
          src="/assets/section-two-men.png" 
          className="w-72" 
          alt="Baseball player silhouette" 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
    </section>
  )
}

export default NewSectionTwo
