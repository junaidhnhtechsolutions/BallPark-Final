import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VenueSlider({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden"
            style={{
                backgroundImage: 'url("/assets/img/banner/rotate-yes.jpg")',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
        >

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
                        alt="Image"
                        className="object-cover w-full h-full"
                    />
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
