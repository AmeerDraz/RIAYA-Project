

import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const onForgetPasswordSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:4000/api/user/forgot-password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert(
                    data.message ||
                        "A password reset link has been sent to your email."
                );
                navigate("/login");
            } else {
                alert(
                    data.message || "Something went wrong. Please try again."
                );
            }
        } catch (error) {
            console.error("Error sending reset request:", error);
            alert("Network error. Please try again later.");
        }
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
                            alt="Forget Password"
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
                                    required
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
