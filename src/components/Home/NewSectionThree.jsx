// import React from 'react'

// function NewSectionThree() {
//   return (
//     <>
//       <section className="relative h-screen w-full bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)] flex items-center justify-center overflow-hidden">
//         <div className="absolute top-[15%] left-[8%]">
//           <img
//             src="/assets/section-three-one.png"
//             className="w-72 2xl:w-96"
//             alt="Bubble"
//           />
//         </div>

//         <div className="absolute top-[6%] left-[36%]">
//           <img
//             src="/assets/section-three-two.png"
//             className="w-72 2xl:w-96"
//             alt="Bubble"
//           />
//         </div>


//         <div className="absolute top-[18%] right-[10%]">
//           <img
//             src="/assets/section-three-three.png"
//             className="w-72 2xl:w-96"
//             alt="Bubble"
//           />
//         </div>

//         <div className="absolute bottom-[2%] left-[25%]">
//           <img
//             src="/assets/section-three-four.png"
//             className="w-72 2xl:w-96"
//             alt="Bubble"
//           />
//         </div>

//         <div className="text-center z-10 relative top-5 bottom-5">
//           <h1 class="text-white text-center text-xl font-extrabold tracking-wide uppercase drop-shadow-md">
//             WHEN YOU'RE PITCHING FOR AN EVENT AND <br /> THE FOLLOWING HAPPENS...
//           </h1>
//         </div>

//         <div className="absolute bottom-[2%] right-[20%]">
//           <img
//             src="/assets/section-three-five.png"
//             className="w-72 2xl:w-96"
//             alt="Bubble"
//           />
//         </div>


//         <div className="absolute bottom-0 left-4">
//           <img src="/assets/section-two-men.png" className="w-72" alt="Baseball player silhouette" />
//         </div>
//       </section>
//     </>
//   )
// }

// export default NewSectionThree



import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

function NewSectionThree() {
  const controls = useAnimation()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Explosion bubble animation variants
  const bubbleVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: -10,
    },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: i * 0.2,
        duration: 0.8,
      },
    }),
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)] flex items-center justify-center overflow-hidden"
    >
      {/* Explosion 1 */}
      <motion.div
        className="absolute top-[15%] left-[8%]"
        initial="hidden"
        animate={controls}
        variants={bubbleVariants}
        custom={0}
      >
        <img src="/assets/section-three-one.png" className="w-72 2xl:w-96" alt="Explosion bubble" />
      </motion.div>

      {/* Explosion 2 */}
      <motion.div
        className="absolute top-[6%] left-[36%]"
        initial="hidden"
        animate={controls}
        variants={bubbleVariants}
        custom={1}
      >
        <img src="/assets/section-three-two.png" className="w-72 2xl:w-96" alt="Explosion bubble" />
      </motion.div>

      {/* Explosion 3 */}
      <motion.div
        className="absolute top-[18%] right-[10%]"
        initial="hidden"
        animate={controls}
        variants={bubbleVariants}
        custom={2}
      >
        <img src="/assets/section-three-three.png" className="w-72 2xl:w-96" alt="Explosion bubble" />
      </motion.div>

      {/* Explosion 4 */}
      <motion.div
        className="absolute bottom-[2%] left-[25%]"
        initial="hidden"
        animate={controls}
        variants={bubbleVariants}
        custom={3}
      >
        <img src="/assets/section-three-four.png" className="w-72 2xl:w-96" alt="Explosion bubble" />
      </motion.div>

      {/* Explosion 5 */}
      <motion.div
        className="absolute bottom-[2%] right-[20%]"
        initial="hidden"
        animate={controls}
        variants={bubbleVariants}
        custom={4}
      >
        <img src="/assets/section-three-five.png" className="w-72 2xl:w-96" alt="Explosion bubble" />
      </motion.div>

      <div className="text-center z-10 relative">
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
    </section>
  )
}

export default NewSectionThree

