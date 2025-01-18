import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import {
  FaFileAlt,
  FaProjectDiagram,
  FaQuoteLeft,
  FaBox,
  FaArrowLeft,
} from "react-icons/fa"; // Importing React Icons
import Particles from "../../components/ui/particles";

const NewProject = () => {
  return (
    <>
      <div className="flex w-full flex-col h-screen items-center justify-center bg-gradient-to-br from-[#00083c] via-[#73cddd] relative overflow-hidden">
        <Particles
          className="absolute inset-0 z-0"
          quantity={150}
          ease={100}
          color={"#ffffff"}
          refresh
        />
        <motion.div
          className="w-full max-w-5xl p-6 rounded-lg shadow-2xl bg-opacity-80 relative h-auto flex justify-center items-center flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-5 left-5">
            <Link
              to="/dashboard"
              className="flex items-center text-white text-lg md:text-xl"
            >
              <FaArrowLeft />
              <span className="ml-2">Back</span>
            </Link>
          </div>
          <h3 className="text-center text-3xl md:text-4xl font-bold text-white mt-6 md:mt-12">
            New Project
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {/* Button for Cost a Drawing */}
            <div className="text-center mt-4 w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link to={"/cost-drawing"}>
                  <button
                    className="btn breadcrumb_btn1 text-capitalize font-bold flex items-center justify-center p-4 sm:p-3 text-lg sm:text-base rounded-lg transition duration-300 bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
                    type="button"
                  >
                    <FaFileAlt className="mr-2" /> Cost a Drawing
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Button for Project Drawing */}
            <div className="text-center mt-4 w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to={"/project-drawing"}>
                  <button
                    className="btn breadcrumb_btn1 text-capitalize font-bold flex items-center justify-center p-4 sm:p-3 text-lg sm:text-base rounded-lg transition duration-300 bg-green-500 text-white hover:bg-green-600 w-full sm:w-auto"
                    type="button"
                  >
                    <FaProjectDiagram className="mr-2" /> Project Drawing
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Button for Start a Quote */}
            <div className="text-center mt-4 w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link to={"/start-quote"}>
                  <button
                    className="btn breadcrumb_btn1 text-capitalize font-bold flex items-center justify-center p-4 sm:p-3 text-lg sm:text-base rounded-lg transition duration-300 bg-yellow-500 text-white hover:bg-yellow-600 w-full sm:w-auto"
                    type="button"
                  >
                    <FaQuoteLeft className="mr-2" /> Start a Quote
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Button for Off The Shelf */}
            <div className="text-center mt-4 w-full sm:w-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link to={"/off-the-shelf"}>
                  <button
                    className="btn breadcrumb_btn1 text-capitalize font-bold flex items-center justify-center p-4 sm:p-3 text-lg sm:text-base rounded-lg transition duration-300 bg-red-500 text-white hover:bg-red-600 w-full sm:w-auto"
                    type="button"
                  >
                    <FaBox className="mr-2" /> Off The Shelf
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NewProject;
