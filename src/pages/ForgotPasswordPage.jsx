import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "../components/common/CustomButton";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSendCode = (e) => {
        e.preventDefault();

        console.log("Send reset code to:", email);
        alert("Reset code sent to your email (mock)");

        // move to step 2
        setStep(2);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        console.log({
            email,
            code,
            password,
        });

        alert("Password reset successful (mock)");

        // reset state
        setStep(1);
        setEmail("");
        setCode("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
    };

    const variants = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center bg-gray-600 px-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl font-bold text-center mb-2">
                                Forgot Password
                            </h2>
                            <p className="text-center text-gray-600 mb-6">
                                Enter your email to receive a reset code
                            </p>

                            <form onSubmit={handleSendCode} className="space-y-4">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                                <CustomButton text="Send Reset Code" />
                            </form>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                        >
                            <h2 className="text-4xl font-bold text-center mb-2">
                                Reset Password
                            </h2>
                            <p className="text-center text-gray-600 mb-6">
                                Enter code and new password
                            </p>

                            <form onSubmit={handleResetPassword} className="space-y-4">
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="6-digit code"
                                    className="w-full px-4 py-2 border rounded-lg text-center"
                                />

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="New password"
                                    className="w-full px-4 py-2 border rounded-lg"
                                />

                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    className="w-full px-4 py-2 border rounded-lg"
                                />

                                <CustomButton text="Reset Password" />
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.section>
    );

};

export default ForgotPasswordPage;
