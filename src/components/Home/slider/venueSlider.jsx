// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function VenueSlider({ slides }) {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) =>
//                 prevIndex === slides?.length - 1 ? 0 : prevIndex + 1
//             );
//         }, 5000);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <section className="relative h-screen w-full overflow-hidden"
//             style={{
//                 backgroundImage: 'url("/assets/img/banner/rotate-yes.jpg")',
//                 backgroundPosition: 'center',
//                 backgroundSize: 'cover'
//             }}
//         >

//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={currentIndex}
//                     initial={{ opacity: 0, x: 100 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -100 }}
//                     transition={{ duration: 0.5 }}
//                     className="w-full relative"
//                 >
//                     <img
//                         src={slides[currentIndex]?.image}
//                         alt="Image"
//                         className="object-cover w-full h-full"
//                     />
//                 </motion.div>
//             </AnimatePresence>
//         </section>
//     );
// }



import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function VenueSlider({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides?.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides?.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <section
            className="relative h-screen w-full overflow-hidden"
            style={{
                backgroundImage: 'url("/assets/img/banner/rotate-yes.jpg")',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
        >
            {/* Left Arrow */}
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-black bg-opacity-40 p-3 rounded-full text-white hover:bg-opacity-70 transition"
            >
                <FaChevronLeft size={24} />
            </button>

            {/* Right Arrow */}
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-black bg-opacity-40 p-3 rounded-full text-white hover:bg-opacity-70 transition"
            >
                <FaChevronRight size={24} />
            </button>

            {/* Slide */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                >
                    <img
                        src={slides[currentIndex]?.image}
                        alt="Slide"
                        className="object-cover w-full h-full"
                    />
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
