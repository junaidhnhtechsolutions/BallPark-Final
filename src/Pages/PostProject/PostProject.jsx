import React, { useEffect, useState } from "react";
import BaseUrl from "../../Auth/BaseUrl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
      <div className="flex w-full flex-col h-full min-h-screen items-center justify-center bg-[#00b4d8] relative overflow-hidden">

        <motion.div initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 px-12 my-20"
        >
          <div className="md:col-span-4">
            <Link to="/dashboard" className="flex items-center text-white bg-[#AA9D6D]
            text-md font-medium w-28 rounded-full justify-center h-12">
              Home
            </Link>
            <h3 className="text-4xl font-bold text-white mt-5">Past Project</h3>
          </div>

          <div className="md:col-span-8">
            {currentItems?.length > 0 ? (
              <div className="search-results my-4 container">
                {currentItems?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentItems?.map((result) => (
                      <motion.div
                        onClick={() => {
                          handleClick(result);
                          localStorage.setItem("items", JSON.stringify(result));
                        }}
                        key={result?.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="cursor-pointer relative aspect-square"
                      >
                        <div className="w-full h-full bg-[#0099cc] border-2 border-[#00ccff] rounded-md overflow-hidden shadow-lg">
                          {result?.image_url ? (
                            <div className="relative w-full h-full">
                              <img
                                src={result?.image_url || "/placeholder.svg"}
                                alt={result?.project_name || "Project"}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                <p className="text-white text-center text-xl font-bold uppercase px-4">
                                  {result?.project_name || "Name of Project"}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <p className="text-white text-center text-xl font-bold uppercase px-4">
                                {result?.project_name || "Name of Project"}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {Array.from({ length: Math.max(0, 9 - (currentItems?.length || 0)) }).map((_, index) => (
                      <div
                        key={`empty-${index}`}
                        className="aspect-square bg-[#0099cc] border-2 border-[#00ccff] rounded-md shadow-lg"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-white text-xl">No Project Drawing...</div>
                )}

                {searchResults?.message?.length > itemsPerPage && (
                  <div className="flex justify-center py-8">
                    <div className="flex space-x-2">
                      {Array.from(
                        { length: Math.ceil((searchResults?.message?.length || 0) / itemsPerPage) },
                        (_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${index + 1 === currentPage
                              ? "bg-white text-blue-600 font-bold"
                              : "bg-blue-600 text-white hover:bg-blue-500"
                              }`}
                          >
                            {index + 1}
                          </button>
                        )
                      )}
                    </div>
                  </div>
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
