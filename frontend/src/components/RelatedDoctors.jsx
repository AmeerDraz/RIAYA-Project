import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const RelatedDoctors = ({ speciality, docId }) => {
    const { doctors, currencySymbol } = useContext(AppContext);
    const navigate = useNavigate();

    const [relDoc, setRelDoc] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter(
                (doc) => doc.speciality === speciality && doc._id !== docId
            );
            setRelDoc(doctorsData);
        }
        setLoading(false);
    }, [doctors, speciality, docId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center gap-4 my-10 text-gray-900 md:mx-10">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-64 mb-8"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (relDoc.length === 0) {
        return (
            <div className="flex flex-col items-center gap-4 my-10 text-gray-900 md:mx-10">
                <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Related Doctors</h3>
                    <p className="text-gray-600 mb-4">
                        No other doctors found in the same speciality.
                    </p>
                    <button
                        onClick={() => {
                            navigate("/doctors");
                            scrollTo(0, 0);
                        }}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Browse All Doctors
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10">
            {/* Header Section */}
            <div className="text-center max-w-2xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Related {speciality} Doctors
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Discover other qualified {speciality.toLowerCase()} specialists who can help with your healthcare needs.
                </p>
            </div>

            {/* Doctors Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
                {relDoc.slice(0, 8).map((item, index) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            scrollTo(0, 0);
                        }}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-200"
                        key={index}
                    >
                        {/* Doctor Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                src={item.image && item.image.trim() !== "" ? item.image : assets.doctor_icon}
                                alt={item.name}
                                onError={(e) => {
                                    e.target.src = assets.doctor_icon;
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            
                            {/* Availability Badge */}
                            <div className="absolute top-4 right-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    item.available 
                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                }`}>
                                    {item.available ? 'Available' : 'Unavailable'}
                                </span>
                            </div>

                            {/* Experience Badge */}
                            {item.experience && (
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                                        {item.experience} Years
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Doctor Info */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-blue-600 font-medium text-sm">
                                        {item.degree} - {item.speciality}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        className="w-5 h-5"
                                        src={assets.verified_icon}
                                        alt="Verified"
                                    />
                                </div>
                            </div>

                            {/* About Section */}
                            {item.about && (
                                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {item.about.length > 100 
                                        ? `${item.about.substring(0, 100)}...` 
                                        : item.about
                                    }
                                </p>
                            )}

                            {/* Fee and Action */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500">Appointment Fee</p>
                                    <p className="text-lg font-bold text-blue-600">
                                        {currencySymbol} {item.fees}
                                    </p>
                                </div>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors group-hover:scale-105">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            {relDoc.length > 8 && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => {
                            navigate("/doctors");
                            scrollTo(0, 0);
                        }}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        View All Doctors
                    </button>
                </div>
            )}

            {/* Speciality Filter */}
            <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">Looking for a different speciality?</p>
                <div className="flex flex-wrap justify-center gap-3">
                    {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
                        <button
                            key={spec}
                            onClick={() => {
                                navigate(`/doctors/${spec}`);
                                scrollTo(0, 0);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                spec === speciality
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {spec}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedDoctors;
