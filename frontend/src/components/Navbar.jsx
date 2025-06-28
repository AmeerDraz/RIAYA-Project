import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
    const navigate = useNavigate();

    const { token, setToken, userData } = useContext(AppContext);

    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken(false);
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex items-center justify-between text-sm pt-4 pb-2 mb-5 border-b border-gray-300 px-4 sm:px-6 md:px-12">
            {/* Logo */}
            <img
                onClick={() => navigate("/")}
                className="w-32 sm:w-40 md:w-44 cursor-pointer"
                src={assets.logo}
                alt="Logo"
            />

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-start gap-5 font-medium px-5">
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <li className="py-1 text-sm">HOME</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-[.active]:block" />
                </NavLink>
                <NavLink
                    to="/doctors"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <li className="py-1 text-sm">ALL DOCTORS</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-[.active]:block" />
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <li className="py-1 text-sm">ABOUT</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-[.active]:block" />
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) => (isActive ? "active" : "")}
                >
                    <li className="py-1 text-sm">CONTACT</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden group-[.active]:block" />
                </NavLink>
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={() => setShowMenu(!showMenu)}>
                    {showMenu ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {showMenu && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-30 md:hidden">
                    <div className="bg-white w-3/4 max-w-xs h-full p-6 flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                            <img
                                onClick={() => navigate("/")}
                                className="w-32 cursor-pointer"
                                src={assets.logo}
                                alt="Logo"
                            />
                            <button onClick={() => setShowMenu(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <ul className="flex flex-col gap-4 font-medium">
                            <NavLink to="/" onClick={() => setShowMenu(false)}>
                                <p className="px-4 py-2 rounded-[6px] inline-block">
                                    HOME
                                </p>
                            </NavLink>
                            <NavLink
                                to="/doctors"
                                onClick={() => setShowMenu(false)}
                            >
                                <p className="px-4 py-2 rounded-[6px] inline-block">
                                    ALL DOCTORS
                                </p>
                            </NavLink>
                            <NavLink
                                to="/about"
                                onClick={() => setShowMenu(false)}
                            >
                                <p className="px-4 py-2 rounded-[6px] inline-block">
                                    ABOUT
                                </p>
                            </NavLink>
                            <NavLink
                                to="/contact"
                                onClick={() => setShowMenu(false)}
                            >
                                <p className="px-4 py-2 rounded-[6px] inline-block">
                                    CONTACT
                                </p>
                            </NavLink>

                            <hr class="border-1 border-gray-300" />
                        </ul>
                        {token ? (
                            <div className="flex flex-col gap-4">
                                <p
                                    onClick={() => {
                                        navigate("my-profile");
                                        setShowMenu(false);
                                    }}
                                    className="hover:text-primary cursor-pointer"
                                >
                                    My Profile
                                </p>
                                <p
                                    onClick={() => {
                                        navigate("my-appointments");
                                        setShowMenu(false);
                                    }}
                                    className="hover:text-primary cursor-pointer"
                                >
                                    My Appointments
                                </p>
                                <p
                                    onClick={() => {
                                        setToken(false);
                                        setShowMenu(false);
                                    }}
                                    className="hover:text-primary cursor-pointer"
                                >
                                    Logout
                                </p>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    navigate("/login");
                                    setShowMenu(false);
                                }}
                                className="bg-primary text-white px-6 py-2 rounded-[6px] font-light"
                            >
                                Create account
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Desktop Profile/Login */}
            <div className="hidden md:block">
                {token ? (
                    <div className="flex items-center gap-2 cursor-pointer group relative">
                        <img
                            className="w-8 rounded-full"
                            src={userData.image}
                            alt="Profile"
                        />
                        <img
                            className="w-2.5"
                            src={assets.dropdown_icon}
                            alt="Dropdown"
                        />
                        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                            <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                                <p
                                    onClick={() => navigate("my-profile")}
                                    className="hover:text-black cursor-pointer"
                                >
                                    My Profile
                                </p>
                                <p
                                    onClick={() => navigate("my-appointments")}
                                    className="hover:text-black cursor-pointer"
                                >
                                    My Appointments
                                </p>
                                <p
                                    onClick={logout}
                                    className="hover:text-black cursor-pointer"
                                >
                                    Logout
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-primary text-white px-8 py-3 rounded-[6px] font-light"
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
