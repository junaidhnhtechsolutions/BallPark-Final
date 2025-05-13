import { useScroll, useTransform, motion } from "framer-motion"
import { useIsMobile } from "../hooks/use-mobile";
import React, { useRef } from "react";


export default function ScrollSections() {
    const isMobile = useIsMobile();
    return isMobile ? <MobileScrollSections /> : <DesktopScrollSections />
}

function DesktopScrollSections() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const ball1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0])
    const image1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1])
    const image1Scale = useTransform(scrollYProgress, [0.05, 0.15], [0.5, 1])
    const image1Rotate = useTransform(scrollYProgress, [0.05, 0.15], [-10, 0])

    const ball2Opacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0])
    const image2Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
    const image2Scale = useTransform(scrollYProgress, [0.2, 0.3], [0.5, 1])
    const image2Rotate = useTransform(scrollYProgress, [0.2, 0.3], [-10, 0])

    const ball3Opacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0])
    const image3Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])
    const image3Scale = useTransform(scrollYProgress, [0.35, 0.45], [0.5, 1])
    const image3Rotate = useTransform(scrollYProgress, [0.35, 0.45], [-10, 0])

    const ball4Opacity = useTransform(scrollYProgress, [0.5, 0.6], [1, 0])
    const image4Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
    const image4Scale = useTransform(scrollYProgress, [0.5, 0.6], [0.5, 1])
    const image4Rotate = useTransform(scrollYProgress, [0.5, 0.6], [-10, 0])

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
            <div
                className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: 'url("/assets/img/banner/rotate-no.jpg")',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                <div className="absolute bottom-5 left-4 md:left-10 z-30">
                    <motion.div
                        className="flex flex-col items-center"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <img src="/assets/section-two-men.png" className="w-20 md:w-32" alt="Baseball player" />
                        <p className="text-white text-[10px] md:text-xs font-bold mt-1 md:mt-2 text-center">
                            SCROLL DOWN
                            <br />
                            TO START
                        </p>
                    </motion.div>
                </div>

                <div className="flex justify-center z-30 mt-5 px-2">
                    <motion.h1
                        className="text-white text-center text-sm md:text-lg font-extrabold tracking-wide uppercase drop-shadow-md leading-snug"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        WHEN YOU'RE PITCHING FOR AN EVENT AND <br />
                        THE FOLLOWING HAPPENS...
                    </motion.h1>
                </div>

                <div className="absolute w-full h-full flex flex-col lg:flex-row justify-between">
                    {positions.map((pos, index) => {
                        const transforms = ballTransforms[index]
                        const positionStyle = {
                            top: `${pos.top}%`,
                            left: pos.left !== undefined ? `${pos.left}%` : undefined,
                            right: pos.right !== undefined ? `${pos.right}%` : undefined,
                            transform: pos.transform,
                        }
                        const imageStyle = {
                            top: `${(pos.top || 0) - 10}%`,
                            left: pos.left !== undefined ? `${pos.left - 10}%` : undefined,
                            right: pos.right !== undefined ? `${pos.right - 10}%` : undefined,
                            transform: pos.transform,
                        }

                        return (
                            <React.Fragment key={index}>
                                <motion.div
                                    className="absolute"
                                    style={{
                                        ...positionStyle,
                                        opacity: transforms.ballOpacity,
                                    }}
                                >
                                    <img src={ballSrc || "/placeholder.svg"} className="w-16 md:w-20" alt="Blue ball" />
                                </motion.div>

                                <motion.div
                                    className="absolute"
                                    style={{
                                        ...imageStyle,
                                        opacity: transforms.imageOpacity,
                                        scale: transforms.imageScale,
                                        rotate: transforms.imageRotate,
                                        transformOrigin: "center center",
                                    }}
                                >
                                    <img
                                        src={imageSources[index] || "/placeholder.svg"}
                                        className="w-48 md:w-72 2xl:w-96"
                                        alt="Explosion bubble"
                                    />
                                </motion.div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function MobileScrollSections() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const ball1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0])
    const image1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1])
    const image1Scale = useTransform(scrollYProgress, [0.05, 0.15], [0.5, 1])
    const image1Rotate = useTransform(scrollYProgress, [0.05, 0.15], [-10, 0])

    const ball2Opacity = useTransform(scrollYProgress, [0.2, 0.3], [1, 0])
    const image2Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
    const image2Scale = useTransform(scrollYProgress, [0.2, 0.3], [0.5, 1])
    const image2Rotate = useTransform(scrollYProgress, [0.2, 0.3], [-10, 0])

    const ball3Opacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0])
    const image3Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])
    const image3Scale = useTransform(scrollYProgress, [0.35, 0.45], [0.5, 1])
    const image3Rotate = useTransform(scrollYProgress, [0.35, 0.45], [-10, 0])

    const ball4Opacity = useTransform(scrollYProgress, [0.5, 0.6], [1, 0])
    const image4Opacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])
    const image4Scale = useTransform(scrollYProgress, [0.5, 0.6], [0.5, 1])
    const image4Rotate = useTransform(scrollYProgress, [0.5, 0.6], [-10, 0])

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
        { top: 10, left: 50, transform: "translateX(-50%)" },
        { top: 25, left: 50, transform: "translateX(-50%)" },
        { top: 40, left: 50, transform: "translateX(-50%)" },
        { top: 65, left: 50, transform: "translateX(-50%)" },
        { top: 80, left: 50, transform: "translateX(-50%)" },
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
            <div
                className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: 'url("/assets/img/banner/rotate-no.jpg")',
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                <div className="absolute bottom-5 left-4 z-30">
                    <motion.div
                        className="flex flex-col items-center"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <img src="/assets/section-two-men.png" className="w-20" alt="Baseball player" />
                        <p className="text-white text-[10px] font-bold mt-1 text-center">
                            SCROLL DOWN
                            <br />
                            TO START
                        </p>
                    </motion.div>
                </div>

                <div className="flex justify-center z-30 px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                    <motion.h1
                        className="text-white text-center text-sm font-extrabold tracking-wide uppercase drop-shadow-md leading-snug"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        WHEN YOU'RE PITCHING FOR AN EVENT AND THE FOLLOWING HAPPENS...
                    </motion.h1>
                </div>

                <div className="absolute w-full h-full">
                    {positions.map((pos, index) => {
                        const transforms = ballTransforms[index]
                        const positionStyle = {
                            top: `${pos.top}%`,
                            left: `${pos.left}%`,
                            transform: pos.transform,
                        }
                        const imageStyle = {
                            top: `${(pos.top || 0) - 8}%`,
                            left: `${pos.left - 20}%`,
                            transform: pos.transform,
                        }

                        return (
                            <React.Fragment key={index}>
                                <motion.div
                                    className="absolute"
                                    style={{
                                        ...positionStyle,
                                        opacity: transforms.ballOpacity,
                                    }}
                                >
                                    <img src={ballSrc || "/placeholder.svg"} className="w-14" alt="Blue ball" />
                                </motion.div>

                                <motion.div
                                    className="absolute"
                                    style={{
                                        ...imageStyle,
                                        opacity: transforms.imageOpacity,
                                        scale: transforms.imageScale,
                                        rotate: transforms.imageRotate,
                                        transformOrigin: "center center",
                                    }}
                                >
                                    <img src={imageSources[index] || "/placeholder.svg"} className="w-40" alt="Explosion bubble" />
                                </motion.div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

