// import Section3 from "../components/Home/section-3";
// import Section1 from "../components/Home/section-1";
// import NewSectionTwo from "../components/Home/NewSectionTwo";
// import NewSectionThree from "../components/Home/NewSectionThree";
import Herobanner from "../components/Home/hero-banner";
import Section2 from "../components/Home/section-2";
import Template from "../layout/template";
import React, { useEffect, useState, useRef } from "react";
import NewSectionOne from "../components/Home/NewSectionOne";
import NewSectionFour from "../components/Home/NewSectionFour";
import NewSectionFive from "../components/Home/NewSectionFive";
import NewSectionSix from "../components/Home/NewSectionSix";
import HomeSliderSection from "../components/Home/HomeSliderSection";
import { useScroll, useTransform, motion } from "framer-motion"


function ScrollSections() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // First ball (top left) transitions first
  const ball1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0])
  const image1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1])
  const image1Scale = useTransform(scrollYProgress, [0.05, 0.15], [0.5, 1])
  const image1Rotate = useTransform(scrollYProgress, [0.05, 0.15], [-10, 0])

  // Second ball (top center) transitions second
  const ball2Opacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0])
  const image2Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const image2Scale = useTransform(scrollYProgress, [0.2, 0.3], [0.5, 1])
  const image2Rotate = useTransform(scrollYProgress, [0.2, 0.3], [-10, 0])

  // Third ball (top right) transitions third
  const ball3Opacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0])
  const image3Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])
  const image3Scale = useTransform(scrollYProgress, [0.35, 0.45], [0.5, 1])
  const image3Rotate = useTransform(scrollYProgress, [0.35, 0.45], [-10, 0])

  // Fourth ball (bottom left) transitions fourth
  const ball4Opacity = useTransform(scrollYProgress, [0.5, 0.6], [1, 0])
  const image4Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
  const image4Scale = useTransform(scrollYProgress, [0.5, 0.6], [0.5, 1])
  const image4Rotate = useTransform(scrollYProgress, [0.5, 0.6], [-10, 0])

  // Fifth ball (bottom right) transitions fifth
  const ball5Opacity = useTransform(scrollYProgress, [0.65, 0.75], [1, 0])
  const image5Opacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1])
  const image5Scale = useTransform(scrollYProgress, [0.65, 0.75], [0.5, 1])
  const image5Rotate = useTransform(scrollYProgress, [0.65, 0.75], [-10, 0])

  const ballTransforms = [
    { ballOpacity: ball1Opacity, imageOpacity: image1Opacity, imageScale: image1Scale, imageRotate: image1Rotate },
    { ballOpacity: ball2Opacity, imageOpacity: image2Opacity, imageScale: image2Scale, imageRotate: image2Rotate },
    { ballOpacity: ball3Opacity, imageOpacity: image3Opacity, imageScale: image3Scale, imageRotate: image3Rotate },
    { ballOpacity: ball4Opacity, imageOpacity: image4Opacity, imageScale: image4Scale, imageRotate: image4Rotate },
    { ballOpacity: ball5Opacity, imageOpacity: image5Opacity, imageScale: image5Scale, imageRotate: image5Rotate },
  ]

  const positions = [
    { top: 15, left: 15, right: undefined },
    { top: 15, left: 50, right: undefined, transform: "translateX(-50%)" },
    { top: 15, left: undefined, right: 15 },
    { top: 70, left: 25, right: undefined },
    { top: 70, left: undefined, right: 25 },
  ]

  const ballSrc = "/assets/section-two-ball.png"
  const imageSources = [
    "/assets/section-three-one.png",
    "/assets/section-three-two.png",
    "/assets/section-three-three.png",
    "/assets/section-three-four.png",
    "/assets/section-three-five.png",
  ]

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)] flex items-center justify-center overflow-hidden">
        <div className="absolute bottom-10 left-10 z-30">
          <motion.div
            className="flex flex-col items-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <img src="/assets/section-two-men.png" className="w-32" alt="Baseball player silhouette" />
            <p className="text-white text-xs font-bold mt-2">
              SCROLL DOWN
              <br />
              TO START
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center z-30">
          <motion.h1
            className="text-white text-center text-lg font-extrabold tracking-wide uppercase drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            WHEN YOU'RE PITCHING FOR AN EVENT AND <br /> THE FOLLOWING HAPPENS...
          </motion.h1>
        </div>

        {positions?.map((pos, index) => {
          const positionStyle = {
            position: "absolute",
            top: pos?.top + "%",
            left: pos?.left + "%",
            right: pos?.right + "%",
            transform: pos?.transform,
          }

          const positionStyleImage = {
            position: "absolute",
            top: pos?.top - 10 + "%",
            left: pos?.left - 10 + "%",
            right: pos?.right - 10 + "%",
            transform: pos?.transform,
          }
          const transforms = ballTransforms[index]
          return (
            <React.Fragment key={index}>
              <motion.div
                style={{
                  ...positionStyle,
                  opacity: transforms?.ballOpacity,
                }}
              >
                <img src={ballSrc || "/placeholder.svg"} className="w-20" alt="Blue ball" />
              </motion.div>

              <motion.div
                style={{
                  ...positionStyleImage,
                  opacity: transforms?.imageOpacity,
                  scale: transforms?.imageScale,
                  rotate: transforms?.imageRotate,
                  transformOrigin: "center center",
                }}
              >
                <img src={imageSources[index] || "/placeholder.svg"} className="w-72 2xl:w-96" alt="Explosion bubble" />
              </motion.div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}


const Home = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollPosition / maxHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <Template>
      <div className="relative">
        <div className="fixed top-0 left-0 w-full h-1 z-40 bg-gray-300">
          <div
            className="bg-[#FF007A] h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <Herobanner />
        <div>
          <NewSectionOne />
        </div>
        <ScrollSections />
        <div>
          <NewSectionFour />
        </div>
        <div>
          <NewSectionFive />
        </div>
        <div>
          <HomeSliderSection />
        </div>
        <div id="about">
          <Section2 />
        </div>
        <div>
          <NewSectionSix />
        </div>
      </div>

    </Template>
  );
};

export default Home;

