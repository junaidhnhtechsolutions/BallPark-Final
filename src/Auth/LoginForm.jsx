// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { useFormik } from "formik";
// import axios from "axios";
// import * as Yup from "yup";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import BaseUrl from "./BaseUrl";
// import { motion } from "framer-motion";
// import Particles from "../components/ui/particles";

// const FormSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .required("Password is required")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[0-9]/, "Password must contain at least one number")
//     .matches(
//       /[!@#$%^&*(),.?":{}|<>]/,
//       "Password must contain at least one special character"
//     ),
// });

// const FormSchemaLogin = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .required("Password is required")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[0-9]/, "Password must contain at least one number")
//     .matches(
//       /[!@#$%^&*(),.?":{}|<>]/,
//       "Password must contain at least one special character"
//     ),
// });

// const iniailValue = {
//   name: "",
//   company: "",
//   age: "",
//   email: "",
//   password: "",
// };
// const iniailValueLogin = {
//   email: "",
//   password: "",
// };
// const LoginForm = () => {
//   const [activeTab, setActiveTab] = useState("login");
//   const [loading, setLoading] = useState(false);
//   const [PageLoader, setPageLoader] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const Navigate = useNavigate();
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };
//   const { values, errors, handleChange, handleBlur, handleSubmit, resetForm } =
//     useFormik({
//       initialValues: activeTab === "login" ? iniailValueLogin : iniailValue,
//       validationSchema: activeTab === "login" ? FormSchemaLogin : FormSchema,
// onSubmit: (values) => {
//   setLoading(true);
//   setPageLoader(true);
//   console.log(values, "FormSchema");
//   const config = {
//     method: "POST",
//     url: `${BaseUrl.baseurl}${
//       activeTab === "login" ? "login/" : "signup/"
//     }`,
//     data: values,
//     headers: {
//       Accept: "application/json",
//     },
//   };
//   axios(config)
//     .then(function (response) {
//       setLoading(false);
//       setPageLoader(false);
//       const msg = response?.data?.message?.email?.map((e) => e);
//       console.log(response?.data, "response");
//       if (response?.data?.payload) {
//         localStorage.setItem(
//           "user",
//           JSON.stringify(response.data.payload)
//         );
//       } else {
//         console.error("Payload is undefined");
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }
//       if (activeTab === "login") {
//         localStorage.setItem("token", response.data.token);
//       }
//       if (response.status) {
//         Swal.fire({
//           showCloseButton: true,
//           toast: true,
//           icon: "success",
//           title: msg ? msg : response?.data?.message,
//           animation: true,
//           position: "top-right",
//           showConfirmButton: false,
//           timer: 3000,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.addEventListener("mouseenter", Swal.stopTimer);
//             toast.addEventListener("mouseleave", Swal.resumeTimer);
//           },
//         });
//         if (activeTab === "login") {
//           Navigate("/dashboard");
//           window.location.reload();
//         }
//       }
//     })
//     .catch((error) => {
//       setPageLoader(false);
//       setLoading(false);
//       console.log(error?.response?.data?.message, "eroors===>");
//       Swal.fire({
//         showCloseButton: true,
//         toast: true,
//         icon: "error",
//         title: error?.response?.data?.message,
//         animation: true,
//         position: "top-right",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.addEventListener("mouseenter", Swal.stopTimer);
//           toast.addEventListener("mouseleave", Swal.resumeTimer);
//         },
//       });
//     });
// },
//     });

//   return (
//     <>
//       <div className="flex justify-center items-center min-h-screen h-auto md:h-screen bg-gradient-to-br from-[#00083c] via-[#73cddd] relative overflow-hidden">
//       <Particles
//         className="absolute inset-0 z-0"
//         quantity={150}
//         ease={100}
//         color={"#ffffff"}
//         refresh
//       />

//       <motion.div
//         className="relative z-10 rounded-xl shadow-2xl p-5 max-w-lg w-full bg-opacity-80"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="login_register">
//           <motion.div
//             className={`flex justify-between space-x-4 w-full border rounded-2xl bg-white md:mt-0 mt-20`}
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Link
//               to="#"
//               className={`login text-lg font-medium w-full p-3 rounded-2xl text-center ${
//                 activeTab === "login"
//                   ? "bg-gradient-to-br text-white from-[#00083c] via-[#00083c]"
//                   : "text-gray-700"
//               }`}
//               onClick={() => {
//                 handleTabChange("login");
//                 resetForm();
//               }}
//             >
//               Login
//             </Link>
//             <Link
//               to="#"
//               className={`register text-lg font-medium w-full p-3 rounded-2xl text-center ${
//                 activeTab === "register"
//                   ? "bg-gradient-to-br text-white from-[#00083c] via-[#00083c]"
//                   : "text-gray-700"
//               }`}
//               onClick={() => {
//                 handleTabChange("register");
//                 resetForm();
//               }}
//             >
//               Signup
//             </Link>
//           </motion.div>
//         </div>

