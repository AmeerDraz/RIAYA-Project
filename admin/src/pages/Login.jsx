import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
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
            if (state === "Admin") {
                const { data } = await axios.post(
                    backendUrl + "/api/admin/login",
                    { email, password }
                );
                if (data.success) {
                    localStorage.setItem("aToken", data.token);
                    setAToken(data.token);
                                        toast.success(
                                            "Logged in successfully as Admin."
                                        );

                } else {
                    toast.error(data.message || "Invalid admin credentials.");
                }
            } else {
                const { data } = await axios.post(
                    backendUrl + "/api/doctor/login",
                    { email, password }
                );
                if (data.success) {
                    localStorage.setItem("dToken", data.token);
                    setDToken(data.token);
                                        toast.success(
                                            "Logged in successfully as Doctor."
                                        );

                } else {
                    toast.error(data.message || "Invalid doctor credentials.");
                }
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="h-[80vh] w-full max-w-6xl bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row transition-all duration-500">
                {/* Left side (Logo/Image) */}
                <div className="md:w-1/2 flex items-center justify-center bg-[#97D7CA] p-10 text-white flex-col">
                    <img
                        src={assets.admin_logo}
                        alt="Logo"
                        className="w-40 h-40 object-contain mb-6"
                    />
                    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-sm text-center">
                        Access your admin or doctor dashboard with ease.
                    </p>
                </div>

                {/* Right side (Login Form) */}
                <form
                    onSubmit={onSubmitHandler}
                    className="md:w-1/2 w-full p-10 flex items-center justify-center "
                >
                    <div className="w-full max-w-sm text-gray-700">
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            {state}{" "}
                            <span className="text-[#00BFA5]">Login</span>
                        </h2>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">
                                Email
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">
                                Password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#00BFA5] hover:bg-[#009e85] text-white py-2 rounded-lg font-semibold transition duration-300"
                        >
                            Login
                        </button>

                        <p className="text-sm text-center mt-4">
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
