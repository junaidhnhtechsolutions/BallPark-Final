import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Stage, Layer, Line, Transformer, Image } from "react-konva";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FiCornerUpLeft, FiCornerUpRight } from "react-icons/fi";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Bezier } from "bezier-js";
import { motion } from "framer-motion";
import BaseUrl from "../../Auth/BaseUrl";
import "./Cost.css";
import { FaArrowLeft } from "react-icons/fa6";
import Loader from "../../components/Loader";

const CostDrawing = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cropper, setCropper] = useState();
  const [estimateData, setestimateData] = useState("");
  const [name, setName] = useState("");
  const [user_prompt, setuser_prompt] = useState("");
  const [user_plan, setuser_plan] = useState("");
  // @ts-ignore
  const [isCrop, setIsCrop] = useState(true);
  const [isCropImage, setIsCropImage] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [lines, setLines] = useState([]);
  const [isCurving, setIsCurving] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  // @ts-ignore
  // const [costEstimateData, setcostEstimateData] = useState(false);
  const [inputDirections, setInputDirections] = useState([]);
  const [deletedLines, setDeletedLines] = useState([]);
  const inputRef = useRef(null);
  const trRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");
  // @ts-ignore
  const [resmobile, setResmobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setResmobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [croppedImage]);
  console.log(croppedImage, "croppedImage==>");
  const handleCancel = () => {
    setCroppedImage(null);
    setImage(null);
    setIsCropImage(false);
  };

  const onUpload = () => {
    if (!name.trim()) {
      Swal.fire({
        title: "Error",
        text: "Project Name cannot be empty!",
        icon: "error",
      });
      return;
    }
    if (inputRef.current) {
      inputRef.current.click();
    }
    setLines([]);
  };

  const onChange = (e) => {
    if (!name.trim()) {
      Swal.fire({
        title: "Error",
        text: "Project Name cannot be empty!",
        icon: "error",
      });
      return;
    }
    const files = e.target.files || e.dataTransfer.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader?.readAsDataURL(files[0]);
    setIsCropImage(true);
  };

  const getimgdata = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      setCroppedImage(croppedCanvas.toDataURL());
      setIsCrop(false);
      setIsCropImage(false);
    }
  };
  const handleBack = () => {
    if (croppedImage) {
      setIsCrop(true);
      setIsCropImage(true);
      setLines([]);
      setestimateData("");
    }
  };

  const toggleInputDirection = (index) => {
    const newInputDirections = inputDirections.slice();
    switch (newInputDirections[index]) {
      case "right":
        newInputDirections[index] = "bottom";
        break;
      case "bottom":
        newInputDirections[index] = "left";
        break;
      case "left":
        newInputDirections[index] = "top";
        break;
      case "top":
        newInputDirections[index] = "right";
        break;
      default:
        break;
    }
    setInputDirections(newInputDirections);
  };

  const handleInputChange = (e, index) => {
    const newInputValues = inputValues.slice();
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  const handleMouseDown = (e) => {
    if (lines.length > 0 && inputValues.some((value) => value.trim() === "")) {
      setShowMessage(true);
      return;
    }
    setShowMessage(false);

    const pos = e.target.getStage().getPointerPosition();
    if (isCurving) {
      const newLine = { points: [pos.x, pos.y], isCurve: true };
      setCurrentLine(newLine);
    } else {
      const newLine = { points: [pos.x, pos.y, pos.x, pos.y] };
      setCurrentLine(newLine);
    }
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (isDrawing && currentLine) {
      const pos = e.target.getStage().getPointerPosition();
      if (isCurving) {
        const newLine = {
          ...currentLine,
          points: [...currentLine.points, pos.x, pos.y],
        };
        setCurrentLine(newLine);

        const points = newLine.points.slice();
        if (points.length > 4) {
          const curve = new Bezier(points);
          const curvePoints = curve
            .getLUT(100)
            .map((point) => [point.x, point.y])
            .flat();
          newLine.curvePoints = curvePoints;
        } else {
          newLine.curvePoints = points;
        }
      } else {
        const updatedLine = {
          ...currentLine,
          points: [currentLine.points[0], currentLine.points[1], pos.x, pos.y],
        };
        setCurrentLine(updatedLine);
      }
    }
  };

  const handleMouseUp = () => {
    if (!currentLine) return;

    if (isCurving) {
      const points = currentLine.points.slice();
      if (points.length > 4) {
        const curve = new Bezier(points);
        const curvePoints = curve
          .getLUT(100)
          .map((point) => [point.x, point.y])
          .flat();
        setLines([...lines, { points: curvePoints, isCurve: true }]);
      }
    } else {
      setLines([...lines, { ...currentLine, isCurve: false }]);
    }

    setInputValues([...inputValues, ""]);
    setInputDirections([...inputDirections, "top"]);
    setCurrentLine(null);
    setIsDrawing(false);
  };

  const toggleDrawingMode = () => {
    setIsCurving(!isCurving);
    setCurrentLine(null);
  };

  const renderInputBoxes = () => {
    return lines.map((line, index) => {
      // // Calculate the center of the curve or line
      // const canvas = canvasRef.current;
      // const context = canvas?.getContext("2d");

      const center = line.isCurve
        ? calculateCurveCenter(line.points)
        : calculateLineCenter(line.points);
      // const textWidth = context.measureText(inputValues[index]).width;
      const inputBoxWidth = 80; // Assuming a fixed width for the input box
      let leftPosition, topPosition;

      switch (inputDirections[index]) {
        case "right":
          leftPosition = center.x + 10;
          topPosition = center.y - inputBoxWidth / 2;
          break;
        case "left":
          leftPosition = center.x - inputBoxWidth - 10;
          topPosition = center.y - inputBoxWidth / 2;
          break;
        case "top":
          leftPosition = center.x - inputBoxWidth / 2;
          topPosition = center.y - 10 - inputBoxWidth;
          break;
        case "bottom":
          leftPosition = center.x - inputBoxWidth / 2;
          topPosition = center.y + 20; // Adjust the distance below the line
          break;
        default:
          leftPosition = center.x + 10;
          topPosition = center.y - inputBoxWidth / 2;
          break;
      }

      return (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${leftPosition}px`,
            top: `${topPosition}px`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={inputValues[index]}
            onChange={(e) => handleInputChange(e, index)}
            className={`border rounded px-2 py-1 text-black ${inputValues[index] ? "border-blue-600" : "border-red-600"
              }`}
            style={{
              width: `${inputBoxWidth}px`,
              textAlign: "left",
              marginRight: inputDirections[index] === "right" ? "5px" : "0",
              marginLeft: inputDirections[index] === "left" ? "5px" : "0",
              marginTop: inputDirections[index] === "top" ? "5px" : "0",
              marginBottom: inputDirections[index] === "bottom" ? "5px" : "0",
            }}
          />
          {inputDirections[index] === "right" ? (
            <ChevronLeft
              size={20}
              className="cursor-pointer text-black"
              onClick={() => toggleInputDirection(index)}
            />
          ) : inputDirections[index] === "left" ? (
            <ChevronRight
              size={20}
              className="cursor-pointer text-black"
              onClick={() => toggleInputDirection(index)}
            />
          ) : inputDirections[index] === "top" ? (
            <ChevronDown
              size={20}
              className="cursor-pointer text-black"
              onClick={() => toggleInputDirection(index)}
            />
          ) : (
            <ChevronUp
              size={20}
              className="cursor-pointer text-black"
              onClick={() => toggleInputDirection(index)}
            />
          )}
        </div>
      );
    });
  };

  const calculateLineCenter = (points) => {
    if (!points || points.length < 4) {
      return { x: 0, y: 0 };
    }
    const midX = (points[0] + points[2]) / 2;
    const midY = (points[1] + points[3]) / 2;
    return { x: midX, y: midY };
  };
  const handleSave = (event, apiType) => {
    event.preventDefault();
    setLoading(true);

    if (inputValues?.some((value) => value.trim() === "")) {
      setShowMessage(true);
      setLoading(false);
      return;
    }

    if (!name?.trim()) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Project Name cannot be empty!",
        icon: "error",
      });
      return;
    }
    setShowMessage(false);

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    const img = imageRef.current;

    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      lines?.forEach((line, index) => {
        context.beginPath();

        if (line?.isCurve) {
          const curve = new Bezier(line?.points);
          const curvePoints = curve.getLUT(100);
          context.moveTo(curvePoints[0].x, curvePoints[0].y);
          curvePoints.forEach((point, i) => {
            if (i > 0) {
              context.lineTo(point.x, point.y);
            }
          });
        } else {
          context.moveTo(line?.points[0], line?.points[1]);
          context.lineTo(line?.points[2], line?.points[3]);
        }

        context.strokeStyle = "red";
        context.lineWidth = 2;
        context.stroke();

        const center = line.isCurve
          ? calculateCurveCenter(line.points)
          : calculateLineCenter(line.points);
        const textWidth = context.measureText(inputValues[index]).width;
        let textX, textY;

        switch (inputDirections[index]) {
          case "right":
            textX = center.x + 10;
            textY = center.y;
            break;
          case "left":
            textX = center.x - textWidth - 10;
            textY = center.y;
            break;
          case "top":
            textX = center.x - textWidth / 2;
            textY = center.y - 10;
            break;
          case "bottom":
            textX = center.x - textWidth / 2;
            textY = center.y + 20;
            break;
          default:
            textX = center.x + 10;
            textY = center.y;
            break;
        }

        context.fillStyle = "red";
        context.font = "700 18px Arial";
        context.fillText(inputValues[index], textX, textY);
      });

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Failed to convert canvas to blob");
          return;
        }
        const formData = new FormData();
        formData.append("image", blob, "image.png");
        formData.append("project_name", name);
        formData.append("plans", user_plan);
        if (apiType === "alpha") {
          formData.append("Model", "alpha");
        } else if (apiType === "beta") {
          formData.append("Model", "beta");
        }
        if (user_prompt !== "") {
          formData.append("user_prompt", user_prompt);
        }

        const url =
          apiType === "alpha" ? "Alfa_CostEstimate/" : "Beta_CostEstimate/";
        axios
          .post(`${BaseUrl.baseurlImage}${url}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const result = JSON.parse(response?.data?.estimate);
            console.log(result, response?.data, "resulte--->");
            const parsedEstimate = JSON.parse(response?.data?.estimate);
            const message = parsedEstimate?.primary_estimate?.message;
            const checkImage = message
              ?.split()
              ?.includes(
                "The given image is not related to construction or manufacturing materials."
              );
            console.log(message, 'message');
            if (checkImage) {
              Swal.fire({
                title: message,
                icon: "error",
              });
            } else {
              if (result?.analysis) {
                Navigate("/result-drawing", {
                  state: { result, data: response?.data },
                });
              } else if (result) {
                Navigate("/result-drawing", {
                  state: { result, data: response?.data },
                });
              }
            }
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            Swal.fire({
              title: error.response.data.detail || error.response.data.message,
              icon: "error",
            });
          });
      }, "image/png");
    };

    if (img.complete) {
      img.onload();
    }
  };

  const handleDownload = () => {
    if (inputValues.some((value) => value.trim() === "")) {
      setShowMessage(true);
      return;
    }
    setShowMessage(false);

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    context.drawImage(
      imageRef.current,
      0,
      0,
      imageRef.current.width,
      imageRef.current.height
    ); // Use custom width and height
    lines.forEach((line, index) => {
      context.beginPath();

      if (line.isCurve) {
        const curve = new Bezier(line.points);
        const curvePoints = curve.getLUT(100);
        context.moveTo(curvePoints[0].x, curvePoints[0].y);
        curvePoints.forEach((point, i) => {
          if (i > 0) {
            context.lineTo(point.x, point.y);
          }
        });
      } else {
        context.moveTo(line.points[0], line.points[1]);
        context.lineTo(line.points[2], line.points[3]);
      }

      context.strokeStyle = "red";
      context.lineWidth = 2;
      context.stroke();

      // Calculate the center of the curve or line
      const center = line.isCurve
        ? calculateCurveCenter(line.points)
        : calculateLineCenter(line.points);
      const textWidth = context.measureText(inputValues[index]).width;
      let textX, textY;

      switch (inputDirections[index]) {
        case "right":
          textX = center.x + 10;
          textY = center.y;
          break;
        case "left":
          textX = center.x - textWidth - 50;
          textY = center.y;
          break;
        case "top":
          textX = center.x - textWidth / 2;
          textY = center.y - 20;
          break;
        case "bottom":
          textX = center.x - textWidth / 2;
          textY = center.y + 30; // Adjust the distance below the line
          break;
        default:
          textX = center.x + 10;
          textY = center.y;
          break;
      }

      context.fillStyle = "red";
      context.font = "700 18px Arial";
      context.fillText(inputValues[index], textX, textY);
    });

    const uri = canvas.toDataURL("image/png");
    // console.log("canvas ==> ", canvas, uri);
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = uri;
    link.click();
    // };
  };

  const calculateCurveCenter = (points) => {
    const curve = new Bezier(points);
    const curvePoints = curve.getLUT(100); // Get 100 points along the curve
    const midpoint = Math.floor(curvePoints.length / 2);
    return { x: curvePoints[midpoint].x, y: curvePoints[midpoint].y };
  };

  const handleDeleteLastLine = () => {
    if (lines.length > 0) {
      const lastLineIndex = lines.length - 1;
      const lastLine = lines[lastLineIndex];

      const newLines = lines.slice(0, lastLineIndex);
      const newInputValues = inputValues.slice(0, lastLineIndex);
      const newInputDirections = inputDirections.slice(0, lastLineIndex);

      setDeletedLines([
        ...deletedLines,
        {
          line: lastLine,
          value: inputValues[lastLineIndex],
          direction: inputDirections[lastLineIndex],
        },
      ]);
      setLines(newLines);
      setInputValues(newInputValues);
      setInputDirections(newInputDirections);
    }
  };

  const handleUndoDelete = () => {
    if (deletedLines.length > 0) {
      const restoredLine = deletedLines[deletedLines.length - 1];
      const newDeletedLines = deletedLines.slice(0, -1);

      setLines([...lines, restoredLine.line]);
      setInputValues([...inputValues, restoredLine.value]);
      setInputDirections([...inputDirections, restoredLine.direction]);
      setDeletedLines(newDeletedLines);
    }
  };
  useEffect(() => {
    console.log("selectedId ==> ", selectedId);
    if (selectedId !== null) {
      const selectedNode = stageRef.current.findOne(`#${selectedId}`);
      if (selectedNode) {
        trRef.current.nodes([selectedNode]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  return (
    <>

      {loading && <Loader />}
      <div className="flex w-full flex-col min-h-screen items-center justify-center bg-[#00b4d8] relative overflow-hidden">

        <motion.div
          className="w-full max-w-5xl relative flex items-center flex-col my-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {isCrop && (
            <div className="absolute top-5 left-5">
              <Link
                to="/new-project"
                className="flex items-center text-white text-xl"
              >
                <FaArrowLeft />
                <span className="ml-2">Back</span>
              </Link>
            </div>
          )}

          {!isCrop && (
            <div className="absolute top-5 left-5">
              <button
                onClick={handleBack}
                className="flex items-center text-white text-xl"
              >
                <FaArrowLeft />
                <span className="ml-2">Back</span>
              </button>
            </div>
          )}
          <div className="w-full">
            {isCrop && (
              <>
                <h3 className="text-center text-4xl font-bold text-white md:mt-5 mt-10">
                  Cost Drawing
                </h3>
                <div className="w-full p-6 rounded-lg shadow-2xl bg-opacity-80">
                  <div className="d-flex justify-content-center">
                    <label htmlFor="Project Name" className="text-white ">
                      Project Name:
                    </label>
                    <motion.input
                      type="text"
                      autoComplete="off"
                      placeholder="Project Name"
                      className="mt-2 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      name="user_prompt"
                      required=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  {isCrop && (
                    <motion.div
                      className="d-flex justify-content-center border-2 border-dashed border-white rounded-lg mt-4 py-4"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        onChange(e);
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <label className="cursor-pointer">
                        <input
                          type={name ? "file" : "text"}
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => onChange(e)}
                        />
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <motion.i
                            className="text-4xl text-blue-500"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3 }}
                          ></motion.i>
                          <motion.h5
                            className="mb-2 text-xl text-center text-gray-700 font-semibold"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            onClick={onUpload}
                          >
                            Drag & Drop your picture here
                          </motion.h5>
                          <p className="text-muted mb-0 text-center text-gray-500">
                            or click to browse
                          </p>
                        </div>
                      </label>
                    </motion.div>
                  )}
                </div>
              </>
            )}
            <div className="relative z-40 mt-12">
              {showMessage && (
                <div className="text-center text-red-600 text-sm">
                  Please fill all input fields before proceeding.
                </div>
              )}
              {!isCrop && image && (
                <>
                  <div>
                    <motion.input
                      type="text"
                      autoComplete="off"
                      placeholder="Enter For Additional Information:"
                      className="mt-2 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      name="user_prompt"
                      required=""
                      value={user_prompt}
                      onChange={(e) => setuser_prompt(e.target.value)}
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <select
                      className="form-select my-3 w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      aria-label="Select Substructure Plan"
                      value={user_plan}
                      onChange={(e) => setuser_plan(e.target.value)}
                    >
                      <option selected value="">
                        Select the SubStructure Plan...
                      </option>
                      <option value="bronze">Bronze</option>
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                    </select>
                  </motion.div>
                  <div className="relative bg-light d-flex flex-column align-items-center justify-center">
                    <div
                      className="relative"
                      style={{ width: "100%" }}
                      id="canvasWrapper"
                    >
                      <img
                        ref={imageRef}
                        src={croppedImage}
                        alt="Cropped"
                        className="img-fluid"
                        style={{ width: "100%", height: "600px" }}
                      />
                      <Stage
                        ref={stageRef}
                        width={resmobile ? window.innerWidth : 1170}
                        height={600}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onTouchMove={handleMouseMove}
                        onTouchEnd={handleMouseUp}
                        className="absolute top-0 start-0 w-full"
                      >
                        <Layer>
                          {croppedImage ? null : (
                            <Image
                              image={imageRef.current}
                              className="img-preview"
                              width={resmobile ? window.innerWidth : 1170}
                              height={600}
                            />
                          )}
                          {lines.map((line, i) =>
                            line.isCurve ? (
                              <Line
                                key={i}
                                id={line.id}
                                points={line.points}
                                stroke="red"
                                strokeWidth={2}
                                onClick={() => setSelectedId(line.id)}
                              />
                            ) : (
                              <Line
                                key={i}
                                points={line.points.flat()}
                                stroke="red"
                                strokeWidth={2}
                                draggable
                                onDragEnd={(e) => {
                                  const updatedPoints = e.target.points();
                                  const newPoints = [];
                                  for (
                                    let i = 0;
                                    i < updatedPoints.length;
                                    i += 2
                                  ) {
                                    newPoints.push([
                                      updatedPoints[i],
                                      updatedPoints[i + 1],
                                    ]);
                                  }
                                }}
                              />
                            )
                          )}
                          {currentLine &&
                            (isCurving ? (
                              <Line
                                points={currentLine.points}
                                stroke="red"
                                strokeWidth={2}
                                tension={0.5}
                                lineCap="round"
                              />
                            ) : (
                              <Line
                                points={currentLine.points}
                                stroke="red"
                                strokeWidth={2}
                                tension={0.5}
                                lineCap="round"
                              />
                            ))}
                          <Transformer ref={trRef} />
                        </Layer>
                      </Stage>
                      <canvas
                        ref={canvasRef}
                        width={resmobile ? window.innerWidth : 1170}
                        className=""
                        height={600}
                        style={{
                          display: "none",
                          background: "white",
                        }}
                      />
                      {renderInputBoxes()}
                    </div>
                  </div>
                  <div className="flex justify-center flex-col mt-4">
                    <button
                      onClick={toggleDrawingMode}
                      className="text-center text-md text-white underline"
                    >
                      {isCurving ? "Draw Straight Line" : "Draw Curve"}
                    </button>
                    <div className="flex flex-wrap gap-2 justify-center mt-6">
                      <motion.button
                        type="button"
                        className="border border-[#0077b6] text-black w-12 py-2 flex justify-center items-center rounded-lg focus:outline-none"
                        onClick={() => handleDeleteLastLine()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <FiCornerUpLeft />
                      </motion.button>

                      <motion.button
                        type="button"
                        className="border border-[#0077b6] text-black w-12 py-2 flex justify-center items-center rounded-lg focus:outline-none"
                        onClick={() => handleUndoDelete()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <FiCornerUpRight />
                      </motion.button>

                      <motion.button
                        type="button"
                        className="border border-[#0077b6] text-black w-12 py-2 flex justify-center items-center rounded-lg focus:outline-none"
                        onClick={() => handleDownload()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <FontAwesomeIcon icon={faDownload} />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
              {!isCrop && image && (
                <>
                  <div className="flex justify-center gap-2 mt-4">
                    <button
                      className="bg-[#0077b6] text-white font-bold py-3 px-12 text-lg tracking-wider hover:bg-[#0077b6]/80 transition-colors rounded-lg"
                      type="button"
                      onClick={(e) => handleSave(e, "alpha")}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          Estimating...
                        </>
                      ) : (
                        "Generate Cost Estimate"
                      )}
                    </button>
                  </div>
                </>
              )}
              {console.log(isCropImage, 'isCropImage')}
              {isCropImage && (
                <>
                  <div className="d-grid gap-4">
                    <div className="col-md-12">
                      <Cropper
                        style={{ width: "100%", minHeight: 600 }}
                        zoomTo={0.5}
                        width={"100%"}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                        onInitialized={(instance) => {
                          setCropper(instance);
                        }}
                        guides={true}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center mt-5 gap-5">
                    <button
                      type="button"
                      className="bg-red-600 text-white py-3 px-12 border-none outline-none rounded-lg"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-[#0077b6] text-white font-bold py-3 px-12 text-lg tracking-wider hover:bg-[#0077b6]/80 transition-colors rounded-lg"
                      onClick={getimgdata}
                    >
                      Crop
                    </button>
                  </div>
                </>
              )}
            </div>
            {console.log(estimateData, "API Response:data")}
            <div>
              {estimateData?.data?.map((item, index) => (
                <div key={index} className="bg-white p-4">
                  <h2 className="font-weight-bold text-dark">
                    <strong>Name:</strong>{" "}
                    <span className="font-weight-normal text-muted">
                      {item?.name}
                    </span>
                  </h2>
                  {item?.dimension && (
                    <p>
                      <strong>Dimension:</strong> <span>{item?.dimension}</span>
                    </p>
                  )}
                  <p>
                    <strong>Cost:</strong> <span>{item?.cost}</span>
                  </p>
                  <p>
                    <strong>Price:</strong> <span>{item?.price}</span>
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    <span>{item?.description}</span>
                  </p>
                  {item?.id && (
                    <button className="btn btn-link text-danger">Delete</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CostDrawing;
