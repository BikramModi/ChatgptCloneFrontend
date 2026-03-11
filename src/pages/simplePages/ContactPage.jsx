import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  User,
  Edit3,
  MessageSquare,
  Send,
} from "lucide-react";
import { toast } from "react-toastify";


import GuestNavbar from "../../components/landingComponents/Navbar";
import Footer from "../../components/landingComponents/Footer";
import GuestWelcomeList from "../../components/landingComponents/GuestWelcomeList";



const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-indigo-300">


      <GuestNavbar />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>

      {/* HERO SECTION */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Have questions or need help? Get in touch with our team.
          </p>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2">

        {/* CONTACT INFO */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600">
            We’d love to hear from you! Reach out to us using the form, email,
            phone, or visit our store.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin size={20} className="text-indigo-600" />
              <span>123 Market Street, Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone size={20} className="text-indigo-600" />
              <span>+977 9812345678</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={20} className="text-indigo-600" />
              <span>support@eshop.com</span>
            </div>
          </div>
        </motion.div>

        {/* CONTACT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-300 rounded-2xl shadow-lg p-8 flex flex-col gap-4"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Send us a message
          </h3>

          {/* Name */}
          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Subject */}
          <div className="relative">
            <Edit3 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-3 
            rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 
            transition flex items-center justify-center gap-2 mt-2"
          >
            <Send size={18} />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </section>

      <GuestWelcomeList />

      <Footer />

    </div>
  );
};

export default ContactPage;
