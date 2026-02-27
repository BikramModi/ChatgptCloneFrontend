import React from "react";
import {
  ShieldCheck,
  FileText,
  Lock,
  Users,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


import Footer from "../../components/landingComponents/Footer";
import GuestNavbar from "../../components/landingComponents/Navbar";
import GuestWelcomeList from "../../components/landingComponents/GuestWelcomeList";


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-indigo-300">

<GuestNavbar />

      {/* HEADER */}
      <section className="bg-indigo-600 text-white py-16 px-6 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute left-6 top-6 flex items-center gap-2
          text-white/90 hover:text-white transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          <ShieldCheck size={48} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-indigo-100 mt-3">
            Your privacy is important to us. This policy explains how we handle
            your personal data.
          </p>
        </motion.div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-6 max-w-5xl mx-auto space-y-12">
        {/* Intro */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FileText className="text-indigo-600" />
            Introduction
          </h2>
          <p className="text-gray-600 leading-relaxed">
            This Privacy Policy describes how we collect, use, and protect your
            information when you use our website and services. By accessing or
            using our platform, you agree to the terms outlined in this policy.
          </p>
        </motion.div>

        {/* Information Collection */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Users className="text-indigo-600" />
            Information We Collect
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may collect personal information such as your name, email
            address, contact details, and any other information you voluntarily
            provide. We also collect non-personal data such as browser type,
            device information, and usage statistics.
          </p>
        </motion.div>

        {/* Data Usage */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Globe className="text-indigo-600" />
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>To provide and improve our services</li>
            <li>To communicate with you regarding updates or support</li>
            <li>To ensure security and prevent fraudulent activities</li>
            <li>To comply with legal obligations</li>
          </ul>
        </motion.div>

        {/* Data Security */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Lock className="text-indigo-600" />
            Data Security
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We implement appropriate technical and organizational measures to
            protect your personal data against unauthorized access, alteration,
            disclosure, or destruction. However, no method of transmission over
            the internet is 100% secure.
          </p>
        </motion.div>

        {/* Third Parties */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" />
            Third-Party Services
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may use trusted third-party services to operate our platform.
            These services have access to your information only to perform tasks
            on our behalf and are obligated to keep it confidential.
          </p>
        </motion.div>

        {/* Updates */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <FileText className="text-indigo-600" />
            Changes to This Policy
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with an updated revision date. Continued use
            of our services indicates acceptance of the revised policy.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us at{" "}
            <span className="text-indigo-600 font-semibold">
              support@yourcompany.com
            </span>
            .
          </p>
        </motion.div>
      </section>

        <GuestWelcomeList />
        <Footer />

    </div>
  );
};

export default PrivacyPolicyPage;
