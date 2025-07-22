// import React, { useContext, useEffect, useState } from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//     const { backendUrl, token, setToken } = useContext(AppContext);
//     const navigate = useNavigate();

//     const [state, setState] = useState("Login"); // ✅ خلي الوضع الافتراضي على Login

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState("");

//     const onSubmitHandler = async (event) => {
//         event.preventDefault();
//         try {
//             if (state === "Sign Up") {
//                 const { data } = await axios.post(
//                     backendUrl + "/api/user/register",
//                     { name, password, email }
//                 );
//                 if (data.success) {
//                     localStorage.setItem("token", data.token);
//                     setToken(data.token);
//                     toast.success("Account created successfully!");
//                     navigate("/my-profile");
//                 } else {
//                     toast.error(data.message);
//                 }
//             } else {
//                 const { data } = await axios.post(
//                     backendUrl + "/api/user/login",
//                     { password, email }
//                 );
//                 if (data.success) {
//                     localStorage.setItem("token", data.token);
//                     setToken(data.token);
//                     toast.success("Login successful!");
//                 } else {
//                     toast.error(data.message);
//                 }
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     // ✅ هنا التعديل المهم: لازم تراقب token
//     useEffect(() => {
//         if (token) {
//             navigate("/");
//         }
//     }, [token]);

//     return (
//         <div className="flex flex-col min-h-screen">
//             {/* Main Content */}
//             <div className="flex flex-1 items-center justify-center p-8">
//                 <div className="flex w-full max-w-5xl items-center">
//                     {/* Left Side - Image */}
//                     <div className="hidden md:block w-1/2">
//                         <img
//                             src={assets.loginImg}
//                             alt="Login"
//                             className="w-full max-w-[450px] md:max-w-[600px] lg:max-w-[700px] h-auto"
//                         />
//                     </div>

//                     {/* Right Side - Login / Sign Up Form */}
//                     <form
//                         onSubmit={onSubmitHandler}
//                         className="w-full md:w-1/2 flex items-center justify-center"
//                     >
//                         <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
//                             <p className="text-2xl font-semibold">
//                                 {state === "Sign Up"
//                                     ? "Create Account"
//                                     : "Login"}
//                             </p>
//                             <p>
//                                 Please{" "}
//                                 {state === "Sign Up" ? "sign up" : "log in"} to
//                                 book appointment
//                             </p>

//                             {state === "Sign Up" && (
//                                 <div className="w-full">
//                                     <p>Full Name</p>
//                                     <input
//                                         className="border border-zinc-300 rounded w-full p-2 mt-1"
//                                         type="text"
//                                         placeholder="Enter Your Name"
//                                         onChange={(e) =>
//                                             setName(e.target.value)
//                                         }
//                                         value={name}
//                                     />
//                                 </div>
//                             )}

//                             <div className="w-full">
//                                 <p>Email</p>
//                                 <input
//                                     className="border border-zinc-300 rounded w-full p-2 mt-1"
//                                     type="email"
//                                     placeholder="email@example.com"
//                                     onChange={(e) => setEmail(e.target.value)}
//                                     value={email}
//                                 />
//                             </div>

//                             <div className="w-full">
//                                 <p>Password</p>
//                                 <input
//                                     className="border border-zinc-300 rounded w-full p-2 mt-1"
//                                     type="password"
//                                     placeholder="••••••••"
//                                     onChange={(e) =>
//                                         setPassword(e.target.value)
//                                     }
//                                     value={password}
//                                 />
//                             </div>

//                             <button
//                                 className="bg-primary text-white w-full py-2 rounded-md text-base"
//                                 type="submit"
//                             >
//                                 {state === "Sign Up"
//                                     ? "Create Account"
//                                     : "Login"}
//                             </button>

//                             {state === "Login" && (
//                                 <p
//                                     className="text-right w-full text-primary cursor-pointer underline"
//                                     onClick={() => navigate("/forget-password")}
//                                 >
//                                     Forget Password?
//                                 </p>
//                             )}

