import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import BaseUrl from "../../Auth/BaseUrl";
import { Link } from "react-router-dom";
import Particles from "../../components/ui/particles";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const Profile = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [Data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: useMemo(
      () => ({
        name: Data?.fname || "",
        company: Data?.company || "",
        age: Data?.age || "",
        email: Data?.email || "",
        image: Data?.profile || null,
      }),
      [Data]
    ),
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required"),
      company: Yup.string()
        .min(2, "Company must be at least 2 characters")
        .required("Company is required"),
      age: Yup.string()
        .min(2, "Age must be 18 or older")
        .required("Age is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      image: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("id", Data.id);
        formData.append("name", values?.name);
        formData.append("age", values?.age);
        formData.append("email", values?.email);
        formData.append("company", values?.company);
        formData.append("profile", values?.image);

        const response = await axios.put(
          `${BaseUrl?.baseurlImage}profile/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Form submitted successfully:", response.data);
        getProfile();
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error submitting the form:", error);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: error.response?.data?.message || "Error",
          text: "Something went wrong!",
        });
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e?.target?.files[0];
    formik.setFieldValue("image", file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    fileInputRef?.current?.click();
  };

  const getProfile = useCallback(async () => {
    try {
      const response = await axios.get(`${BaseUrl.baseurlImage}profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData(response.data?.data);
    } catch (error) {
      console.error("Error retrieving the profile data:", error);
      Swal.fire({
        icon: "error",
        title: "Error retrieving profile data",
      });
    }
  }, [token]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <div className="flex justify-center items-center h-auto md:h-screen bg-gradient-to-br from-[#00083c] via-[#73cddd] relative overflow-hidden">
    <Particles
      className="absolute inset-0 z-0"
      quantity={150}
      ease={100}
      color={"#ffffff"}
      refresh
    />

    <motion.div
      className="w-full max-w-5xl p-6 md:my-0 my-20 rounded-lg shadow-2xl bg-opacity-80 relative h-auto md:h-96 flex justify-center flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute top-5 left-5">
        <Link
          to="/dashboard"
          className="flex items-center text-white text-xl"
        >
          <FaArrowLeft />
          <span className="ml-2">Back</span>
        </Link>
      </div>
      <h3 className="text-center text-4xl font-bold text-white mt-6 md:mt-0">User Profile</h3>

      <div className="flex flex-col md:flex-row justify-center items-center mt-6 md:mt-12">
        <div className="w-1/2 md:w-1/4 flex justify-center mb-6 md:mb-0">
          <motion.div
            className="w-44 h-44 rounded-full border-4 border-pink-600 overflow-hidden cursor-pointer"
            onClick={handleImageClick}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={imagePreview || Data.profile || "https://example.com/default-profile.png"}
              alt="User profile"
              className="w-44 h-44 object-cover"
            />
          </motion.div>
          <input
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            type="file"
            onChange={handleImageChange}
          />
        </div>

        <form onSubmit={formik.handleSubmit} className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Name Field */}
            <motion.div
              className="input-field"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </div>
              )}
            </motion.div>

            {/* Company Field */}
            <motion.div
              className="input-field"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-gray-700"
              >
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {formik.touched.company && formik.errors.company && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.company}
                </div>
              )}
            </motion.div>

            {/* Age Field */}
            <motion.div
              className="input-field"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label
                htmlFor="age"
                className="block text-sm font-semibold text-gray-700"
              >
                Age
              </label>
              <input
                type="text"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.age}
                </div>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="input-field"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </div>
              )}
            </motion.div>
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button
              type="submit"
              className={`bg-gradient-to-br block w-full py-3 rounded-xl from-[#00083c] via-[#00083c] text-white font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  </div>
  );
};

export default Profile;
