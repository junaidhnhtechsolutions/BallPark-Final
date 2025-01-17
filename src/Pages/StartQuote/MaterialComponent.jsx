/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseUrl from "../../Auth/BaseUrl";
import BlobImage from "./BlobImage";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";

const MaterialComponent = ({
  HideMarkup,
  inputFields,
  CostCombined,
  formData,
  hideMarkup2,
  loading2,
}) => {
  const [material, setMaterial] = useState([]);
  const [materialFilter, setMaterialFilter] = useState([]);
  const [materialCategorySet, setMaterialCategorySet] = useState([]);
  const [materialCategoryName, setMaterialCategoryName] = useState([]);
  const [selectedOption, setselectedOptions] = useState([]);
  const [selectedOptionmaterial, setselectedOptionsmaterial] = useState([]);
  const [selectedOptionmaterialca, setselectedOptionmaterialca] = useState([]);
  const [selectedOptionmaterialsub, setselectedOptionmaterialsub] = useState(
    []
  );
  console.log(selectedOption, "selectedOption");
  console.log(selectedOptionmaterial, "selectedOptionmaterial");
  console.log(selectedOptionmaterialca, "selectedOptionmaterialca");
  console.log(selectedOptionmaterialsub, "selectedOptionmaterialsub");
  const [materialCategoryNameNew, setMaterialCategoryNameNew] = useState([]);
  const [components, setComponents] = useState([{}]);
  const [quantities, setQuantities] = useState([1]);
  const [totalQuantity, settotalQuantity] = useState("");
  const [Markup, setMarkup] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const token = localStorage.getItem("token");

  const fetch_material_data = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl.CostImage}/api/material/fetch_material_data`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMaterial(response?.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetch_material_data();
    // eslint-disable-next-line
  }, []);
  const handleSelect = (event, componentIndex) => {
    const selectedMaterial = event.target.value;

    setselectedOptions((prevValues) => {
      const existingIndex = prevValues.findIndex(
        (item) => item.id === componentIndex
      );

      if (existingIndex !== -1) {
        const updatedValues = [...prevValues];
        updatedValues[existingIndex] = {
          id: componentIndex,
          name: selectedMaterial,
        };
        return updatedValues;
      } else {
        return [...prevValues, { id: componentIndex, name: selectedMaterial }];
      }
    });

    const filteredMaterial = material.find(
      (item) => item?.material === selectedMaterial
    );
    console.error("one-->:", filteredMaterial);
    if (filteredMaterial) {
      const materialCategorySet = filteredMaterial?.materialcategory_set;
      setMaterialFilter((prev) => {
        const newFilter = [...prev];
        newFilter[componentIndex] = materialCategorySet;
        return newFilter;
      });
    }
  };

  const handleSelectMaterialCategorySet = (event, componentIndex) => {
    const materialCategorySet = event.target.value;
    const filteredCategorySet = materialFilter[componentIndex].find(
      (item) => item?.category_name === materialCategorySet
    );

    setselectedOptionsmaterial((prevValues) => {
      const existingIndex = prevValues.findIndex(
        (item) => item.id === componentIndex
      );

      if (existingIndex !== -1) {
        const updatedValues = [...prevValues];
        updatedValues[existingIndex] = {
          id: componentIndex,
          name: materialCategorySet,
        };
        return updatedValues;
      } else {
        return [
          ...prevValues,
          { id: componentIndex, name: materialCategorySet },
        ];
      }
    });

    if (filteredCategorySet) {
      const materialCategorySet = filteredCategorySet.materialsubcategory_set;
      setMaterialCategorySet((prev) => {
        const newSet = [...prev];
        newSet[componentIndex] = materialCategorySet;
        return newSet;
      });
    }
  };

  const handleSelectMaterialCategorySetNew = (event, componentIndex) => {
    const selectedMaterialId = event.target.value;
    const filteredCategorySet = materialCategorySet[componentIndex].filter(
      (item) => item.id === selectedMaterialId
    );

    setselectedOptionmaterialca((prevValues) => {
      const existingIndex = prevValues.findIndex(
        (item) => item.id === componentIndex
      );

      if (existingIndex !== -1) {
        const updatedValues = [...prevValues];
        updatedValues[existingIndex] = {
          id: componentIndex,
          name: selectedMaterialId,
        };
        return updatedValues;
      } else {
        return [
          ...prevValues,
          { id: componentIndex, name: selectedMaterialId },
        ];
      }
    });

    console.error(
      "three-->:",
      filteredCategorySet?.map((e) => e?.materialcosting_set)
    );
    setMaterialCategoryNameNew((prev) => {
      const newCategoryName = [...prev];
      newCategoryName[componentIndex] = filteredCategorySet?.map(
        (e) => e?.materialcosting_set
      );
      return newCategoryName;
    });
  };

  const handleSelectMaterialName = (event, componentIndex) => {
    const selectedMaterialId = event.target.value;
    const filteredMaterial = materialCategoryNameNew[componentIndex]
      ?.flat()
      ?.find((item) => item.id === selectedMaterialId);

    setselectedOptionmaterialsub((prevValues) => {
      const existingIndex = prevValues.findIndex(
        (item) => item.id === componentIndex
      );

      if (existingIndex !== -1) {
        const updatedValues = [...prevValues];
        updatedValues[existingIndex] = {
          id: componentIndex,
          name: selectedMaterialId,
        };
        return updatedValues;
      } else {
        return [
          ...prevValues,
          { id: componentIndex, name: selectedMaterialId },
        ];
      }
    });

    console.log("Selected Material Data:", filteredMaterial);
    setMaterialCategoryName((prev) => {
      const newCategoryName = [...prev];
      newCategoryName[componentIndex] = [filteredMaterial];
      return newCategoryName;
    });
  };

  console.log("materialCategoryName-->:", materialCategoryName);
  const handleAddComponent = () => {
    setComponents([...components, {}]);
    setQuantities([...quantities, 1]);
    setMarkup([...Markup, 0]);
  };

  const handleCancelComponent = (index) => {
    if (components.length > 1) {
      // Remove the component and associated data for the given index
      const updatedComponents = components.filter((_, i) => i !== index);
      setComponents(updatedComponents);

      setMaterialFilter((prev) => prev.filter((_, i) => i !== index));
      setMaterialCategorySet((prev) => prev.filter((_, i) => i !== index));
      setMaterialCategoryName((prev) => prev.filter((_, i) => i !== index));
      setMaterialCategoryNameNew((prev) => prev.filter((_, i) => i !== index));
      setselectedOptions((prev) => prev.filter((item) => item.id !== index));
      setselectedOptionsmaterial((prev) =>
        prev.filter((item) => item.id !== index)
      );
      setselectedOptionmaterialca((prev) =>
        prev.filter((item) => item.id !== index)
      );
      setselectedOptionmaterialsub((prev) =>
        prev.filter((item) => item.id !== index)
      );

      // Reset quantities and markup values for the given index
      setQuantities((prev) => prev.filter((_, i) => i !== index));
      setMarkup((prev) => prev.filter((_, i) => i !== index));
    } else {
      // If only one component remains, reset all states
      setComponents([]);
      setMaterialFilter([]);
      setMaterialCategorySet([]);
      setMaterialCategoryName([]);
      setMaterialCategoryNameNew([]);
      setQuantities([]);
      setMarkup([]);
    }
  };

  const handleQuantityChange = (e, index) => {
    let newQuantities = [...quantities];
    let value = e.target.value;
    if (value === "" || isNaN(value)) {
      newQuantities[index] = value;
      console.log(newQuantities[index], value, "newQuantities--->");
    } else if (parseInt(value) >= 1) {
      newQuantities[index] = Math.min(parseInt(value), 100);
    }
    console.log(newQuantities, value, "newQuantities--->");
    setQuantities(newQuantities);
  };

  const handleMarkupChange = (e, index) => {
    const newMarkup = [...Markup];
    let value = e.target.value;

    // Allow temporarily empty input (clearing 0)
    if (value === "" || isNaN(value)) {
      newMarkup[index] = ""; // Allow empty input temporarily
    } else {
      // Ensure value is between 0 and 100
      newMarkup[index] = Math.max(0, Math.min(parseInt(value), 100));
    }

    setMarkup(newMarkup);
  };

  const handleBlur = (index) => {
    const newMarkup = [...Markup];

    // Reset to 0 if value is empty or invalid (NaN)
    if (newMarkup[index] === "" || isNaN(newMarkup[index])) {
      newMarkup[index] = 0;
    }

    setMarkup(newMarkup);
  };

  const calculateMarkup = (cost, index) => {
    const percentMarkup = Markup[index] || 0; // Default to 1 if markup is not set
    return (cost || 0) * (percentMarkup / 100); // Calculate markup as a percentage
  };

  const calculateTotalCost = (cost, index) => {
    const quantity = quantities[index] || 0;
    const totalCost = (cost || 0) * quantity;
    const markupAmount = calculateMarkup(cost, index);
    console.log(
      totalCost,
      markupAmount,
      totalCost + markupAmount,
      "markupAmount--->"
    );
    return totalCost + markupAmount;
  };
  const getTotalCost = () => {
    let total = 0;
    // Loop through materialCategoryName and calculate total for each category
    materialCategoryName?.forEach((category, categoryIndex) => {
      category?.forEach((items) => {
        total += calculateTotalCost(items?.cost, categoryIndex); // Use categoryIndex instead of index
      });
    });
    console.log(total, "total--->");
    return total;
  };
  useEffect(() => {
    const updatedTotalCost = getTotalCost();
    localStorage.setItem("combinedTotal", updatedTotalCost);
    setTotalCost(updatedTotalCost);
    console.log(updatedTotalCost, "updatedTotalCost-->");
    if (quantities?.length > 0) {
      const Quantity = quantities.reduce((acc, curr) => acc + curr, 0);
      settotalQuantity(Quantity);
      console.log(Quantity, quantities, "Quantity-->");
    } else {
      settotalQuantity(0);
    }
    // eslint-disable-next-line
  }, [
    quantities,
    Markup,
    materialCategoryName,
    totalCost,
    components,
    material,
    materialFilter,
    materialCategorySet,
  ]);
  console.log(selectedOptionmaterial);
  return (
    <>
      {components.map((_, index) => {
        // Calculate the column size dynamically
        const getColumnSize = (totalSelects) => {
          switch (totalSelects) {
            case 1:
              return "col-md-12";
            case 2:
              return "col-md-6";
            case 3:
              return "col-md-4";
            case 4:
              return "col-md-3";
            default:
              return "col-md-12";
          }
        };

        const totalSelects =
          1 +
          (materialFilter[index]?.length > 0 ? 1 : 0) +
          (materialCategorySet[index]?.length > 0 ? 1 : 0) +
          (materialCategoryNameNew[index]?.length > 0 ? 1 : 0);
        const gridClass = `md:grid-cols-${totalSelects === 1 ? 1 : totalSelects === 2 ? 2 : totalSelects === 3 ? 3 : totalSelects === 4 ? 4 : ''}`;

        console.log({ totalSelects, gridClass }, "totalSelects");

        return (
          <>
            <div
              key={index}
              className={`grid relative ${gridClass}  gap-4 mb-4`}
              id="material-none-pdf"
            >
              <div className={`${getColumnSize(totalSelects)}`}>
                <select
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  value={
                    selectedOption.find((item) => item.id === index)?.name ||
                    "Select a material"
                  }
                  onChange={(event) => handleSelect(event, index)}
                >
                  <option defaultValue={"Select a material"} selected>
                    Select a material
                  </option>
                  {material.map((Items, i) => (
                    <option key={i} value={Items.material}>
                      {Items.material}
                    </option>
                  ))}
                </select>
                {index > 0 && (
                  <div className="absolute right-0 z-20 top-0">
                    <button
                      className={`w-8 h-8 bg-red-600 flex justify-center items-center text-white rounded-full py-3`}
                      onClick={() => handleCancelComponent(index)}
                    >
                      <MdOutlineCancel />
                    </button>
                  </div>
                )}
              </div>

              {materialFilter[index]?.length > 0 && (
                <div className={getColumnSize(totalSelects)}>
                  <select
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    onChange={(event) =>
                      handleSelectMaterialCategorySet(event, index)
                    }
                    value={
                      selectedOptionmaterial.find((item) => item.id === index)
                        ?.name || "Select a material Category"
                    }
                  >
                    <option
                      defaultValue={"Select a material  Category"}
                      selected
                    >
                      Select a material Category
                    </option>
                    {materialFilter[index]?.map((FilterItems, i) => (
                      <option key={i} value={FilterItems.category_name}>
                        {FilterItems.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {materialCategorySet[index]?.length > 0 && (
                <div className={getColumnSize(totalSelects)}>
                  <select
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    onChange={(event) =>
                      handleSelectMaterialCategorySetNew(event, index)
                    }
                    value={
                      selectedOptionmaterialca?.find(
                        (item) => item.id === index
                      )?.name || "Select a material Subcategory name"
                    }
                  >
                    <option
                      defaultValue={"Select a material Subcategory name"}
                      selected
                    >
                      Select a material Subcategory name
                    </option>
                    {materialCategorySet[index]?.map((FilterItems, i) => (
                      <option key={i} value={FilterItems.id}>
                        {FilterItems.subcategory_name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {materialCategoryNameNew[index]?.length > 0 && (
                <div className={getColumnSize(totalSelects)}>
                  <select
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    onChange={(event) => handleSelectMaterialName(event, index)}
                    value={
                      selectedOptionmaterialsub.find(
                        (item) => item.id === index
                      )?.name || " Select a material name"
                    }
                  >
                    <option defaultValue={"Select a material name"} selected>
                      Select a material name
                    </option>
                    {materialCategoryNameNew[index]?.map((FilterItems) =>
                      FilterItems?.map((newItems, i) => (
                        <option key={i} value={newItems.id}>
                          {newItems?.material_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              )}
            </div>


            {/* Additional details */}

            {materialCategoryName[index]?.length > 0 &&
              materialCategoryName[index].map((items) => (
                <div
                  key={items?.id}
                  className="bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      {index === 0 && (
                        <tr className="bg-gray-100 border-b">
                          <th className="p-3 text-left font-semibold text-gray-700">
                            Product Image
                          </th>
                          <th className="p-3 text-left font-semibold text-gray-700">
                            Material Name
                          </th>
                          <th className="p-3 text-left font-semibold text-gray-700">
                            Size
                          </th>
                          <th className="p-3 text-left font-semibold text-gray-700">
                            Cost
                          </th>
                          <th className="p-3 text-left font-semibold text-gray-700">
                            Quantity
                          </th>
                          {hideMarkup2 && (
                            <th className="p-3 text-left font-semibold text-gray-700">
                              Markup
                            </th>
                          )}
                          <th className="p-3 text-left font-semibold text-gray-700">
                            Total Cost
                          </th>
                          {HideMarkup && (
                            <th className="p-3 text-left font-semibold text-gray-700">
                              Action
                            </th>
                          )}
                        </tr>
                      )}
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          {items?.image_url ? (
                            <BlobImage
                              imageUrl={items?.image_url}
                              alt={items?.material_name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="p-3">{items?.material_name || ""}</td>
                        <td className="p-3">{items?.size || "N/A"}</td>
                        <td className="p-3">{items?.cost || ""}</td>
                        <td className="p-3">
                          <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{
                              border: !HideMarkup
                                ? "none"
                                : "1px solid #ced4da",
                            }}
                            placeholder="Quantity"
                            value={quantities[index] || 1}
                            onChange={(e) => handleQuantityChange(e, index)}
                          />
                        </td>
                        {hideMarkup2 && (
                          <td className="p-3">
                            <input
                              type="number"
                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              style={{
                                border: !HideMarkup
                                  ? "none"
                                  : "1px solid #ced4da",
                              }}
                              value={Markup[index] || 0}
                              placeholder="Enter Markup"
                              onChange={(e) => handleMarkupChange(e, index)}
                            />
                          </td>
                        )}
                        <td className="p-3">
                          {calculateTotalCost(items?.cost, index).toFixed(2)}
                        </td>
                        {HideMarkup && (
                          <td className="p-3">
                            {items?.product_url ? (
                              <a
                                className="bg-gradient-to-br block w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold justify-center items-center text-nowrap px-3"
                                href={items?.product_url}
                                target="_blank"
                              >
                                <i className="fa-regular fa-image"></i> View
                                Product
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
          </>
        );
      })}

      {materialCategoryName?.length > 0 && (
        <>
          {formData?.projectName &&
            formData?.date &&
            formData?.companyName &&
            formData?.email &&
            formData?.billToName &&
            formData?.billToAddress &&
            formData?.shipToName &&
            formData?.shipToAddress && (
              <div className="flex justify-end items-end flex-col p-4">
                <div className="flex w-[50%] justify-between items-center">
                  <div>
                    <h5>SubTotal</h5>
                  </div>
                  <div>
                    <h5>£{totalCost?.toFixed(2)}</h5>
                  </div>
                </div>
                {inputFields?.map((input, index) => (
                  <div
                    className="flex w-[50%] justify-between items-center"
                    key={index}
                  >
                    <div>
                      <h5>{input.freestyle}</h5>
                    </div>
                    <div>
                      <h5>£{input.freestylecost}</h5>
                    </div>
                  </div>
                ))}
                <div className="flex w-[50%] justify-between items-center">
                  <div>
                    <h5>Total</h5>
                  </div>
                  <div>
                    <h5>£{CostCombined}</h5>
                  </div>
                </div>
              </div>
            )}
          <div className="flex justify-end items-end">
            <button
              className={`w-20 bg-red-600 my-4 flex justify-center items-center text-white rounded-xl py-3`}
              onClick={handleAddComponent}
            >
              <FaPlus />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default MaterialComponent;
