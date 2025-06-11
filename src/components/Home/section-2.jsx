import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const Section2 = () => {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const ballY = useTransform(
    scrollYProgress,
    [0, 0.33, 0.34, 0.66, 0.67, 1],
    ["-2%", "-2%", "35%", "35%", "90%", "90%"],
  )

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 md:py-32 relative">
        <div className="text-center my-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6">
            BUT HOW WILL THIS
            <br />
            WORK?
          </h1>
          <p className="text-[18px] font-semibold text-white max-w-2xl mx-auto">
            This not only provides a baseline understanding of costs but also <br />
            allows you to connect directly with suppliers that match your <br /> budget.
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="absolute md:left-1/2 left-6 transform -translate-x-1/2 h-full w-1 bg-white"></div>

          <motion.div className="absolute md:left-1/2 left-6 transform -translate-x-1/2 z-10" style={{ top: ballY }}>
            <img src="/assets/section-two-ball.png" className="w-16" alt="Bubble" />
          </motion.div>

          <div className="space-y-24 relative">
            <div className="timeline-item flex items-center justify-center relative">
              <div className="md:w-1/2 pl-16 ml-auto">
                <p className="text-[18px] font-semibold text-white">
                  Our website functions as a shopping list for ballpark costs, allowing you to effortlessly "add to
                  project" everything from venues and trade booths to floral arches. Plus, our one-of-a-kind AI can
                  generate baseline cost estimates for your own drawings.
                </p>
              </div>
            </div>
            <div className="timeline-item flex items-center justify-center relative mt-20">
              <div className="md:w-1/2 pl-16 ml-auto">
                <p className="text-[18px] font-semibold text-white">
                  Once you have this ballpark cost for your event, you can use it as a foundation to refine your design,
                  incorporating bespoke finishes while keeping your baseline budget in mind.
                </p>
              </div>
            </div>
            <div className="timeline-item flex items-center justify-center relative mt-20">
              <div className="md:w-1/2 pl-16 ml-auto">
                <p className="text-[18px] font-semibold text-white">
                  Once you've completed this step, go to your Ballpark Quote and click "Email Suppliers." This will send
                  a blanket email from you to all the suppliers you've added to your project, including details of what
                  you're interested in. They will then respond, allowing you to update them with any bespoke changes
                  you've made so they can quickly provide a revised quote—ready for you to book and move forward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section2
