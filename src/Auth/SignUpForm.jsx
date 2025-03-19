import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { motion } from "framer-motion"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import BaseUrl from "./BaseUrl"

const FormSchema = Yup.object().shape({
    name: Yup.string().required("First Name is required"),
    company: Yup.string().required("Company Name is required"),
    age: Yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});

const initialValues = {
    name: "",
    company: "",
    age: "",
    email: "",
    password: "",
}

export default function SignupForm() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues,
        validationSchema: FormSchema,
        onSubmit: (values) => {
            setLoading(true);
            const config = {
                method: "POST",
                url: `${BaseUrl.baseurl}${"signup/"}`,
                data: values,
                headers: {
                    Accept: "application/json",
                },
            };
            axios(config)
                .then(function (response) {
                    setLoading(false);
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
                        navigate("/login");
                    }
                })
                .catch((error) => {
                    setLoading(false);
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
    })

    return (
        <div className="flex justify-center items-center min-h-screen py-20 bg-gradient-to-b from-[#00b4d8] to-[#0096c7]">
            <motion.div
                className="w-full max-w-md p-8 mx-4 rounded-3xl border-2 border-white/20 bg-[#0096c7]/80 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-wider">PRE SIGN UP</h2>
                    <p className="text-white/90 mt-1 tracking-wide">
                        ALREADY HAVE AN <br /> ACCOUNT?{" "}
                        <Link to="/login" className="font-bold underline">
                            CLICK HERE
                        </Link>
                        .
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-white text-lg font-bold tracking-wider">
                            FIRST NAME
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full bg-transparent border-b-2 border-white/70 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                        />
                        {touched.name && errors.name && <p className="text-red-200 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-white text-lg font-bold tracking-wider">
                            COMPANY NAME
                        </label>
                        <input
                            id="company"
                            name="company"
                            type="text"
                            value={values.company}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full bg-transparent border-b-2 border-white/70 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                        />
                        {touched.company && errors.company && <p className="text-red-200 text-sm mt-1">{errors.company}</p>}
                    </div>

                    <div>
                        <label htmlFor="age" className="block text-white text-lg font-bold tracking-wider">
                            AGE
                        </label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            value={values.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full bg-transparent border-b-2 border-white/70 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                        />
                        {touched.age && errors.age && <p className="text-red-200 text-sm mt-1">{errors.age}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-white text-lg font-bold tracking-wider">
                            EMAIL
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full bg-transparent border-b-2 border-white/70 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                        />
                        {touched.email && errors.email && <p className="text-red-200 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-white text-lg font-bold tracking-wider">
                            PASSWORD
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full bg-transparent border-b-2 border-white/70 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-2 text-white">
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                        {touched.password && errors.password && <p className="text-red-200 text-sm mt-1">{errors.password}</p>}
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
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0096c7]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Processing...
                            </div>
                        ) : (
                            "SIGN UP"
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}

