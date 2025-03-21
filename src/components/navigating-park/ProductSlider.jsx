import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"


export default function ProductSlider({ data, heading }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const sliderRef = useRef(null)

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIfMobile()
        window.addEventListener("resize", checkIfMobile)

        return () => {
            window.removeEventListener("resize", checkIfMobile)
        }
    }, [])

    const getCardsToShow = () => {
        if (window.innerWidth < 640) return 1
        if (window.innerWidth < 1024) return 2
        return 4
    }

    const cardsToShow = typeof window !== "undefined" ? getCardsToShow() : 4

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + cardsToShow >= data?.length ? 0 : prevIndex + 1))
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.max(0, data?.length - cardsToShow) : prevIndex - 1))
    }

    const visibleVenues = data?.slice(currentIndex, Math.min(currentIndex + cardsToShow, data?.length))

    if (visibleVenues?.length < cardsToShow) {
        const remaining = cardsToShow - visibleVenues.length
        visibleVenues.push(...data?.slice(0, remaining))
    }

    return (
        <div className="w-full bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)] py-10 px-4 md:px-8 lg:px-12 overflow-hidden h-screen flex justify-center items-center">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-center text-white text-3xl md:text-4xl font-bold mb-10 tracking-wider drop-shadow-md">
                    {heading}
                </h2>

                <div className="relative">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white/10 rounded-full p-1 md:p-2 backdrop-blur-sm"
                        aria-label="Previous venue"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
                    </button>

                    <div ref={sliderRef} className="overflow-hidden px-4">
                        <motion.div
                            className="flex gap-4 md:gap-6"
                            initial={false}
                            animate={{ x: isMobile ? 0 : `calc(-${100 / cardsToShow}% * ${currentIndex})` }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {data?.map((venue, index) => (
                                <motion.div
                                    key={venue.id}
                                    className={`flex-shrink-0 ${isMobile ? "w-full" : `w-1/${cardsToShow}`} flex flex-col items-center`}
                                    style={{
                                        width: isMobile
                                            ? "100%"
                                            : `calc(${100 / cardsToShow}% - ${((cardsToShow - 1) * 16) / cardsToShow}px)`,
                                    }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{
                                        opacity: isMobile ? (index === currentIndex ? 1 : 0) : 1,
                                        scale: 1,
                                        display: isMobile ? (index === currentIndex ? "flex" : "none") : "flex",
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="text-center text-white font-bold text-xl md:text-2xl mb-3 tracking-wider drop-shadow-md h-20">
                                        {venue.title} <br />
                                        {venue.location}
                                    </div>

                                    <div className="w-full aspect-video overflow-hidden rounded-md mb-3 bg-black/20">
                                        {venue?.image &&
                                            <img
                                                src={venue.image}
                                                alt={`${venue.title} in ${venue.location}`}
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover"
                                            />}
                                    </div>

                                    <div className="h-20">
                                        <div className="text-center text-white font-semibold mb-1 drop-shadow-sm">
                                            Hire cost: {venue.cost}
                                        </div>
                                        <div className="text-center text-white font-semibold mb-4 drop-shadow-sm">
                                            Capacity: {venue.capacity}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <button className="px-6 py-2 bg-gradient-to-b from-[#f0d078] to-[#d4af37] text-black font-bold rounded-2xl uppercase text-sm tracking-wider shadow-md border border-[#c4a02f]">
                                            ADD TO PROJECT
                                        </button>
                                        <button className="px-6 py-2 bg-gradient-to-b from-[#00cc66] to-[#00aa55] text-black font-bold rounded-2xl uppercase text-sm tracking-wider shadow-md border border-[#009944]">
                                            DOWNLOAD OBJ
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white/10 rounded-full p-1 md:p-2 backdrop-blur-sm"
                        aria-label="Next venue"
                    >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
                    </button>
                </div>
            </div>
        </div>
    )
}

