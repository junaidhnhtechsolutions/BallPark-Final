import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./service.css";
import { motion } from "framer-motion";

const Service = () => {
  const navigate = useNavigate();

  const navigatePage = (url) => {
    navigate(url);
  };

  const handleShowLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };


  return (
    <>
      <section className="relative min-h-[600px] w-full bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)] flex items-center justify-center p-8 flex-col">
        <img src="/assets/dashboard-one-text.png" className="w-6/12" alt="" />
        <img src="/assets/dashboard-one-img.png" className="w-6/12" alt="" />
      </section>
      <div className="relative min-h-[600px] w-full bg-[radial-gradient(circle_at_center,_#00d1f7_0%,_#00b4d8_30%,_#0096c7_80%)] flex items-center justify-center p-8 flex-col">
        <div className="container mx-auto px-6 md:px-20 md:my-0 my-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
          <motion.div
            className="bg-[#008cc2] border-2 border-white h-44 md:h-96 rounded-3xl flex justify-center items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => navigatePage("/new-project")}
          >
            <Link
              to={"/new-project"}
              className="flex flex-col justify-center items-center"
            >
              <h3 className="text-white text-lg md:text-2xl font-extrabold uppercase text-center">New Project</h3>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            <motion.div
              className="bg-[#008cc2] border-2 border-white h-44 rounded-3xl flex justify-center items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigatePage("/post-project")}
            >
              <Link
                to={"/post-project"}
                className="flex flex-col justify-center items-center"
              >
                <h3 className="text-white text-lg md:text-2xl font-extrabold uppercase text-center">Past <br /> PRODUCTS</h3>
              </Link>
            </motion.div>

            <motion.div
              className="bg-[#008cc2] border-2 border-white h-44 rounded-3xl flex justify-center items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigatePage("/profile")}
            >
              <Link
                to={"/profile"}
                className="flex flex-col justify-center items-center"
              >
                <h3 className="text-white text-lg md:text-2xl font-extrabold uppercase text-center">Profile</h3>
              </Link>
            </motion.div>

            <motion.div
              className="bg-[#008cc2] border-2 border-white h-44 rounded-3xl flex justify-center items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => navigatePage("/material-list")}
            >
              <Link
                to={"/material-list"}
                className="flex flex-col justify-center items-center"
              >
                <h3 className="text-white text-lg md:text-2xl font-extrabold uppercase text-center">
                  Materials <br />
                  SPREADSHEET</h3>
              </Link>
            </motion.div>


            <motion.div
              className="bg-[#008cc2] border-2 border-white h-44 rounded-3xl flex justify-center items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                onClick={handleShowLogout}
                className="flex flex-col justify-center items-center"
              >
                <h3 className="text-white text-lg md:text-2xl font-extrabold uppercase text-center">Log out</h3>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
