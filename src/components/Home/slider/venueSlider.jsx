import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function VenueSlider({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#00b4d8] to-[#06090a]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full relative"
                >
                    <img
                        src={slides[currentIndex]?.image}
                        alt={slides[currentIndex].title}
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute top-20 left-20">
                        <h3 className="text-4xl font-bold text-white">{slides[currentIndex].title}</h3>
                        <p className="text-white/90 mt-5 w-96">{slides[currentIndex].description}</p>
                    </div>
                </motion.div>
            </AnimatePresence>

            <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
                aria-label="Previous slide"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white  flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
                aria-label="Next slide"
            >
                <ArrowRight className="w-6 h-6" />
            </button>
        </section>
    );
}