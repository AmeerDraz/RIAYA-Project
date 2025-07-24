

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
    const { doctors, currencySymbol } = useContext(AppContext);
    const navigate = useNavigate();

    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter(
                (doc) => doc.speciality === speciality && doc._id !== docId
            );
            setRelDoc(doctorsData);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className="flex flex-col items-center gap-4 my-10 text-gray-900 px-4 sm:px-6 lg:px-10">
            <h1 className="text-2xl sm:text-3xl font-medium text-center">
                Related Doctors
            </h1>
            <p className="text-center text-sm max-w-md">
                Simply browse through our extensive list of trusted doctors.
            </p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6">
                {relDoc.slice(0, 5).map((item, index) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            scrollTo(0, 0);
                        }}
                        className="border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500"
                        key={index}
                    >
                        <img
                            className="bg-green-50 h-48 w-full object-cover object-top"
                            src={item.image}
                            alt={item.name}
                            onError={(e) => {
                                e.target.src = "/default-doctor.png"; // صورة افتراضية في حال الخطأ
                            }}
                        />
                        <div className="p-4">
                            <div
                                className={`flex items-center gap-2 text-sm mb-2 ${
                                    item.available
                                        ? "text-green-500"
                                        : "text-gray-500"
                                }`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full ${
                                        item.available
                                            ? "bg-green-500"
                                            : "bg-gray-500"
                                    }`}
                                ></span>
                                <span>
                                    {item.available
                                        ? "Available"
                                        : "Not Available"}
                                </span>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-gray-900 text-base font-semibold">
                                        {item.name}
                                    </p>
                                    <p className="text-gray-600 text-sm">
                                        {item.speciality}
                                    </p>
                                </div>
                                <p className="text-sm font-bold text-green-500 whitespace-nowrap">
                                    {currencySymbol} {item.fees}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate("/doctors");
                    scrollTo(0, 0);
                }}
                className="bg-green-50 text-gray-700 hover:bg-green-100 px-8 py-2 rounded-md mt-8 text-sm sm:text-base transition-colors"
            >
                View More
            </button>
        </div>
    );
};

export default RelatedDoctors;
