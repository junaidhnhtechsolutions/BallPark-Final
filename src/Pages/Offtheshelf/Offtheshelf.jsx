import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

const Offtheshelf = () => {
  return (
    <>
      <div className="flex w-full flex-col h-full min-h-screen items-center justify-center bg-[#00b4d8] relative overflow-hidden">
        <motion.div
          className="w-full max-w-5xl h-96 relative flex justify-center items-center flex-col md:my-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-5 left-5">
            <Link
              to="/new-project"
              className="flex items-center text-white text-xl"
            >
              <FaArrowLeft />
              <span className="ml-2">Back</span>
            </Link>
          </div>
          <h3 className="text-center text-4xl font-bold text-white">
            Off the Shelf
          </h3>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-96 w-72"
          >
            <select className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500">
              <option selected value="">
                Select...
              </option>
              <option value="">Event shell</option>
              <option value="">Furniture</option>
              <option value="">Item</option>
              <option value="">Staff</option>
            </select>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Offtheshelf;
