import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

import { ToastContainer } from "react-toastify";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFaild from "./pages/PaymentFaild";

const App = () => {
    return (
        // <div className="mx-4 sm:mx-[10%]">
        <div className="flex justify-center">
            <div className="w-full max-w-[1440px] px-4 sm:px-8">
                <ToastContainer />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/doctors/:speciality" element={<Doctors />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/forget-password"
                        element={<ForgetPassword />}
                    />
                    <Route
                        path="/reset-password/:token"
                        element={<ResetPassword />}
                    />

                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route
                        path="/my-appointments"
                        element={<MyAppointments />}
                    />
                    <Route
                        path="/appointment/:docId"
                        element={<Appointment />}
                    />
                    <Route
                        path="/payment-success"
                        element={<PaymentSuccess />}
                    />
                    <Route path="/payment-failed" element={<PaymentFaild />} />
                </Routes>

                <Footer />
            </div>
        </div>
    );
};

export default App;
