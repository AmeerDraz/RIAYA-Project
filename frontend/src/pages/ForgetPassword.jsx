import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const onForgetPasswordSubmit = async (event) => {
        event.preventDefault();
        console.log("Password reset requested for:", email);
        alert(
            "A password reset link has been sent to your email (for demo purposes)."
        );
        // Optionally navigate to OTP page or back to Login after submission
        navigate("/login");
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Content */}
            <div className="flex flex-1 items-center justify-center p-8">
                <div className="flex w-full max-w-5xl items-center">
                    {/* Left Side - Image */}
                    <div className="hidden md:block w-1/2">
                        <img
                            src={assets.forgetPassword}
                            alt=""
                            className="w-full max-w-[450px] md:max-w-[600px] lg:max-w-[700px] h-auto"
                        />
                    </div>

                    {/* Right Side - Forget Password Form */}
                    <form
                        onSubmit={onForgetPasswordSubmit}
                        className="w-full md:w-1/2 flex items-center justify-center"
                    >
                        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                            <p className="text-2xl font-semibold">
                                Forget Password
                            </p>
                            <p>
                                Please enter your email to reset your password
                            </p>
                            <div className="w-full">
                                <p>Email</p>
                                <input
                                    className="border border-zinc-300 rounded w-full p-2 mt-1"
                                    type="email"
                                    placeholder="email@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            <button
                                className="bg-primary text-white w-full py-2 rounded-md text-base"
                                type="submit"
                            >
                                Send Reset Link
                            </button>
                            <p>
                                Back to{" "}
                                <span
                                    onClick={() => navigate("/login")}
                                    className="text-primary cursor-pointer underline"
                                >
                                    Login
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
