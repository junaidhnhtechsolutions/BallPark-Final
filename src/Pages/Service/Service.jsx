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
      <div className="flex w-full items-center h-auto md:h-[100vh] bg-gradient-to-br from-[#00083c] via-[#73cddd] relative">
        <Particles
          className="absolute inset-0 z-0"
          quantity={150}
          ease={100}
          color={"#ffffff"}
          refresh
        />

        <div className="container mx-auto px-6 md:px-20 md:my-0 my-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
          <motion.div
            className="bg-[#00083c] h-44 md:h-96 rounded-2xl flex justify-center items-center cursor-pointer"
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
              className="bg-[#00083c] h-44 rounded-2xl flex justify-center items-center cursor-pointer"
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
              className="bg-[#00083c] h-44 rounded-2xl flex justify-center items-center cursor-pointer"
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
              className="bg-[#00083c] h-44 rounded-2xl flex justify-center items-center cursor-pointer"
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
              className="bg-[#00083c] h-44 rounded-2xl flex justify-center items-center cursor-pointer"
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
