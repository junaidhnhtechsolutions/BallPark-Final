import React, { useEffect, useState } from "react";
import BaseUrl from "../../Auth/BaseUrl";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Particles from "../../components/ui/particles";

const PostProject = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const GetProjects = async () => {
    try {
      const response = await axios?.get(`${BaseUrl.baseurlImage}GetCostEstimate/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchResults(response?.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    GetProjects();
    // eslint-disable-next-line
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults?.message?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleClick = (result) => {
    navigate("/result-data", {
      state: { result, from: window.location.pathname },
    });
  };

  return (
    <>
      <div className="flex w-full flex-col h-full min-h-screen items-center justify-center bg-gradient-to-br from-[#00083c] via-[#73cddd] relative overflow-hidden">
        <Particles className="absolute inset-0 z-0" quantity={150} ease={100} color={"#ffffff"} refresh />
        
        <motion.div
          className="w-full max-w-5xl p-6 rounded-lg shadow-2xl bg-opacity-80 relative flex justify-center items-center flex-col md:my-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-5 left-5">
            <Link to="/dashboard" className="flex items-center text-white text-xl">
              <FaArrowLeft />
              <span className="ml-2">Back</span>
            </Link>
          </div>
          <h3 className="text-center text-4xl font-bold text-white">Past Project</h3>

          <div>
            {currentItems?.length > 0 ? (
              <div className="search-results my-4 container">
                <div className={`grid md:grid-cols-3 gap-4`}>
                  {currentItems.map((result) => (
                    <motion.div
                      onClick={() => handleClick(result)}
                      key={result?.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="p-3 border shadow-md rounded cursor-pointer h-full bg-white">
                        <img
                          src={result?.image_url}
                          alt="not found"
                          className="img-fluid rounded mb-2"
                          style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "250px",
                          }}
                        />
                        <p className="capitalize text-xl text-medium text-gray-800">{result?.project_name}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {searchResults?.message?.length > itemsPerPage && (
                  <Pagination className="justify-center mt-4 d-flex">
                    {Array.from(
                      { length: Math.ceil(searchResults?.message?.length / itemsPerPage) },
                      (_, index) => (
                        <Pagination.Item
                          key={index + 1}
                          active={index + 1 === currentPage}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      )
                    )}
                  </Pagination>
                )}
              </div>
            ) : (
              <p className="text-center text-white">No Project Drawing...</p>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PostProject;
