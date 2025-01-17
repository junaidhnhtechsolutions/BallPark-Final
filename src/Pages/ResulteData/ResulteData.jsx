import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";
import Particles from "../../components/ui/particles";

const ResulteData = () => {
  const location = useLocation();
  const { result, from } = location?.state || {};
  const previousPath = from || "No previous path";

  if (!result) {
    return <div>Loading...</div>;
  }

  const estimateSections = JSON.parse(result?.estimate || "[]");

  return (
    <>
      <div className="flex w-full flex-col min-h-screen items-center justify-start bg-gradient-to-br from-[#00083c] via-[#73cddd] relative overflow-auto overflow-x-hidden">
        <Particles
          className="absolute inset-0 z-0"
          quantity={150}
          ease={100}
          color={"#ffffff"}
          refresh
        />
        <motion.div
          className="w-full max-w-5xl p-6 rounded-lg shadow-2xl bg-opacity-80 relative flex justify-center items-center flex-col md:my-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-5 left-5">
            {previousPath === "/post-project" ? (
              <Link
                to="/post-project"
                className="flex items-center text-white text-xl"
              >
                <FaArrowLeft />
                <span className="ml-2">Back</span>
              </Link>
            ) : (
              <Link
                to="/project-drawing"
                className="flex items-center text-white text-xl"
              >
                <FaArrowLeft />
                <span className="ml-2">Back</span>
              </Link>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 border w-full mt-10">
            <div className="p-3 shadow-md rounded h-full">
              <img
                src={result?.image_url}
                alt="not found"
                className="rounded-lg mb-4"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "250px",
                }}
              />
              <p className="text-gray-800 font-bold">
                Name: {result?.project_name}
              </p>
            </div>
            {estimateSections?.primary_estimate?.data?.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white border rounded-lg mb-6 mt-4 shadow-sm"
              >
                {item?.name && (
                  <>
                    <h2 className="font-semibold text-lg text-gray-900 mb-4">
                      <strong>Material:</strong> {item?.name}
                    </h2>
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-4 py-2 text-left">
                            Part
                          </th>
                          {item?.dimension?.some((part) => part?.Length) && (
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Length
                            </th>
                          )}
                          {item?.dimension?.some((part) => part?.Height) && (
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Height
                            </th>
                          )}
                          {item?.dimension?.some((part) => part?.Width) && (
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Width
                            </th>
                          )}
                          {item?.dimension?.some((part) => part?.Area) && (
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Area
                            </th>
                          )}
                          {item?.dimension?.some((part) => part?.Count) && (
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Count
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {item?.dimension?.map((part, partIndex) => (
                          <tr key={partIndex} className="hover:bg-gray-50">
                            {part?.Part && (
                              <td className="border border-gray-300 px-4 py-2">
                                {part?.Part || "-"}
                              </td>
                            )}
                            {part?.Length && (
                              <td className="border border-gray-300 px-4 py-2">
                                {part?.Length || "-"}
                              </td>
                            )}
                            {part?.Height && (
                              <td className="border border-gray-300 px-4 py-2">
                                {part?.Height || "-"}
                              </td>
                            )}
                            {part?.Width && (
                              <td className="border border-gray-300 px-4 py-2">
                                {part?.Width || "-"}
                              </td>
                            )}
                            {part?.Area && (
                              <td className="border border-gray-300 px-4 py-2">
                                {part?.Area || "-"}
                              </td>
                            )}
                            {part?.Count && (
                              <td className="border border-gray-300 px-4 py-2">
                                {part?.Count || "-"}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <table className="min-w-full table-auto border-collapse border border-gray-300 mt-4">
                      <thead className="bg-gray-100">
                        <tr>
                          {item?.cost?.Area && (
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Area
                            </th>
                          )}
                          {item?.cost?.Cost && (
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Cost
                            </th>
                          )}
                          {item?.cost?.Total_Cost && (
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Total Cost
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50">
                          {item?.cost?.Area && (
                            <td className="border border-gray-300 px-4 py-2">
                              {item?.cost?.Area || "-"}
                            </td>
                          )}
                          {item?.cost?.Cost && (
                            <td className="border border-gray-300 px-4 py-2">
                              {item?.cost?.Cost || "-"}
                            </td>
                          )}
                          {item?.cost?.Total_Cost && (
                            <td className="border border-gray-300 px-4 py-2">
                              {item?.cost?.Total_Cost || "-"}
                            </td>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
                {item?.Total_Cost?.Total_Cost !== undefined && (
                  <div>
                    <p className="text-lg">
                      <strong>Total Cost:</strong>{" "}
                      {item?.Total_Cost?.Total_Cost}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {estimateSections?.secondary_estimate?.Calculations && (
              <>
                <div className="p-4 bg-white border rounded-lg mb-6 shadow-sm">
                  <h2 className="font-bold text-lg text-gray-900 mb-4">
                    Sub Structure:{" "}
                    {
                      Object.keys(
                        estimateSections?.secondary_estimate?.Calculations
                      )[0]
                    }
                  </h2>
                  <p className="text-gray-700">
                    <strong>Plan:</strong>{" "}
                    {estimateSections?.secondary_estimate.Plan}
                  </p>
                  <div className="mt-4">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                      <tbody>
                        {Object.keys(
                          estimateSections?.secondary_estimate?.Calculations || {}
                        ).map((key, index) => {
                          const value =
                            estimateSections?.secondary_estimate?.Calculations[
                            key
                            ];
                          return (
                            <tr key={index}>
                              {typeof value === "object" ? (
                                <table className="min-w-full table-auto border-collapse border border-gray-300">
                                  <tbody>
                                    {Object.keys(value)?.map(
                                      (subKey, subIndex) => (
                                        <tr
                                          key={subIndex}
                                          className="hover:bg-gray-50"
                                        >
                                          <td className="border border-gray-300 px-4 py-2 font-semibold text-gray-800">
                                            {subKey}
                                          </td>
                                          <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                            {value[subKey]}
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              ) : (
                                <span className="text-gray-700">{value}</span>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {estimateSections?.total_combined_cost && (
                  <h2 className="p-4 font-bold bg-white rounded-lg border text-gray-800">
                    <strong>Total Combined Cost:</strong>{" "}
                    {estimateSections?.total_combined_cost}
                  </h2>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ResulteData;
