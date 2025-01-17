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
      <div className="flex w-full flex-col min-h-screen items-center justify-center bg-gradient-to-br from-[#00083c] via-[#73cddd] relative overflow-hidden">
        <Particles
          className="absolute inset-0 z-0"
          quantity={150}
          ease={100}
          color={"#ffffff"}
          refresh
        />
        <motion.div
          className="w-full max-w-5xl p-6 rounded-lg shadow-2xl bg-opacity-80 relative h-96 flex justify-center flex-col"
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
            Cost Estimate
          </h3>

          <div className="p-3 border shadow-md rounded h-100">
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
            <p className="text-center text-lg font-medium text-white">{model?.project_name}</p>
          </div>
          {estimateSections?.primary_estimate?.data?.map((item, index) => {
            const newItem = item?.dimension?.length ? item?.dimension[0] : null;
            console.log(newItem, "newItem--->");
            return (
              <div
                key={index}
                className="p-4 bg-white border rounded mb-4 mt-4"
              >
                {item?.name && (
                  <>
                    <h2 className="fw-semibold mb-4">
                      <strong>Material:</strong> {item?.name}
                    </h2>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          {newItem?.Part && <th>Part</th>}
                          {newItem?.Length && <th>Length</th>}
                          {newItem?.Height && <th>Height</th>}
                          {newItem?.Width && <th>Width</th>}
                          {newItem?.Area && <th>Area</th>}
                          {newItem?.Count && <th>Count</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {item?.dimension?.map((part, partIndex) => (
                          <tr key={partIndex}>
                            {part?.Part && <td>{part?.Part || "-"}</td>}
                            {part?.Length && <td>{part?.Length || "-"}</td>}
                            {part?.Height && <td>{part?.Height || "-"}</td>}
                            {part?.Width && <td>{part?.Width || ""}</td>}
                            {part?.Area && <td>{part?.Area || "-"}</td>}
                            {part?.Count && <td>{part?.Count || "-"}</td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* <h3 className="mt-4">Cost Details</h3> */}
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          {item?.cost?.Area && <th>Area</th>}
                          {item?.cost?.Cost && <th>Cost</th>}
                          {item?.cost?.Total_Cost && <th>Total Cost</th>}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {item?.cost?.Area && (
                            <td>{item?.cost?.Area || "-"}</td>
                          )}
                          {item?.cost?.Cost && (
                            <td>{item?.cost?.Cost || "-"}</td>
                          )}
                          {item?.cost?.Total_Cost && (
                            <td>{item?.cost?.Total_Cost || "-"}</td>
                          )}
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
                {item?.Total_Cost?.Total_Cost !== undefined && (
                  <div className="col-md-12">
                    <p className="text-lg ">
                      <strong>Total Cost:</strong>{" "}
                      {item?.Total_Cost?.Total_Cost}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          {estimateSections?.secondary_estimate?.Calculations && (
            <>
              <div className="p-4 bg-white border rounded mb-4">
                {estimateSections?.secondary_estimate?.Calculations && (
                  <>
                    <h2 className="fw-bold text-dark">Sub Structure:</h2>
                    <p>
                      <strong>Plan:</strong>{" "}
                      {estimateSections?.secondary_estimate.Plan}
                    </p>
                  </>
                )}
                <div>
                  <div>
                    {
                      estimateSections?.secondary_estimate?.Calculations &&
                      Object.keys(
                        estimateSections?.secondary_estimate?.Calculations
                      ).length > 0
                        ? Object.keys(
                            estimateSections?.secondary_estimate?.Calculations
                          ).map((key, index) => {
                            const value =
                              estimateSections?.secondary_estimate
                                ?.Calculations[key];

                            return (
                              <div key={index}>
                                <strong>{key}:</strong>
                                <div>
                                  {/* Check if the value is an object and render nested keys if true */}
                                  {typeof value === "object" ? (
                                    Object.keys(value)?.map(
                                      (subKey, subIndex) => (
                                        <p key={subIndex}>
                                          <strong>{subKey}:</strong>{" "}
                                          {value[subKey]}
                                        </p>
                                      )
                                    )
                                  ) : (
                                    <span>{value}</span> // Render non-object values directly
                                  )}
                                </div>
                              </div>
                            );
                          })
                        : null // Optional: Display message if Calculations is empty or undefined
                    }
                  </div>
                </div>
              </div>
              <h2 className="p-4 fw-bold bg-white ">
                <strong className="fw-semibold text-dark">
                  Total Combined Cost:
                </strong>{" "}
                {estimateSections?.total_combined_cost}
              </h2>
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default ResultDrawing;
