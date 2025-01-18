import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { MdCancel, MdDelete, MdOutlineCancel } from "react-icons/md";
import BaseUrl from "../../Auth/BaseUrl";
import { motion, AnimatePresence } from "framer-motion";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import MaterialComponent from "./MaterialComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Particles from "../../components/ui/particles";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import SubStructure from "./SubStructure";
import { FaFilePdf, FaPlus } from "react-icons/fa6";

const StartQuote = () => {
  const [key, setKey] = useState("Past Project");
  const [TableHaderIndex, setTableHaderIndex] = useState([]);
  const [slectedValues, setslectedValues] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editedData, setEditedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [PdfTotalCostShow, setPdfTotalCostShow] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [SelectSubStructure, setSelectSubStructure] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: "",
    number: "",
    freestyle: "",
    freestylecost: "",
  });
  const [loading2, setLoading2] = useState(false);
  const [hideMarkup, setHideMarkup] = useState(true);
  const [hideMarkup2, setHideMarkup2] = useState(true);
  const token = localStorage.getItem("token");
  const OfftheshelfCost = localStorage.getItem("combinedTotal");
  const navigate = useNavigate();
  const [inputFields, setInputFields] = useState([]);
  const [selectedValues, setSelectedValues] = useState("");
  const [SubStructureCost, setSubStructureCost] = useState(0);
  // const [Costdymic, setCostdymic] = useState(0);
  const [formData, setFormData] = useState({
    projectName: "",
    date: "",
    companyName: "",
    email: "",
    billToName: "",
    billToAddress: "",
    shipToName: "",
    shipToAddress: "",
  });

  console.log(formData.billToAddress, "formData--->");

  // clone input work hare
  const handleAddFields = () => {
    setInputFields([...inputFields, { freestyle: "", freestylecost: 0 }]); // Default freestylecost as 0
  };

  const handleRemoveFields = (index) => {
    const fields = [...inputFields];
    fields.splice(index, 1);
    setInputFields(fields);
  };
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const fields = [...inputFields];
    // Convert to number for freestylecost, and allow it to be empty
    fields[index][name] =
      name === "freestylecost" && value === ""
        ? ""
        : name === "freestylecost"
          ? +value
          : value;
    setInputFields(fields);
  };

  // eslint-disable-next-line no-unused-vars
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // pdf modal hare
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setFormData({
      projectName: "",
      date: "",
      companyName: "",
      email: "",
      billToName: "",
      billToAddress: "",
      shipToName: "",
      shipToAddress: "",
    });
    setShow(false); // Close the modal
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Fetch project data
  // eslint-disable-next-line
  const getProjects = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl.baseurlImage}GetCostEstimate/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSearchResults(response?.data?.message || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line
    getProjects();
    // eslint-disable-next-line
  }, []);

  // Handle project selection change
  const handleSelectChange = (event) => {
    const projectName = event.target.value;
    const project = searchResults.find(
      (proj) => proj.project_name === projectName
    );
    setSelectSubStructure(false);
    if (project) {
      const data = JSON.parse(project?.estimate || "{}");
      setEditedData(data); // Set the estimate data
      setSelectedProject(project); // Set the selected project object
    } else {
      // If no project is found, reset the selection
      setSelectedProject(null);
    }
  };
  const handleEdit = (itemIndex, partIndex, field, value) => {
    // Create a new object for immutability
    const updatedData = {
      ...editedData,
      primary_estimate: {
        ...editedData.primary_estimate,
        data: editedData.primary_estimate.data.map((item, idx) =>
          idx === itemIndex
            ? {
              ...item,
              dimension: item.dimension.map((part, pIdx) =>
                pIdx === partIndex
                  ? { ...part, [field]: parseFloat(value) }
                  : part
              ),
            }
            : item
        ),
      },
    };

    setEditedData(updatedData); // Update the state with the new object
    console.log(updatedData, "updatedData----->");
  };

  // Save the edited data
  const handleSave = async (event) => {
    event.preventDefault();
    setLoading1(true);
    try {
      const formData = new FormData();
      formData.append("id", selectedProject?.id);
      formData.append("updated_data", JSON.stringify(editedData));
      await axios.put(`${BaseUrl.baseurlImage}Update_CostEstimate/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getProjects();
      setLoading1(false);
      setEditMode(false);
    } catch (error) {
      setLoading1(false);
      setEditMode(false);
      console.error("Error saving edits:", error);
      Swal.fire({
        title: error.response?.data?.detail || "Failed to save",
        icon: "error",
      });
    }
  };

  // Handle project deletion
  const handleDelete = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", selectedProject?.id);
      await axios.delete(`${BaseUrl.baseurlImage}DeleteCostEstimate/`, {
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        console.log(response, 'response');
        Swal.fire({
          title: response?.data?.message,
          icon: "success",
        });
        setSelectedProject(null);
        setSelectSubStructure(false);
      })
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error deleting:", error);
      Swal.fire({
        title: error.response?.data?.message || "Failed to delete",
        icon: "error",
      });
    }
  };
  const emptyFields = inputFields.some(
    (field) => !field?.freestyle?.trim() || field?.freestylecost === 0
  );
  const handleGeneratePDF = async () => {
    const { freestyle } = inputValues;
    // Check if any freestyle or freestylecost field is empty
    if (selectedValues === "Internal use") {
      if (
        !formData?.projectName?.trim() ||
        !formData?.date?.trim() ||
        !formData?.companyName?.trim() ||
        !formData?.email?.trim() ||
        !formData?.billToName?.trim() ||
        !formData?.billToAddress?.trim() ||
        !formData?.shipToName?.trim() ||
        !formData?.shipToAddress?.trim() ||
        emptyFields // Make sure this is false if all fields are filled
      ) {
        setLoading2(false);
        Swal.fire({
          title: "Error",
          text: "Please fill all input fields before proceeding.",
          icon: "error",
        });
        return;
      }
    } else if (
      !formData?.projectName?.trim() ||
      !formData?.date?.trim() ||
      !formData?.companyName?.trim() ||
      !formData?.email?.trim() ||
      !formData?.billToName?.trim() ||
      !formData?.billToAddress?.trim() ||
      !formData?.shipToName?.trim() ||
      !formData?.shipToAddress?.trim() ||
      emptyFields
    ) {
      setLoading2(false);
      Swal.fire({
        title: "Error",
        text: "Please fill all input fields before proceeding.",
        icon: "error",
      });
      return;
    }
    setHideMarkup(false);

    setLoading2(true);
    let freestyleElement;

    try {
      if (key === "Off the Shelf") {
        setPdfTotalCostShow(true);
        setHideMarkup(false);
        const element = document.getElementById("Off-the-Shelf");
        if (!element) {
          console.error("PDF element not found");
          setLoading2(false);
          return;
        }

        // Hide freestyle field if empty
        if (!freestyle?.trim()) {
          freestyleElement = element.querySelector("#Free-Style-Container");
          if (freestyleElement) {
            freestyleElement.style.display = "none";
          }
        }
        // Handle freestyle field based on selected values
        freestyleElement = element.querySelector("#Free-Style-Container");
        if (selectedValues === "External use") {
          setHideMarkup(false);
          setHideMarkup2(false);
          if (freestyleElement) freestyleElement.style.display = "none";
        }
        // Hide buttons before generating PDF
        const buttons = element.querySelectorAll("button");
        const select = element.querySelectorAll("select");
        buttons.forEach((button) => (button.style.display = "none"));
        select.forEach((select) => (select.style.display = "none"));

        const options = {
          margin: 5, // Reduced margin to fit more content
          filename: "Off-the-Shelf",
          image: { type: "png", quality: 1 },
          html2canvas: {
            letterRendering: true,
            allowTaint: true,
            useCORS: true,
            logging: false,
            scale: 2.5, // Increased scale to fit content on a single page
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // Changed to A2 format for more space
        };
        // eslint-disable-next-line
        await html2pdf().from(element)?.set(options)?.save();
      } else if (key === "Past Project") {
        setPdfTotalCostShow(true);
        const element = document.getElementById("my-Pdf");
        if (!element) {
          console.error("PDF element not found");
          setLoading2(false);
          return;
        }
        // Handle freestyle field based on selected values
        // freestyleElement = element.querySelector("#Free-Style-Container");
        if (selectedValues === "External use") {
          if (freestyleElement) freestyleElement.style.display = "none";
        }

        const buttons = element.querySelectorAll("button");
        const select = element.querySelectorAll("select");
        buttons.forEach((button) => (button.style.display = "none"));
        select.forEach((select) => (select.style.display = "none"));

        const options = {
          margin: 5, // Reduced margin to fit more content
          filename: "my-Pdf",
          image: { type: "jpeg", quality: 1 },
          html2canvas: {
            letterRendering: true,
            allowTaint: true,
            useCORS: true,
            logging: false,
            scale: 2.5, // Increased scale to fit content on a single page
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // Changed to A2 format for more space
        };
        // eslint-disable-next-line
        await html2pdf()?.from(element)?.set(options)?.save();
      }
    } catch (error) {
      setShow(false);
      setPdfTotalCostShow(false);
      setLoading2(false);
      console.error("Error generating PDF:", error);
    } finally {
      // Show buttons again after PDF is generated
      setHideMarkup(true);
      const buttons = document.querySelectorAll("button");
      const select = document.querySelectorAll("select");
      select.forEach((select) => (select.style.display = "flex"));
      buttons.forEach((button) => (button.style.display = "flex"));

      setFormData({
        projectName: "",
        date: "",
        companyName: "",
        email: "",
        billToName: "",
        billToAddress: "",
        shipToName: "",
        shipToAddress: "",
      });
      setLoading2(false);
      setPdfTotalCostShow(false);
      setHideMarkup2(true);
      setShow(false);
    }
  };

  let TotalCost;
  try {
    // Check if `selectedProject?.estimate` is a valid JSON string
    TotalCost = selectedProject?.estimate
      ? JSON.parse(selectedProject?.estimate)
      : null;
    console.log(TotalCost, ";TotalCost");
  } catch (error) {
    console.error("Error parsing JSON:", error);
    TotalCost = null;
  }

  // eslint-disable-next-line no-unused-vars
  const Totalcost =
    TotalCost?.primary_estimate?.data?.map((e) => e?.Total_Cost?.Total_Cost) ||
    [];

  // oftheshel work
  const ShowTotalcost =
    TotalCost?.primary_estimate?.data?.map((e) =>
      parseFloat(e?.Total_Cost?.Total_Cost)
    ) || [];

  // Filter out any NaN values from ShowTotalcost
  // eslint-disable-next-line no-unused-vars
  const validCosts = ShowTotalcost.filter((cost) => !isNaN(cost));

  // Calculate the total freestylecost from inputFields
  const freestylecost = inputFields.reduce((sum, field) => {
    const cost = parseFloat(field.freestylecost);
    return sum + (isNaN(cost) ? 0 : cost); // Add 0 if NaN
  }, 0);
  console.log(
    freestylecost,
    SubStructureCost,
    editedData?.total_combined_cost ?? 0,
    "inputFields ==>"
  );
  // Add the total freestylecost to the sum of valid TotalCosts
  const combinedTotal =
    // validCosts?.reduce((sum, cost) => sum + cost, 0) +
    freestylecost + SubStructureCost + (editedData?.total_combined_cost ?? 0);
  console.log(combinedTotal, "inputFields ==>");

  // Perform the addition
  const OfftheshelfCostCombined = parseFloat(OfftheshelfCost) + freestylecost;
  const total_combined_cost =
    parseFloat(editedData?.total_combined_cost) + parseFloat(combinedTotal);
  console.log(combinedTotal, editedData?.total_combined_cost, "editedData--->");

  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <div className="flex w-full flex-col min-h-screen items-center justify-start bg-gradient-to-br from-[#00083c] via-[#73cddd] relative overflow-auto overflow-x-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={100}
        color={"#ffffff"}
        refresh
      />
      <motion.div
        className="w-full max-w-5xl md:p-6 p-4 rounded-lg shadow-2xl bg-opacity-80 relative flex justify-center items-center flex-col my-20"
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
        <h3 className="text-center md:text-4xl text-3xl font-bold text-white md:mt-5 mt-10">
          Choose a Project
        </h3>

        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => {
            setKey(k);
            setslectedValues(null);
            setSelectedProject(null);
            setInputValues({});
            setInputFields([]);
            setEditMode(false);
          }}
          className="flex flex-col md:flex-row md:w-10/12 w-full justify-between space-x-4 border rounded-2xl mt-5 bg-white"
        >
          <Tab
            eventKey="Past Project"
            title="Past Project"
            tabClassName={`w-full register text-lg font-medium w-full p-3 rounded-2xl flex justify-center text-center ${key === "Past Project"
              ? "bg-gradient-to-br text-white from-[#00083c] via-[#00083c]"
              : "text-black"
              }`}
          >
            {key === "Past Project" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full"
                >
                  <select
                    className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    onChange={handleSelectChange}
                    value={selectedProject?.project_name || ""}
                  >
                    <option selected value="">
                      Select a Project
                    </option>
                    {searchResults?.map((project, index) => (
                      <option key={index} value={project.project_name}>
                        {project.project_name}
                      </option>
                    ))}
                  </select>
                </motion.div>

                <div id="my-Pdf">
                  {selectedProject && (
                    <>
                      {!formData?.projectName &&
                        !formData?.date &&
                        !formData?.companyName &&
                        !formData?.email &&
                        !formData?.billToName &&
                        !formData?.billToAddress &&
                        !formData?.shipToName &&
                        !formData?.shipToAddress && (
                          <>
                            <h4 className="mb-3 text-white text-xl font-medium">
                              Project Name:{" "}
                              <span className="text-white text-xl font-medium">
                                {selectedProject?.project_name}
                              </span>
                            </h4>
                            <div>
                              <img
                                src={selectedProject?.image_url}
                                alt="Project"
                                className="img-fluid w-full"
                                style={{ maxHeight: "300px" }}
                              />
                            </div>
                          </>
                        )}
                      <button
                        className={`w-full bg-red-600 mt-4 flex justify-center items-center text-white rounded-xl py-3 ${loading ? "disabled" : ""
                          }`}
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <MdDelete /> Delete Project
                          </>
                        )}
                      </button>
                      <div className="flex justify-end items-end">
                        <button
                          className={`w-20 bg-red-600 my-4 flex justify-center items-center text-white rounded-xl py-3`}
                          onClick={() => setEditMode((prev) => !prev)}
                        >
                          {editMode ? (
                            <>
                              <MdCancel />
                            </>
                          ) : (
                            <>
                              <FaEdit />
                            </>
                          )}
                        </button>
                      </div>
                      {formData?.projectName &&
                        formData?.date &&
                        formData?.companyName &&
                        formData?.email &&
                        formData?.billToName &&
                        formData?.billToAddress &&
                        formData?.shipToName &&
                        formData?.shipToAddress && (
                          <div className="grid md:grid-cols-2 mb-5">
                            <div className="flex items-center">
                              <img
                                src="./logo.PNG"
                                alt=""
                                width={150}
                                height={150}
                              />
                              &nbsp;
                              <span className="text-2xl font-bold">
                                In the Ballpark
                              </span>
                            </div>
                            <div className="">
                              <strong>&nbsp;Project Name:</strong>&nbsp;
                              {formData?.projectName}
                              <br />
                              <strong>&nbsp;Date:</strong>&nbsp;{formData?.date}
                              <br />
                              <strong>&nbsp;Company Name:</strong>&nbsp;
                              {formData?.companyName}
                              <br />
                              <strong>&nbsp;Email Address:</strong>&nbsp;
                              {formData?.email}
                            </div>
                            <div className="">
                              <h3 className="text-2xl font-normal">BILL TO</h3>
                              <strong>&nbsp;{formData?.billToName}</strong>
                              <p className="text-dark">
                                &nbsp;{formData?.billToAddress}.
                              </p>
                            </div>
                            <div className="">
                              <h3 className="text-2xl font-normal">SHIP TO</h3>
                              <strong>&nbsp;{formData?.shipToName}</strong>
                              <p className="text-dark">
                                &nbsp;{formData?.shipToAddress}
                              </p>
                            </div>
                          </div>
                        )}

                      {editedData?.primary_estimate?.data?.map((item, itemIndex) =>
                        item?.name && (
                          <div
                            key={itemIndex}
                            className="p-4 bg-white border rounded-lg mb-4 w-full sm:w-auto"
                          >
                            <h5 className="text-gray-700 font-bold mb-3 text-base sm:text-lg">
                              <strong>Material:</strong> {item?.name}
                            </h5>

                            {/* Table for Dimensions */}
                            <div className="overflow-x-auto">
                              <table className="table-auto border-collapse border border-gray-300 w-full mb-4">
                                <thead>
                                  <tr className="bg-gray-100">
                                    <th className="border border-gray-300 px-4 py-2 text-left">Part</th>
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
                                    {item?.dimension?.some((part) => part?.Length) && (
                                      <th className="border border-gray-300 px-4 py-2 text-left">
                                        Length
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
                                    {item?.dimension?.some((part) => part?.Volume) && (
                                      <th className="border border-gray-300 px-4 py-2 text-left">
                                        Volume
                                      </th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody>
                                  {item?.dimension?.map((part, partIndex) => (
                                    <tr key={partIndex}>
                                      <td className="border border-gray-300 px-4 py-2">
                                        {part?.Part || "-"}
                                      </td>
                                      {part?.Height && (
                                        <td className="border border-gray-300 px-4 py-2">
                                          {editMode ? (
                                            <input
                                              type="number"
                                              className="form-control border border-gray-300 px-2 py-1 w-full sm:w-auto outline-none"
                                              value={part?.Height || ""}
                                              onChange={(e) =>
                                                handleEdit(itemIndex, partIndex, "Height", e.target.value)
                                              }
                                            />
                                          ) : (
                                            part?.Height
                                          )}
                                        </td>
                                      )}
                                      {part?.Width && (
                                        <td className="border border-gray-300 px-4 py-2">
                                          {editMode ? (
                                            <input
                                              type="number"
                                              className="form-control border border-gray-300 px-2 py-1 w-full sm:w-auto outline-none"
                                              value={part?.Width || ""}
                                              onChange={(e) =>
                                                handleEdit(itemIndex, partIndex, "Width", e.target.value)
                                              }
                                            />
                                          ) : (
                                            part?.Width
                                          )}
                                        </td>
                                      )}
                                      {part?.Length && (
                                        <td className="border border-gray-300 px-4 py-2">{part?.Length}</td>
                                      )}
                                      {part?.Area && (
                                        <td className="border border-gray-300 px-4 py-2">{part?.Area}</td>
                                      )}
                                      {part?.Count && (
                                        <td className="border border-gray-300 px-4 py-2">{part?.Count}</td>
                                      )}
                                      {part?.Volume && (
                                        <td className="border border-gray-300 px-4 py-2">{part?.Volume}</td>
                                      )}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>

                            {/* Table for Cost */}
                            {item?.cost && (
                              <div className="overflow-x-auto">
                                <table className="table-auto border-collapse border border-gray-300 w-full">
                                  <thead>
                                    <tr className="bg-gray-100">
                                      {item?.cost?.Area && (
                                        <th className="border border-gray-300 px-4 py-2 text-left">Area</th>
                                      )}
                                      {item?.cost?.Length && (
                                        <th className="border border-gray-300 px-4 py-2 text-left">Length</th>
                                      )}
                                      {item?.cost?.Cost && (
                                        <th className="border border-gray-300 px-4 py-2 text-left">Cost</th>
                                      )}
                                      {item?.cost?.Total_Cost && (
                                        <th className="border border-gray-300 px-4 py-2 text-left">Total Cost</th>
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      {item?.cost?.Area && (
                                        <td className="border border-gray-300 px-4 py-2">{item?.cost?.Area}</td>
                                      )}
                                      {item?.cost?.Length && (
                                        <td className="border border-gray-300 px-4 py-2">{item?.cost?.Length}</td>
                                      )}
                                      {item?.cost?.Cost && (
                                        <td className="border border-gray-300 px-4 py-2">{item?.cost?.Cost}</td>
                                      )}
                                      {item?.cost?.Total_Cost && (
                                        <td className="border border-gray-300 px-4 py-2">{item?.cost?.Total_Cost}</td>
                                      )}
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        )
                      )}

                      {editedData?.secondary_estimate?.Calculations && (
                        <div className="p-4 bg-white border rounded-lg mb-4">
                          {editedData?.secondary_estimate?.Calculations && (
                            <div>
                              <h2 className="font-bold text-gray-800 mb-3 text-base sm:text-lg">
                                Sub Structure:{" "}
                                {Object.keys(editedData?.secondary_estimate?.Calculations)[0]}
                              </h2>
                              <p className="mb-4 text-sm sm:text-base">
                                <strong>Plan:</strong>{" "}
                                {editedData?.secondary_estimate.Plan}
                              </p>
                            </div>
                          )}
                          <div className="overflow-x-auto">
                            <table className="table-auto border-collapse border border-gray-300 w-full">
                              <thead>
                                <tr className="bg-gray-100">
                                  {/* You can add column headers here */}
                                  <th className="border border-gray-300 px-4 py-2 text-left">Sub-Key</th>
                                  <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.keys(editedData?.secondary_estimate?.Calculations).map(
                                  (key, index) => {
                                    const value =
                                      editedData?.secondary_estimate?.Calculations[key];
                                    return (
                                      <>
                                        {typeof value === "object" ? (
                                          Object.keys(value).map((subKey, subIndex) => (
                                            <tr key={`${index}-${subIndex}`}>
                                              <td className="border border-gray-300 px-4 py-2">
                                                {subKey}
                                              </td>
                                              <td className="border border-gray-300 px-4 py-2">
                                                {value[subKey]}
                                              </td>
                                            </tr>
                                          ))
                                        ) : (
                                          <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2">
                                              {key}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                              {value}
                                            </td>
                                          </tr>
                                        )}
                                      </>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}


                      <div id="Free-Style-Container">
                        {SelectSubStructure && (
                          <>
                            <label
                              htmlFor="Free Style"
                              className="text-white font-medium text-xl"
                            >
                              Sub-Structure
                            </label>
                            <SubStructure
                              setSelectSubStructure={setSelectSubStructure}
                              HideMarkup={hideMarkup}
                              loading2={loading2}
                              setSubStructureCost={setSubStructureCost}
                            />
                          </>
                        )}
                        {!SelectSubStructure && (
                          <button
                            type="button"
                            className="bg-gradient-to-br block w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold justify-center items-center"
                            onClick={() => setSelectSubStructure(true)}
                          >
                            <FontAwesomeIcon icon={faPlus} /> Add Sub Structure
                          </button>
                        )}
                        {inputFields.length === 0 ? (
                          <div className="text-center my-3">
                            <button
                              type="button"
                              className="bg-gradient-to-br block w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold justify-center items-center"
                              onClick={handleAddFields}
                            >
                              <FontAwesomeIcon icon={faPlus} /> Add Free Style
                            </button>
                          </div>
                        ) : (
                          <>
                            {hideMarkup && (
                              <label
                                htmlFor="Free Style"
                                className="text-white font-medium text-xl mt-4"
                              >
                                Free Style
                              </label>
                            )}
                            {inputFields?.map((input, index) => (
                              <div
                                className="grid md:grid-cols-2 gap-4"
                                key={index}
                              >
                                {hideMarkup && (
                                  <>
                                    <div>
                                      <input
                                        type="text"
                                        className="md:my-2 my-2 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        name="freestyle"
                                        placeholder="Labour, Transportation, etc"
                                        value={input?.freestyle}
                                        onChange={(e) =>
                                          handleInputChange(index, e)
                                        }
                                        required
                                      />
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="number"
                                        className="md:my-2 my-2 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        name="freestylecost"
                                        placeholder="Cost"
                                        value={input?.freestylecost}
                                        onChange={(e) =>
                                          handleInputChange(index, e)
                                        }
                                        required
                                      />
                                      {index >= 0 && (
                                        <div className="absolute right-0 z-20 top-0">
                                          <button
                                            className={`w-8 h-8 bg-red-600 flex justify-center items-center text-white rounded-full py-3`}
                                            onClick={() =>
                                              handleRemoveFields(index)
                                            }
                                          >
                                            <MdOutlineCancel />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </>
                        )}
                        {inputFields?.length !== 0 && (
                          <div className="flex justify-end items-end">
                            <button
                              className={`w-20 bg-red-600 my-4 flex justify-center items-center text-white rounded-xl py-3`}
                              onClick={handleAddFields}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        )}
                        {hideMarkup && (
                          <label
                            htmlFor="Free Style"
                            className="text-white font-medium text-xl"
                          >
                            Total Cost:{" "}
                            {Number(combinedTotal)
                              ? Number(combinedTotal).toFixed(2)
                              : editedData?.total_combined_cost}
                          </label>
                        )}
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
                                    <h5>
                                      £
                                      {!SelectSubStructure
                                        ? editedData?.total_combined_cost
                                        : total_combined_cost?.toFixed(2)}
                                    </h5>
                                  </div>
                                </div>
                                {inputFields?.map((input, index) => (
                                  <div
                                    key={index}
                                    className="flex w-[50%] justify-between items-center"
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
                                    <h5>
                                      £
                                      {Number(combinedTotal)
                                        ? Number(combinedTotal).toFixed(2)
                                        : editedData?.total_combined_cost}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            )}
                        </>
                      </div>
                      {editMode && (
                        <button
                          className={`flex bg-gradient-to-br w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold justify-center items-center ${loading1 ? "disabled" : ""
                            }`}
                          type="submit"
                          onClick={handleSave}
                          disabled={loading1}
                        >
                          {loading1 ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Saving...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save me-2"></i> Save Changes
                            </>
                          )}
                        </button>
                      )}
                    </>
                  )}
                </div>
                {selectedProject && (
                  <>
                    <div className="flex items-center md:flex-row flex-col text-center my-2 gap-4">
                      <button
                        className={`flex bg-gradient-to-br w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold justify-center items-center`}
                        type="button"
                        onClick={handleShow}
                      >
                        Save PDF
                      </button>
                      <button
                        className={`flex bg-gradient-to-br w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold justify-center items-center`}
                        type="button"
                      >
                        Email Suppliers
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </Tab>
          <Tab
            eventKey="Off the Shelf"
            title="Off the Shelf"
            tabClassName={`w-ful register text-lg font-medium w-full p-3 rounded-2xl text-center flex justify-center items-center ${key === "Off the Shelf"
              ? "bg-gradient-to-br text-white from-[#00083c] via-[#00083c]"
              : "text-black"
              }`}
          >
            {key === "Off the Shelf" && (
              <div id="Off-the-Shelf">
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full"
                >
                  <select
                    className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    onChange={(event) => {
                      setslectedValues(event.target.value);
                    }}
                    value={slectedValues || ""}
                  >
                    <option selected value="">
                      Select the Category
                    </option>
                    <option value="Event shell">Event shell</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Item">Item</option>
                    <option value="Staff">Staff</option>
                  </select>
                </motion.div>
                {slectedValues === "Item" && (
                  <>
                    {formData?.projectName &&
                      formData?.date &&
                      formData?.companyName &&
                      formData?.email &&
                      formData?.billToName &&
                      formData?.billToAddress &&
                      formData?.shipToName &&
                      formData?.shipToAddress && (
                        <div className="grid md:grid-cols-2 mb-5">
                          <div className="flex items-center">
                            <img
                              src="./logo.PNG"
                              alt=""
                              width={150}
                              height={150}
                            />
                            &nbsp;
                            <span className="text-2xl font-bold">
                              In the Ballpark
                            </span>
                          </div>
                          <div>
                            <strong>&nbsp;Project Name:</strong>&nbsp;
                            {formData?.projectName}
                            <br />
                            <strong>&nbsp;Date:</strong>&nbsp;{formData?.date}
                            <br />
                            <strong>&nbsp;Company Name:</strong>&nbsp;
                            {formData?.companyName}
                            <br />
                            <strong>&nbsp;Email Address:</strong>&nbsp;
                            {formData?.email}
                          </div>
                          <div>
                            <h3 className="text-2xl font-normal">BILL TO</h3>
                            <strong>&nbsp;{formData?.billToName}</strong>
                            <p className="text-dark">
                              &nbsp;{formData?.billToAddress}.
                            </p>
                          </div>
                          <div>
                            <h3 className="text-2xl font-normal">SHIP TO</h3>
                            <strong>&nbsp;{formData?.shipToName}</strong>
                            <p className="text-dark">
                              &nbsp;{formData?.shipToAddress}
                            </p>
                          </div>
                        </div>
                      )}
                    <MaterialComponent
                      setTableHaderIndex={setTableHaderIndex}
                      TableHaderIndex={TableHaderIndex}
                      HideMarkup={hideMarkup}
                      inputFields={inputFields}
                      CostCombined={OfftheshelfCostCombined?.toFixed(2)}
                      formData={formData}
                      hideMarkup2={hideMarkup2}
                      loading2={loading2}
                    />
                    {inputFields?.length !== 0 && hideMarkup && (
                      <label
                        htmlFor="Free Style"
                        className="text-white font-medium text-xl mt-4"
                      >
                        Free Style
                      </label>
                    )}
                    {inputFields?.length === 0 ? (
                      <div className="text-center my-3">
                        <button
                          type="button"
                          className="bg-gradient-to-br block w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold justify-center items-center"
                          onClick={handleAddFields}
                        >
                          <FontAwesomeIcon icon={faPlus} /> Add Free Style
                        </button>
                      </div>
                    ) : (
                      inputFields.map((input, index) => (
                        <div className="grid md:grid-cols-2 gap-4" key={index}>
                          {hideMarkup && (
                            <>
                              <div>
                                <input
                                  type="text"
                                  className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                  name="freestyle"
                                  placeholder="Labour, Transportation, etc"
                                  value={input?.freestyle}
                                  onChange={(e) => handleInputChange(index, e)}
                                  required
                                />
                              </div>
                              <div className="relative">
                                <input
                                  type="number"
                                  className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                  name="freestylecost"
                                  placeholder="Cost"
                                  value={input?.freestylecost}
                                  onChange={(e) => handleInputChange(index, e)}
                                  required
                                />
                                {index >= 0 && (
                                  <div className="absolute right-0 z-20 top-0">
                                    <button
                                      className={`w-8 h-8 bg-red-600 flex justify-center items-center text-white rounded-full py-3`}
                                      onClick={() => handleRemoveFields(index)}
                                    >
                                      <MdOutlineCancel />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                    {PdfTotalCostShow &&
                      inputFields.length !== 0 &&
                      hideMarkup && (
                        <label
                          htmlFor="Free Style"
                          className="fs-5 fw-bold text-primary"
                        >
                          Total Cost : {OfftheshelfCostCombined?.toFixed(2)}
                        </label>
                      )}
                    {inputFields.length !== 0 && (
                      <div className="flex justify-end items-end">
                        <button
                          className={`w-20 bg-red-600 my-4 flex justify-center items-center text-white rounded-xl py-3`}
                          onClick={handleAddFields}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center md:flex-row flex-col text-center my-2 gap-4">
                      <button
                        className={`flex bg-gradient-to-br w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold justify-center items-center`}
                        type="button"
                        onClick={handleShow}
                      >
                        Save PDF
                      </button>
                      <button
                        className={`flex bg-gradient-to-br w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold justify-center items-center`}
                        type="button"
                      >
                        Email Suppliers
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </Tab>
          <Tab
            eventKey="Ballpark 2.0 Pictures"
            title="Ballpark 2.0 Pictures"
            tabClassName={`w-ful register text-lg font-medium w-full p-3 rounded-2xl text-center flex justify-center items-center ${key === "Ballpark 2.0 Pictures"
              ? "bg-gradient-to-br text-white from-[#00083c] via-[#00083c]"
              : "text-black"
              }`}
          >
            {key === "Ballpark 2.0 Pictures" && (
              <p className="text-center text-white mt-5 text-2xl font-bold">
                Coming soon...
              </p>
            )}
          </Tab>
        </Tabs>

        <AnimatePresence>
          {show && (
            <motion.div
              className="fixed overflow-y-scroll inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white shadow-md rounded-xl p-6 w-full max-w-4xl mx-4 sm:mx-8 relative 
                md:top-0 top-60"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={handleClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Modal Body */}
                <div className="bg-white rounded-xl">
                  {/* First Row */}
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full sm:w-1/2 px-3">
                      <label htmlFor="projectName" className="block text-gray-700">
                        Project Name
                      </label>
                      <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleChange}
                        placeholder="Enter project name"
                        className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                      <label htmlFor="date" className="block text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Second Row */}
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full sm:w-1/2 px-3">
                      <label htmlFor="companyName" className="block text-gray-700">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter company name"
                        className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                      <label htmlFor="email" className="block text-gray-700">
                        Email Address of the Purchaser
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Third Row */}
                  <div className="flex flex-wrap -mx-3 mb-4">
                    {/* BILL TO */}
                    <div className="w-full sm:w-1/2 px-3">
                      <h5 className="font-semibold text-gray-700">BILL TO</h5>
                      <label htmlFor="billToName" className="block text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="billToName"
                        name="billToName"
                        value={formData.billToName}
                        onChange={handleChange}
                        placeholder="Enter name"
                        className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <label htmlFor="billToAddress" className="block text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        id="billToAddress"
                        name="billToAddress"
                        value={formData.billToAddress}
                        onChange={handleChange}
                        placeholder="Enter address"
                        className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* SHIP TO */}
                    <div className="w-full sm:w-1/2 px-3">
                      <h5 className="font-semibold text-gray-700">SHIP TO</h5>
                      <label htmlFor="shipToName" className="block text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="shipToName"
                        name="shipToName"
                        value={formData.shipToName}
                        onChange={handleChange}
                        placeholder="Enter name"
                        className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                      <label htmlFor="shipToAddress" className="block text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        id="shipToAddress"
                        name="shipToAddress"
                        value={formData.shipToAddress}
                        onChange={handleChange}
                        placeholder="Enter address"
                        className="my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Checkboxes and Button */}
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full sm:w-1/2 px-3">
                      <label className="flex items-center text-gray-700">
                        <input
                          type="checkbox"
                          name="internalUse"
                          checked={selectedValues === "Internal use"}
                          value="Internal use"
                          onChange={(e) =>
                            setSelectedValues(
                              e.target.checked ? e.target.value : ""
                            )
                          }
                          className="mr-2"
                        />
                        Internal use
                      </label>
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                      <label className="flex items-center text-gray-700">
                        <input
                          type="checkbox"
                          name="externalUse"
                          checked={selectedValues === "External use"}
                          value="External use"
                          onChange={(e) =>
                            setSelectedValues(
                              e.target.checked ? e.target.value : ""
                            )
                          }
                          className="mr-2"
                        />
                        External use
                      </label>
                    </div>
                  </div>

                  {selectedValues && (
                    <button
                      className="bg-gradient-to-br block w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold justify-center items-center mt-4"
                      type="button"
                      onClick={handleGeneratePDF}
                      disabled={loading2}
                    >
                      {loading2 ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm mr-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-file-pdf mr-2"></i> Download
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default StartQuote;
