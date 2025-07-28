
import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Login = () => {
    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const endpoint =
                state === "Admin" ? "/api/admin/login" : "/api/doctor/login";
            const { data } = await axios.post(backendUrl + endpoint, {
                email,
                password,
            });

            if (data.success) {
                const tokenKey = state === "Admin" ? "aToken" : "dToken";
                localStorage.setItem(tokenKey, data.token);
                state === "Admin"
                    ? setAToken(data.token)
                    : setDToken(data.token);
                toast.success(`Logged in successfully as ${state}.`);
            } else {
                toast.error(
                    data.message ||
                        `Invalid ${state.toLowerCase()} credentials.`
                );
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-gray-50">
            <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[85vh] md:min-h-[90vh] lg:min-h-[90vh] transition-all duration-500">
                {/* Left Side (Image & Welcome Text) */}
                <div className="w-full md:w-1/2 flex items-center justify-center bg-[#97D7CA] px-6 py-8 sm:px-10 sm:py-12 md:px-14 md:py-20 text-white flex-col">
                    <img
                        src={assets.admin_logo}
                        alt="Logo"
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain mb-4"
                    />
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-center">
                        Welcome Back
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-center">
                        Access your admin or doctor dashboard with ease.
                    </p>
                </div>

                {/* Right Side (Login Form) */}
                <form
                    onSubmit={onSubmitHandler}
                    className="w-full md:w-1/2 px-6 py-8 sm:px-10 sm:py-12 md:px-14 md:py-20 flex items-center justify-center"
                >
                    <div className="w-full max-w-sm text-gray-700">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center">
                            {state}{" "}
                            <span className="text-[#00BFA5]">Login</span>
                        </h2>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm sm:text-base">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA5] text-sm sm:text-base"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-sm sm:text-base">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA5] text-sm sm:text-base"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#00BFA5] hover:bg-[#009e85] text-white py-2 rounded-lg font-semibold transition duration-300 text-sm sm:text-base"
                        >
                            Login
                        </button>

                        <p className="text-xs sm:text-sm text-center mt-4">
                            {state === "Admin"
                                ? "Doctor Login?"
                                : "Admin Login?"}{" "}
                            <span
                                className="text-[#00BFA5] underline cursor-pointer"
                                onClick={() =>
                                    setState(
                                        state === "Admin" ? "Doctor" : "Admin"
                                    )
                                }
                            >
                                Click here
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
