/* eslint-disable no-undef */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import BaseUrl from "../../Auth/BaseUrl";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import Particles from "../../components/ui/particles";

const ResultDrawing = () => {
  const location = useLocation();
  const { result, data } = location?.state || {};
  if (!result) {
    return <div>Loading...</div>;
  }
  const estimateSections = result;
  const model = data;
  // const estimateSectionsanalysis = result.analysis;

  const newItems = estimateSections?.primary_estimate?.data
    ?.map((e) => (e?.dimension?.length ? e?.dimension[0] : null))
    .filter((item) => Boolean(item));
  console.log(newItems, "estimateSectionsdatas");
  const newItem = newItems?.length ? newItems[0] : null;
  console.log(newItem, "estimateSectionsdata");
  return (
    <>
      <div className="flex w-full flex-col h-full min-h-screen items-center justify-center bg-gradient-to-br from-[#00083c] via-[#73cddd] relative overflow-hidden">
        <Particles
          className="absolute inset-0 z-0"
          quantity={150}
          ease={100}
          color={"#ffffff"}
          refresh
        />
        <motion.div
          className="w-full max-w-5xl md:my-20 p-6 rounded-lg shadow-2xl bg-opacity-80 relative flex justify-center flex-col"
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
          <div className="bg-white rounded-lg p-4 border w-full mt-10">
            <h3 className="text-center text-4xl font-bold text-white mb-4">
              Cost Estimate
            </h3>

            <div className="p-3 border shadzow-md rounded bg-white">
              <img
                src={BaseUrl?.CostImage + model?.image}
                alt="not found"
                className="img-fluid rounded mb-2"
                style={{
                  objectFit: "contain",
                  width: "100%",
                  height: "250px",
                }}
              />
              <p className="text-start text-lg font-medium text-black">
                Name: {model?.project_name}</p>
            </div>
            {estimateSections?.primary_estimate?.data?.map((item, index) => {
              const newItem = item?.dimension?.length ? item?.dimension[0] : null;
              console.log(newItem, "newItem--->");
              return (
                <div key={index} className="p-4 bg-white border rounded mb-4 mt-4 shadow-lg">
                  {item?.name && (
                    <>
                      <h2 className="font-semibold mb-4 text-lg">
                        <strong>Material:</strong> {item?.name}
                      </h2>
                      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
                        <thead>
                          <tr className="bg-gray-100">
                            {newItem?.Part && <th className="px-4 py-2 border text-left">Part</th>}
                            {newItem?.Length && <th className="px-4 py-2 border text-left">Length</th>}
                            {newItem?.Height && <th className="px-4 py-2 border text-left">Height</th>}
                            {newItem?.Width && <th className="px-4 py-2 border text-left">Width</th>}
                            {newItem?.Area && <th className="px-4 py-2 border text-left">Area</th>}
                            {newItem?.Count && <th className="px-4 py-2 border text-left">Count</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {item?.dimension?.map((part, partIndex) => (
                            <tr key={partIndex} className="hover:bg-gray-50">
                              {part?.Part && <td className="px-4 py-2 border">{part?.Part || "-"}</td>}
                              {part?.Length && <td className="px-4 py-2 border">{part?.Length || "-"}</td>}
                              {part?.Height && <td className="px-4 py-2 border">{part?.Height || "-"}</td>}
                              {part?.Width && <td className="px-4 py-2 border">{part?.Width || ""}</td>}
                              {part?.Area && <td className="px-4 py-2 border">{part?.Area || "-"}</td>}
                              {part?.Count && <td className="px-4 py-2 border">{part?.Count || "-"}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Cost Details */}
                      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
                        <thead>
                          <tr className="bg-gray-100">
                            {item?.cost?.Area && <th className="px-4 py-2 border text-left">Area</th>}
                            {item?.cost?.Cost && <th className="px-4 py-2 border text-left">Cost</th>}
                            {item?.cost?.Total_Cost && <th className="px-4 py-2 border text-left">Total Cost</th>}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-gray-50">
                            {item?.cost?.Area && <td className="px-4 py-2 border">{item?.cost?.Area || "-"}</td>}
                            {item?.cost?.Cost && <td className="px-4 py-2 border">{item?.cost?.Cost || "-"}</td>}
                            {item?.cost?.Total_Cost && <td className="px-4 py-2 border">{item?.cost?.Total_Cost || "-"}</td>}
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                  {item?.Total_Cost?.Total_Cost !== undefined && (
                    <div className="col-md-12">
                      <p className="text-lg">
                        <strong>Total Cost:</strong> {item?.Total_Cost?.Total_Cost}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {estimateSections?.secondary_estimate?.Calculations && (
              <>
                <div className="p-4 bg-white border rounded mb-4 shadow-lg">
                  {estimateSections?.secondary_estimate?.Calculations && (
                    <>
                      <h2 className="font-bold text-dark mb-4">Sub Structure:</h2>
                      <p>
                        <strong>Plan:</strong> {estimateSections?.secondary_estimate.Plan}
                      </p>
                    </>
                  )}
                  <div>
                    {estimateSections?.secondary_estimate?.Calculations &&
                      Object.keys(estimateSections?.secondary_estimate?.Calculations).length > 0
                      ? Object.keys(estimateSections?.secondary_estimate?.Calculations).map((key, index) => {
                        const value = estimateSections?.secondary_estimate?.Calculations[key];
                        return (
                          <div key={index}>
                            <strong>{key}:</strong>
                            <div>
                              {typeof value === "object" ? (
                                Object.keys(value)?.map((subKey, subIndex) => (
                                  <p key={subIndex}>
                                    <strong>{subKey}:</strong> {value[subKey]}
                                  </p>
                                ))
                              ) : (
                                <span>{value}</span>
                              )}
                            </div>
                          </div>
                        );
                      })
                      : null}
                  </div>
                </div>
                <h2 className="p-4 font-bold bg-white text-lg">
                  <strong className="font-semibold text-dark">Total Combined Cost:</strong> {estimateSections?.total_combined_cost}
                </h2>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ResultDrawing;
