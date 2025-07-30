import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <div className=" mb-2 mt-10 rounded-[5px] border-0 border-t-2">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 pb-4 text-sm px-2 pt-3 w-full">
                {/* -------------------Left Section------------------------- */}
                <div>
                    <img className="mb-5 w-40" src={assets.logo} alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6">
                        We are an advanced platform designed to revolutionize
                        the way doctors and patients communicate and manage
                        appointments.
                    </p>
                </div>
                {/* -------------------Center Section------------------------- */}
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                {/* -------------------Right Section------------------------- */}
                <div>
                    <p className="text-xl font-medium mb-5">Contact Us</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Palestine , Gaza City , Al-basha Street ,18</li>
                        <li>+972597661558</li>
                        <li>info@riaya.com</li>
                    </ul>
                </div>
            </div>
            <div>
                {/* ------------ copyright Text ------------- */}
                <hr />
                <div className="flex items-center text-sm justify-between text-gray-600 px-5 pt-5 pb-1 w-full">
                    <p>© 2025 Riaya. All rights reserved.</p>
                    <p>Terms and Conditions | Policy</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
