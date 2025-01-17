import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseUrl from "../../Auth/BaseUrl";
import { MdOutlineCancel } from "react-icons/md";

const SubStructureComponent = ({
  setSelectSubStructure,
  setSubStructureCost,
  HideMarkup,
  loading2,
}) => {
  const [subStructure, setSubStructure] = useState([]);
  const [subStructureFilter, setSubStructureFilter] = useState([]);
  const [subStructureCategorySet, setSubStructureCategorySet] = useState([]);
  const [subStructureCategoryName, setSubStructureCategoryName] = useState([]);

  const token = localStorage.getItem("token");

  const fetchSubStructureData = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl.CostImage}/api/substructure/fetch_substructure_data`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubStructure(response?.data || []);
    } catch (error) {
      console.error("Error fetching SubStructures:", error);
    }
  };

  useEffect(() => {
    fetchSubStructureData();
    // eslint-disable-next-line
  }, []);

  const handleSelect = (event) => {
    const selectedSubStructure = event.target.value;
    const filteredSubStructure = subStructure.find(
      (item) => item?.name === selectedSubStructure
    );
    if (filteredSubStructure) {
      setSubStructureFilter(filteredSubStructure?.substructure_sizes || []);
      console.log(filteredSubStructure, "filteredSubStructure--->");
    }
  };

  const handleSelectSubStructureCategorySet = (event) => {
    const selectedCategorySet = event.target.value;
    const filteredCategorySet = subStructureFilter.find(
      (item) => item?.name === selectedCategorySet
    );
    if (filteredCategorySet) {
      setSubStructureCategorySet(
        filteredCategorySet?.substructure_rankings || []
      );
      console.log(filteredCategorySet, "filteredCategorySet--->");
    }
  };

  const handleSelectSubStructureName = (event) => {
    const selectedSubStructureName = event.target.value;
    const filteredCategorySet = subStructureCategorySet.filter(
      (item) => item.id.toString() === selectedSubStructureName
    );
    setSubStructureCategoryName(filteredCategorySet);
  };

  console.log(
    subStructureCategoryName,
    "filteredCategorySet?.ranking_data--->"
  );
  return (
    <>
      <div
        className={`grid gap-4 relative md:grid-cols-${
          subStructureFilter.length > 0 && subStructureCategorySet.length > 0
            ? 3
            : subStructureFilter.length > 0
            ? 2
            : 1
        }`}
      >
        {/* First Select */}
        <div>
          <select
            className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
            onChange={handleSelect}
            defaultValue=""
          >
            <option value="" disabled>
              Select a SubStructure
            </option>
            {subStructure.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="absolute right-0 z-20 top-0">
          <button
            className={`w-8 h-8 bg-red-600 flex justify-center items-center text-white rounded-full py-3`}
            onClick={() => {
              setSelectSubStructure(false);
              setSubStructure([]);
              setSubStructureFilter([]);
              setSubStructureCategorySet([]);
              setSubStructureCategoryName([]);
              setSubStructureCost(0);
            }}
          >
            <MdOutlineCancel />
          </button>
        </div>

        {/* Second Select */}
        {subStructureFilter.length > 0 && (
          <div>
            <select
              className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              onChange={handleSelectSubStructureCategorySet}
              defaultValue=""
            >
              <option value="" disabled>
                Select a Size
              </option>
              {subStructureFilter.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Third Select */}
        {subStructureCategorySet.length > 0 && (
          <div>
            <select
              className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              onChange={handleSelectSubStructureName}
              defaultValue=""
            >
              <option value="" disabled>
                Select a Plan
              </option>
              {subStructureCategorySet.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {subStructureCategoryName.length > 0 &&
        subStructureCategoryName.map((item) => (
          <div key={item.id} className="w-full my-4">
            <table
              className={`w-full border-collapse border ${
                loading2 ? "table-fixed" : ""
              }`}
            >
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-left w-72">Name</th>
                  <th className="border px-4 py-2 text-left w-72">
                    Cost per Sheet
                  </th>
                  <th className="border px-4 py-2 text-left w-72">Quantity</th>
                  <th className="border px-4 py-2 text-left w-72">CNC Time</th>
                  <th className="border px-4 py-2 text-left w-72">
                    Workshop Labour
                  </th>
                  <th className="border px-4 py-2 text-left w-72">
                    Total Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {item?.ranking_data?.map((rankItem) => (
                  <tr
                    key={rankItem.id}
                    className="even:bg-gray-100 odd:bg-white hover:bg-gray-50"
                  >
                    {setSubStructureCost(rankItem?.Total_cost)}
                    <td className="border px-4 py-2">{rankItem?.name || ""}</td>
                    <td className="border px-4 py-2">
                      {rankItem?.Cost_per_sheet || ""}
                    </td>
                    <td className="border px-4 py-2">
                      {rankItem?.Quantity || ""}
                    </td>
                    <td className="border px-4 py-2">
                      {rankItem?.CNC_time || ""}
                    </td>
                    <td className="border px-4 py-2">
                      {rankItem?.Workshop_labour || ""}
                    </td>
                    <td className="border px-4 py-2">
                      {rankItem?.Total_cost || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </>
  );
};

export default SubStructureComponent;
