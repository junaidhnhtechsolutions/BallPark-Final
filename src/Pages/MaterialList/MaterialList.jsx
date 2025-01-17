import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Particles from "../../components/ui/particles";

const MaterialList = () => {
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
          className="w-full max-w-5xl p-6 rounded-lg shadow-2xl bg-opacity-80 relative h-96 flex  justify-center items-center flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-5 left-5">
            <Link
              to="/dashboard"
              className="flex items-center text-white text-xl"
            >
              <FaArrowLeft />
              <span className="ml-2">Back</span>
            </Link>
          </div>
          <h3 className="text-center text-4xl font-bold text-white">
            Material List
          </h3>
          <p className="text-center text-4xl font-bold text-[#00083c] my-5">
            Coming soon...
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default MaterialList;
