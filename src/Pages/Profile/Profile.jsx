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
import { FaArrowLeft, FaUpload } from "react-icons/fa";
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#00b4d8] to-[#0096c7]">
      <div className="relative w-full max-w-4xl mx-auto">
        <motion.div
          className="relative z-10 my-20 rounded-lg overflow-hidden border-2 border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 pb-16 relative">
            <div className="absolute top-5 left-5">
              <Link
                to="/dashboard"
                className="flex items-center text-white text-xl"
              >
                <FaArrowLeft />
                <span className="ml-2">Back</span>
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-center text-white mb-8 tracking-wider">PROFILE</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-white text-lg font-medium tracking-wider mb-2">
                      NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full bg-transparent border-b-2 border-white/70 py-2 text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-lg font-medium tracking-wider mb-2">
                      COMPANY
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formik.values.company}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full bg-transparent border-b-2 border-white/70 py-2 text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-lg font-medium tracking-wider mb-2">
                      AGE
                    </label>
                    <input
                      type="text"
                      name="age"
                      value={formik.values.age}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full bg-transparent border-b-2 border-white/70 py-2 text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-lg font-medium tracking-wider mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full bg-transparent border-b-2 border-white/70 py-2 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div
                    className="w-48 h-48 rounded-full bg-[#0096c7] border-4 border-white/30 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                    onClick={handleImageClick}
                  >
                    {imagePreview || Data?.profile ? (
                      <img
                        src={imagePreview || Data?.profile || "https://example.com/default-profile.png"}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-white">
                        <FaUpload className="mx-auto text-3xl mb-2" />
                        <p className="font-bold">UPLOAD</p>
                        <p className="font-bold">PHOTO</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="absolute bottom-8 right-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0077b6] text-white font-bold py-3 px-12 text-lg tracking-wider hover:bg-[#0077b6]/80 transition-colors"
                >
                  {loading ? "SAVING..." : "SAVE"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
