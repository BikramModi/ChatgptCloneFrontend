import React from "react";
import { Users, Target, Globe, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import GuestNavbar from "../../components/landingComponents/Navbar";
import Footer from "../../components/landingComponents/Footer";


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const AboutUsPage = () => {
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

      {/* Hero Section */}
      <section className="bg-linear-to-r from-indigo-600 to-purple-600 text-white py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About E-Shop 🛒
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Your one-stop online store for quality products, amazing deals, and fast delivery.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To provide customers with the most convenient and enjoyable online shopping experience,
            offering high-quality products at competitive prices with fast and reliable delivery.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <Target size={120} className="text-indigo-600" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="order-last md:order-0 flex justify-center md:justify-start"
        >
          <Globe size={120} className="text-purple-600" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To become the most trusted and beloved e-commerce platform, connecting millions of people
            with the products they love while delivering excellent customer service.
          </p>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-800 mb-12"
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Alice Johnson", role: "Founder & CEO" },
              { name: "Bob Smith", role: "Marketing Head" },
              { name: "Carol Lee", role: "Product Manager" },
              { name: "David Kim", role: "Customer Support Lead" },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:scale-105 transition-transform"
              >
                <Users size={48} className="text-indigo-600 mb-4" />
                <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12 text-center">
        {[{
          icon: <Heart size={36} className="text-red-500 mx-auto mb-4" />,
          title: "Customer First",
          text: "We prioritize our customers, ensuring satisfaction and a seamless shopping experience.",
        },{
          icon: <Globe size={36} className="text-purple-600 mx-auto mb-4" />,
          title: "Global Reach",
          text: "Delivering products across the nation with reliable shipping and tracking.",
        },{
          icon: <Target size={36} className="text-indigo-600 mx-auto mb-4" />,
          title: "Quality Products",
          text: "We carefully select products to ensure top quality and value for our customers.",
        }].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-indigo-50 rounded-2xl p-8 shadow hover:shadow-lg transition"
          >
            {item.icon}
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.text}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white py-16 text-center rounded-t-3xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join E-Shop Today!
          </h2>
          <p className="mb-6 opacity-90">
            Sign up now and start shopping from a wide variety of products.
          </p>
          <Link
            to="/register"
            className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      <Footer />

    </div>
  );
};

export default AboutUsPage;
