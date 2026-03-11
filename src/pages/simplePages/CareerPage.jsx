import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Rocket,
  Heart,
  Laptop,
  Send,
  ArrowLeft,
} from "lucide-react";


import Footer from "../../components/landingComponents/Footer";
import GuestNavbar from "../../components/landingComponents/Navbar";
import GuestWelcomeList from "../../components/landingComponents/GuestWelcomeList";


const jobs = [
  {
    id: 1,
    title: "Frontend Developer (React)",
    location: "Remote / Nepal",
    type: "Full Time",
  },
  {
    id: 2,
    title: "Backend Developer (Node.js)",
    location: "Kathmandu",
    type: "Full Time",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
  },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const CareerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-indigo-300">

        <GuestNavbar />

      {/* HERO SECTION */}
      <section className="relative bg-indigo-600 text-white py-20 px-6">

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute left-6 top-6 flex items-center gap-2 
          cursor-pointer text-white/90 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Build Your Career With Us
          </h1>
          <p className="text-indigo-100 text-lg max-w-3xl mx-auto">
            Join a passionate team building modern, scalable, and impactful
            digital products.
          </p>
        </motion.div>
      </section>

      {/* WHY JOIN US */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 text-center mb-12"
        >
          Why Join Our Team?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[Rocket, Users, Laptop].map((Icon, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="bg-white p-6 rounded-2xl shadow flex flex-col gap-4"
            >
              <Icon className="text-indigo-600" size={32} />
              <h3 className="font-semibold text-xl">
                {index === 0
                  ? "Fast Growth"
                  : index === 1
                  ? "Great Team"
                  : "Flexible Work"}
              </h3>
              <p className="text-gray-600">
                {index === 0 &&
                  "Learn rapidly, work on real projects, and grow your career faster."}
                {index === 1 &&
                  "Work with talented, supportive, and collaborative people."}
                {index === 2 &&
                  "Remote-friendly culture with a healthy work-life balance."}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="py-16 px-6 bg-gray-300">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800 text-center mb-12"
          >
            Open Positions
          </motion.h2>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border rounded-2xl p-6 flex flex-col md:flex-row 
                md:items-center md:justify-between gap-4 hover:shadow-lg transition"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Briefcase size={20} />
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {job.type}
                    </span>
                  </div>
                </div>

                <button
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl 
                  cursor-pointer font-semibold hover:bg-indigo-700 transition 
                  flex items-center gap-2"
                >
                  Apply Now
                  <Send size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE SECTION */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-indigo-50 rounded-3xl p-10 grid md:grid-cols-2 gap-10 items-center"
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">
              Our Culture & Values
            </h2>
            <p className="text-gray-600">
              We believe in transparency, continuous learning, and building
              products that make a difference.
            </p>

            <ul className="space-y-3">
              {["People-first mindset", "Ownership & responsibility", "Continuous improvement"].map(
                (text, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <Heart className="text-indigo-600" size={18} />
                    {text}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="text-center">
            <img
              src="https://illustrations.popsy.co/gray/work-from-home.svg"
              alt="Career Illustration"
              className="max-w-sm mx-auto"
            />
          </div>
        </motion.div>
      </section>

      <GuestWelcomeList />
        <Footer />

    </div>
  );
};

export default CareerPage;