//                             {state === "Sign Up" ? (
//                                 <p>
//                                     Already have an account?
//                                     <span
//                                         onClick={() => setState("Login")}
//                                         className="text-primary cursor-pointer underline"
//                                     >
//                                         Login here
//                                     </span>
//                                 </p>
//                             ) : (
//                                 <p>
//                                     Create a new account?{" "}
//                                     <span
//                                         onClick={() => setState("Sign Up")}
//                                         className="text-primary cursor-pointer underline"
//                                     >
//                                         Click here
//                                     </span>
//                                 </p>
//                             )}
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader"; // تأكد من المسار الصحيح

const Login = () => {
    const { backendUrl, token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [state, setState] = useState("Login"); // الوضع الافتراضي
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false); // حالة اللودر

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true); // بدء اللودر
        try {
            if (state === "Sign Up") {
                const { data } = await axios.post(
                    backendUrl + "/api/user/register",
                    {
                        name,
                        password,
                        email,
                    }
                );
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    setToken(data.token);
                    toast.success("Account created successfully!");
                    navigate("/my-profile");
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(
                    backendUrl + "/api/user/login",
                    {
                        password,
                        email,
                    }
                );
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    setToken(data.token);
                    toast.success("Login successful!");
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false); // إيقاف اللودر
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Main Content */}
            <div className="flex flex-1 items-center justify-center p-8">
                <div className="flex w-full max-w-5xl items-center">
                    {/* Left Side - Image */}
                    <div className="hidden md:block w-1/2">
                        <img
                            src={assets.loginImg}
                            alt="Login"
                            className="w-full max-w-[450px] md:max-w-[600px] lg:max-w-[700px] h-auto"
                        />
                    </div>

                    {/* Right Side - Login / Sign Up Form */}
                    <form
                        onSubmit={onSubmitHandler}
                        className="w-full md:w-1/2 flex items-center justify-center"
                    >
                        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                            <p className="text-2xl font-semibold">
                                {state === "Sign Up"
                                    ? "Create Account"
                                    : "Login"}
                            </p>
                            <p>
                                Please
                                {state === "Sign Up" ? "sign up" : "log in"} to
                                book appointment
                            </p>
                            {state === "Sign Up" && (
                                <div className="w-full">
                                    <p>Full Name</p>
                                    <input
                                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                                        type="text"
                                        placeholder="Enter Your Name"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        value={name}
                                    />
                                </div>
                            )}

                            <div className="w-full">
                                <p>Email</p>
                                {state === "Sign Up" ? (
                                    <input
                                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                                        type="email"
                                        placeholder="Enter a valid and real email"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                    />
                                ) : (
                                    <input
                                        className="border border-zinc-300 rounded w-full p-2 mt-1"
                                        type="email"
                                        placeholder="email@example.com"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                    />
                                )}
                            </div>

                            <div className="w-full">
                                <p>Password</p>
                                <input
                                    className="border border-zinc-300 rounded w-full p-2 mt-1"
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                />
                            </div>

                            <button
                                className="bg-primary text-white w-full py-2 rounded-md text-base"
                                type="submit"
                            >
                                {state === "Sign Up"
                                    ? "Create Account"
                                    : "Login"}
                            </button>

                            {state === "Login" && (
                                <p
                                    className="text-right w-full text-primary cursor-pointer underline"
                                    onClick={() => navigate("/forget-password")}
                                >
                                    Forget Password?
                                </p>
                            )}

                            {state === "Sign Up" ? (
                                <p>
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => setState("Login")}
                                        className="text-primary cursor-pointer underline"
                                    >
                                        Login here
                                    </span>
                                </p>
                            ) : (
                                <p>
                                    Create a new account?{" "}
                                    <span
                                        onClick={() => setState("Sign Up")}
                                        className="text-primary cursor-pointer underline"
                                    >
                                        Click here
                                    </span>
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
