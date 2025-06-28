

import React from "react";
import { assets } from "../assets/assets";
import { Phone } from "lucide-react";
import { Users, CalendarCheck, BellRing, ClipboardList  } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="px-4 md:px-16 py-10 text-gray-700">
            {/* ABOUT US Header */}
            <div className="text-center text-2xl font-medium text-gray-500 mb-5">
                <p>
                    ABOUT <span className="text-gray-800 font-bold">US</span>
                </p>
            </div>

            {/* About Section Card */}
            <div className=" p-6 md:p-10 rounded-md flex flex-col md:flex-row items-center gap-8 bg-white">
                {/* Left Images Grid */}
                <div className="grid grid-cols-2 gap-4 w-full md:w-[40%]">
                    <img src={assets.about1img} alt="" className="rounded-md" />

                    <img
                        src={assets.about3img}
                        alt=""
                        className="rounded-md place-self-center"
                    />

                    <img src={assets.about2img} alt="" className="rounded-md" />
                </div>

                {/* Right Text */}
                <div className="w-full md:w-[60%] flex flex-col gap-4">
                    <h2 className="text-2xl font-bold leading-tight">
                        We Are Always Ensure Best Medical Treatment For Your
                        Health
                    </h2>
                    {/* {/* Plain Text Label */}
                    <span className="text-sm text-primary font-medium">
                        About Our Platform
                    </span>

                    <p className="text-sm text-gray-600">
                        We are an advanced platform designed to revolutionize
                        the way doctors and patients communicate and manage
                        appointments. With our seamless online booking system,
                        we aim to simplify the process of scheduling
                        appointments, with a user-friendly interface that allows
                        you to search for and book healthcare professionals
                        based on various criteria while providing effective
                        tools to physicians to streamline their processes and
                        manage their practices efficiently.
                    </p>
                    {/* Emergency Contact */}
                    <div className="flex items-center gap-3 mt-2">
                        {/* phone icon */}
                        <Phone className="text-green-600 w-4 h-4" />

                        <div>
                            <p className="text-sm text-gray-500">
                                Need Emergency?
                            </p>
                            <p className="font-semibold text-gray-700">
                                +970-59-235-2574
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="text-center text-2xl mt-10 mb-10 font-semibold text-gray-800">
                Why Choose <span className="text-primary">Us ?</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-[15px] mb-20">
                <div className="group bg-gray-100 border p-6 rounded-md hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                    <Users className="mx-auto mb-3 w-8 h-8 text-primary group-hover:text-white transition-all duration-300" />
                    <b>Qualified Staff of Doctors</b>
                    <p className="mt-2">
                        The platform contains the most qualified and experienced
                        doctors
                    </p>
                </div>

                <div className="group bg-gray-100 border p-6 rounded-md hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                    <CalendarCheck className="mx-auto mb-3 w-8 h-8 text-primary group-hover:text-white transition-all duration-300" />
                    <b>Easily book an appointment</b>
                    <p className="mt-2">
                        Lour easy booking system allows you to easily schedule
                        your appointment with just a few clicks
                    </p>
                </div>

                <div className="group bg-gray-100 border p-6 rounded-md hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                    <BellRing className="mx-auto mb-3 w-8 h-8 text-primary group-hover:text-white transition-all duration-300" />
                    <b>Appointment reminders</b>
                    <p className="mt-2">
                        Communicate directly with your patients, ensuring smooth
                        coordination It reduces no-shows
                    </p>
                </div>

                <div className="group bg-gray-100 border p-6 rounded-md hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
                    <ClipboardList className="mx-auto mb-3 w-8 h-8 text-primary group-hover:text-white transition-all duration-300" />
                    <b>Simplify operations</b>
                    <p className="mt-2">
                        provides a central hub where you can easily manage your
                        appointments, view patient details, and optimize your
                        schedule.
                    </p>
                </div>
            </div>

            {/* ****************************** */}
            {/* ---------------About Banner------------------ */}
            <div className="flex flex-row-reverse bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-10 w-full">
                {/* ---------------Right Side (Now image) ----------------------- */}
                <div className="hidden bg-re md:block md:w-1/2 lg:w-[370px] relative">
                    <img
                        className="w-full absolute bottom-0 right-0 max-w-md"
                        src={assets.aboutBannerImg}
                        alt="Riaya Healthcare Professional"
                    />
                </div>

                {/* ---------------Left Side (Now text) ----------------------- */}
                <div className="flex-1 py-8 sm:py-8 md:py-8 lg:py-6 lg:pl-12">
                    <div className="text-l sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
                        <p>Be on Your Way to Feeling</p>
                        <p className="mt-4">Better with the Riaya</p>
                    </div>
                    <p className="text-white mt-5 max-w-[500px] ">
                        The best solution is offered to you, to earn the best
                        services and to facilitate all booking operations
                    </p>
                    <button
                        onClick={() => {
                            navigate("/contact");
                            scrollTo(0, 0);
                        }}
                        className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-[6px] mt-6 hover:scale-105 transition-all"
                    >
                        Contact With Us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
