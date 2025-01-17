import { useState } from "react";
import { motion } from "framer-motion";
import Particles from "../ui/particles";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gradient-to-br from-[#00083c] via-[#73cddd] relative overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={150}
        ease={100}
        color={"#ffffff"}
        refresh
      />

      <motion.div
        className="relative z-10  rounded-lg shadow-2xl p-8 max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-6 text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <label
              htmlFor="name"
              className="text-lg font-medium mb-2 text-white"
            >
              Name
            </label>
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="name"
              className="p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Name"
              required
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <label
              htmlFor="email"
              className="text-lg font-medium mb-2 text-white"
            >
              Email
            </label>
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              className="p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Email"
              required
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <label
              htmlFor="message"
              className="text-lg font-medium mb-2 text-white"
            >
              Message
            </label>
            <motion.textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              id="message"
              className="p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Message"
              rows={2}
              required
              whileFocus={{ scale: 1.05 }}
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full py-3 font-medium text-lg bg-white text-black rounded-md flex justify-center items-center hover:bg-black hover:text-white transition-all "
            initial={{ scale: 1 }}
            animate={{ scale: 1.02 }}
            whileHover={{ scale: 1.1, backgroundColor: "black" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
