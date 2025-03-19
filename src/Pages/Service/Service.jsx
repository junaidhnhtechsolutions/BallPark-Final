import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./service.css";
import Particles from "../../components/ui/particles";
import { FaBasketballBall, FaHistory, FaProjectDiagram } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaListUl } from "react-icons/fa6";
import { motion } from "framer-motion";

const Service = () => {
  const navigate = useNavigate();

  const navigatePage = (url) => {
    navigate(url);
  };

  return (
    <>
      <section className="relative min-h-[600px] w-full bg-gradient-to-b from-[#00b4d8] to-[#0096c7] flex items-center justify-center p-8 flex-col">
        <img src="/assets/dashboard-one-text.png" className="w-6/12" alt="" />
        <img src="/assets/dashboard-one-img.png" className="w-6/12" alt="" />
      </section>
      <div className="relative min-h-[600px] w-full bg-gradient-to-b from-[#00b4d8] to-[#0096c7] flex items-center justify-center p-8 flex-col">
        <div className="container mx-auto px-6 md:px-20 md:my-0 my-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
          <motion.div
            className="bg-[#008cc2] border-2 border-white h-44 md:h-96 rounded-2xl flex justify-center items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => navigatePage("/new-project")}
          >
            <Link
              to={"/new-project"}
              className="flex flex-col justify-center items-center"
            >
              <FaProjectDiagram className="text-5xl md:text-6xl mb-4 text-white" />
              <h3 className="stylish-text text-lg md:text-xl">New Project</h3>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            <motion.div
              className="bg-[#008cc2] border-2 border-white h-44 rounded-2xl flex justify-center items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigatePage("/post-project")}
            >
              <Link
                to={"/post-project"}
                className="flex flex-col justify-center items-center"
              >
                <FaHistory className="text-5xl md:text-6xl mb-4 text-white" />
                <h3 className="stylish-text text-lg md:text-xl">Past Project</h3>
              </Link>
            </motion.div>

            <motion.div
              className="bg-[#008cc2] border-2 border-white h-44 rounded-2xl flex justify-center items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigatePage("/profile")}
            >
              <Link
                to={"/profile"}
                className="flex flex-col justify-center items-center"
              >
                <CgProfile className="text-5xl md:text-6xl mb-4 text-white" />
                <h3 className="stylish-text text-lg md:text-xl">My Profile</h3>
              </Link>
            </motion.div>

            <motion.div
              className="bg-[#008cc2] border-2 border-white h-44 rounded-2xl flex justify-center items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigatePage("/Ballpark-picture")}
            >
              <Link
                to={"/Ballpark-picture"}
                className="flex flex-col justify-center items-center"
              >
                <FaBasketballBall className="text-5xl md:text-6xl mb-4 text-white" />
                <h3 className="stylish-text text-lg md:text-xl">Ballpark 2.0</h3>
              </Link>
            </motion.div>

            <motion.div
              className="bg-[#008cc2] border-2 border-white h-44 rounded-2xl flex justify-center items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigatePage("/material-list")}
            >
              <Link
                to={"/material-list"}
                className="flex flex-col justify-center items-center"
              >
                <FaListUl className="text-5xl md:text-6xl mb-4 text-white" />
                <h3 className="stylish-text text-lg md:text-xl">Materials List</h3>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