//         <form className="form space-y-3 mt-4" onSubmit={handleSubmit}>
//           {activeTab === "register" && (
//             <>
//               <motion.input
//                 type="text"
//                 autoComplete="off"
//                 placeholder="First Name"
//                 className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
//                 name="name"
//                 value={values?.name}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               />
//               {errors?.name && (
//                 <div className="text-sm text-red-600">{errors?.name}</div>
//               )}

//               <motion.input
//                 type="text"
//                 autoComplete="off"
//                 placeholder="Company Name"
//                 className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
//                 name="company"
//                 value={values?.company}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               />
//               {errors?.company && (
//                 <div className="text-sm text-red-600">{errors?.company}</div>
//               )}

//               <motion.input
//                 type="number"
//                 autoComplete="off"
//                 placeholder="Age"
//                 className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
//                 name="age"
//                 value={values?.age}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               />
//               {errors?.age && (
//                 <div className="text-sm text-red-600">{errors?.age}</div>
//               )}

//               <motion.input
//                 type="email"
//                 autoComplete="off"
//                 placeholder="Email Address"
//                 className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
//                 name="email"
//                 value={values?.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               />
//               {errors?.email && (
//                 <div className="text-sm text-red-600">{errors?.email}</div>
//               )}

//               <div className="relative">
//                 <motion.input
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="off"
//                   placeholder="Password"
//                   className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
//                   name="password"
//                   value={values?.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   initial={{ opacity: 0, y: -50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6 }}
//                 />
//                 <span
//                   className="absolute top-5 right-4 cursor-pointer"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//               {errors?.password && (
//                 <div className="text-sm text-red-600">{errors?.password}</div>
//               )}
//             </>
//           )}

//           {activeTab === "login" && (
//             <>
//               <motion.input
//                 type="email"
//                 autoComplete="off"
//                 placeholder="Email Address"
//                 className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
//                 name="email"
//                 value={values?.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               />
//               {errors?.email && (
//                 <div className="text-sm text-red-600">{errors?.email}</div>
//               )}

//               <div className="relative">
//                 <motion.input
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="off"
//                   placeholder="Password"
//                   className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
//                   name="password"
//                   value={values?.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   initial={{ opacity: 0, y: -50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6 }}
//                 />
//                 <span
//                   className="absolute top-5 right-4 cursor-pointer"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//               {errors?.password && (
//                 <div className="text-sm text-red-600">{errors?.password}</div>
//               )}
//               <Link to="#" className="fp text-sm font-medium text-blue-500">
//                 Forgot password?
//               </Link>
//             </>
//           )}

//           <motion.button
//             type="button"
//             onClick={handleSubmit}
//             className="bg-gradient-to-br block w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold hover:opacity-80"
//             disabled={loading}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             {loading ? (
//               <>
//                 <span
//                   className="spinner-border spinner-border-sm me-2"
//                   role="status"
//                   aria-hidden="true"
//                 ></span>
//                 Processing...
//               </>
//             ) : activeTab === "register" ? (
//               "Signup"
//             ) : (
//               "Login"
//             )}
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//     </>
//   );
// };

// export default LoginForm;

import React, { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import axios from "axios"
import BaseUrl from "./BaseUrl"

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

const initialValues = {
  email: "",
  password: "",
}

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: FormSchemaLogin,
    onSubmit: (values) => {
      setLoading(true);
      const config = {
        method: "POST",
        url: `${BaseUrl.baseurl}${"login/"}`,
        data: values,
        headers: {
          Accept: "application/json",
        },
      };
      axios(config)
        .then(function (response) {
          setLoading(false);
          localStorage.setItem("user", JSON.stringify(response?.data?.payload));
          localStorage.setItem("token", response?.data?.token);
          if (response?.data?.status == true) {
            Swal.fire({
              showCloseButton: true,
              toast: true,
              icon: "success",
              title: response?.data?.message,
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
            navigate("/dashboard");
            window.location.reload();
          }
        })
        .catch((error) => {
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#00b4d8] to-[#0096c7]">
      <motion.div
        className="w-full max-w-md p-8 mx-4 rounded-3xl border-2 border-white/20 bg-[#0096c7]/80 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-wider">LOGIN</h2>
          <p className="text-white/90 mt-1 tracking-wide">
            DON&apos;T HAVE AN <br /> ACCOUNT?{" "}
            <Link to="/signup" className="font-bold underline">
              CLICK HERE
            </Link>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-white text-lg font-bold tracking-wider">
              EMAIL
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full bg-transparent border-b-2 border-white/70 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
            />
            {touched.email && errors.email && (
              <p className="text-red-200 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-white text-lg font-bold tracking-wider">
              PASSWORD
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full bg-transparent border-b-2 border-white/70 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-white"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-red-200 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              className="h-5 w-5 border-2 border-white rounded bg-transparent text-blue-600 focus:ring-0"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-white font-bold">
              REMEMBER ME
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-white text-[#0096c7] rounded-md font-bold text-lg hover:bg-white/90 transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0096c7]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              "LOGIN"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
