import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const MaterialList = () => {
  return (
    <>
      <div className="flex w-full flex-col h-screen items-center justify-center bg-[#00b4d8] relative overflow-hidden">
        <motion.div
          className="w-full max-w-5xl p-6 relative flex justify-center items-center flex-col"
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
          <h3 className="text-center text-4xl font-bold text-white mt-5">
            Material List
          </h3>
          <div>
            <img src="/assets/dashboard/comming-soon.png" className="w-96" alt="" />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MaterialList;
