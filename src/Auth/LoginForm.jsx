/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BaseUrl from "./BaseUrl";
import { motion } from "framer-motion";
import Particles from "../components/ui/particles";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const FormSchemaLogin = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const iniailValue = {
  name: "",
  company: "",
  age: "",
  email: "",
  password: "",
};
const iniailValueLogin = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [PageLoader, setPageLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const { values, errors, handleChange, handleBlur, handleSubmit, resetForm } =
    useFormik({
      initialValues: activeTab === "login" ? iniailValueLogin : iniailValue,
      validationSchema: activeTab === "login" ? FormSchemaLogin : FormSchema,
      onSubmit: (values) => {
        setLoading(true);
        setPageLoader(true);
        console.log(values, "FormSchema");
        const config = {
          method: "POST",
          url: `${BaseUrl.baseurl}${
            activeTab === "login" ? "login/" : "signup/"
          }`,
          data: values,
          headers: {
            Accept: "application/json",
          },
        };
        axios(config)
          .then(function (response) {
            setLoading(false);
            setPageLoader(false);
            const msg = response?.data?.message?.email?.map((e) => e);
            console.log(response?.data, "response");
            if (response?.data?.payload) {
              localStorage.setItem(
                "user",
                JSON.stringify(response.data.payload)
              );
            } else {
              console.error("Payload is undefined");
              localStorage.setItem("user", JSON.stringify(response.data));
            }
            if (activeTab === "login") {
              localStorage.setItem("token", response.data.token);
            }
            if (response.status) {
              Swal.fire({
                showCloseButton: true,
                toast: true,
                icon: "success",
                title: msg ? msg : response?.data?.message,
                animation: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });
              if (activeTab === "login") {
                Navigate("/dashboard");
                window.location.reload();
              }
            }
          })
          .catch((error) => {
            setPageLoader(false);
            setLoading(false);
            console.log(error?.response?.data?.message, "eroors===>");
            Swal.fire({
              showCloseButton: true,
              toast: true,
              icon: "error",
              title: error?.response?.data?.message,
              animation: true,
              position: "top-right",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
          });
      },
    });

  return (
    <>
      <div className="flex justify-center items-center h-[100vh] bg-gradient-to-br from-[#00083c] via-[#73cddd] relative overflow-hidden">
        <Particles
          className="absolute inset-0 z-0"
          quantity={150}
          ease={100}
          color={"#ffffff"}
          refresh
        />

        <motion.div
          className="relative z-10 rounded-xl shadow-2xl p-5 max-w-lg w-full bg-opacity-80"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="login_register">
            <motion.div
              className="flex justify-between space-x-4 w-full border rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="#"
                className={`login text-lg font-medium w-full p-3 rounded-2xl text-center ${
                  activeTab === "login"
                    ? "bg-gradient-to-br text-white from-[#00083c] via-[#00083c]"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  handleTabChange("login");
                  resetForm();
                }}
              >
                Login
              </Link>
              <Link
                to="#"
                className={`register text-lg font-medium w-full p-3 rounded-2xl text-center ${
                  activeTab === "register"
                    ? "bg-gradient-to-br text-white from-[#00083c] via-[#00083c]"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  handleTabChange("register");
                  resetForm();
                }}
              >
                Signup
              </Link>
            </motion.div>
          </div>

          <form className="form space-y-3 mt-4" onSubmit={handleSubmit}>
            {activeTab === "register" && (
              <>
                <motion.input
                  type="text"
                  autoComplete="off"
                  placeholder="First Name"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  name="name"
                  value={values?.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                />
                {errors?.name && (
                  <div className="text-sm text-red-600">{errors?.name}</div>
                )}

                <motion.input
                  type="text"
                  autoComplete="off"
                  placeholder="Company Name"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  name="company"
                  value={values?.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                />
                {errors?.company && (
                  <div className="text-sm text-red-600">{errors?.company}</div>
                )}

                <motion.input
                  type="number"
                  autoComplete="off"
                  placeholder="Age"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  name="age"
                  value={values?.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                />
                {errors?.age && (
                  <div className="text-sm text-red-600">{errors?.age}</div>
                )}

                <motion.input
                  type="email"
                  autoComplete="off"
                  placeholder="Email Address"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  name="email"
                  value={values?.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                />
                {errors?.email && (
                  <div className="text-sm text-red-600">{errors?.email}</div>
                )}

                <div className="relative">
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    placeholder="Password"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    name="password"
                    value={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                  <span
                    className="absolute top-5 right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors?.password && (
                  <div className="text-sm text-red-600">{errors?.password}</div>
                )}
              </>
            )}

            {activeTab === "login" && (
              <>
                <motion.input
                  type="email"
                  autoComplete="off"
                  placeholder="Email Address"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  name="email"
                  value={values?.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                />
                {errors?.email && (
                  <div className="text-sm text-red-600">{errors?.email}</div>
                )}

                <div className="relative">
                  <motion.input
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    placeholder="Password"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                    name="password"
                    value={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                  <span
                    className="absolute top-5 right-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors?.password && (
                  <div className="text-sm text-red-600">{errors?.password}</div>
                )}
                <Link to="#" className="fp text-sm font-medium text-blue-500">
                  Forgot password?
                </Link>
              </>
            )}

            <motion.button
              type="button"
              onClick={handleSubmit}
              className="bg-gradient-to-br block w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold hover:opacity-80"
              disabled={loading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Processing...
                </>
              ) : activeTab === "register" ? (
                "Signup"
              ) : (
                "Login"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default LoginForm;
