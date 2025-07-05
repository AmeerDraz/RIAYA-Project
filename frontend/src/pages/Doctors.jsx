import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./../context/AppContext";
import Loader from "../components/Loader";
import { assets } from "../assets/assets";

const Doctors = () => {
    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    const { doctors, currencySymbol } = useContext(AppContext);

    const specialities = [
        { name: "General physician", icon: "👨‍⚕️", description: "Primary care and general health" },
        { name: "Gynecologist", icon: "👩‍⚕️", description: "Women's health and reproductive care" },
        { name: "Dermatologist", icon: "🔬", description: "Skin, hair, and nail conditions" },
        { name: "Pediatricians", icon: "👶", description: "Child and adolescent healthcare" },
        { name: "Neurologist", icon: "🧠", description: "Brain and nervous system disorders" },
        { name: "Gastroenterologist", icon: "🩺", description: "Digestive system and gut health" }
    ];

    const applyFilter = () => {
        setLoading(true);
        let filtered = doctors;

        // Filter by speciality
        if (speciality) {
            filtered = filtered.filter((doc) => doc.speciality === speciality);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter((doc) =>
                doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilterDoc(filtered);
        setLoading(false);
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality, searchTerm]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Find Your Perfect Doctor
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Browse through our extensive network of qualified healthcare specialists. 
                        Find the right doctor for your specific health needs and book appointments with ease.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search doctors by name or speciality..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-4 pl-12 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row items-start gap-6">
                        {/* Mobile Filter Toggle */}
                        <button
                            className={`lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                                showFilter ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"
                            }`}
                            onClick={() => setShowFilter((prev) => !prev)}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filters
                        </button>

                        {/* Speciality Filters */}
                        <div className={`w-full lg:w-80 ${showFilter ? "block" : "hidden lg:block"}`}>
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialities</h3>
                                <div className="space-y-3">
                                    {specialities.map((spec) => (
                                        <button
                                            key={spec.name}
                                            onClick={() =>
                                                speciality === spec.name
                                                    ? navigate("/doctors")
                                                    : navigate(`/doctors/${spec.name}`)
                                            }
                                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                                                speciality === spec.name
                                                    ? "bg-blue-50 border-2 border-blue-200 text-blue-900"
                                                    : "bg-gray-50 border-2 border-transparent hover:bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            <span className="text-2xl">{spec.icon}</span>
                                            <div>
                                                <p className="font-medium">{spec.name}</p>
                                                <p className="text-xs text-gray-500">{spec.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Clear Filters */}
                                {speciality && (
                                    <button
                                        onClick={() => navigate("/doctors")}
                                        className="w-full mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="flex-1">
                            {/* Results Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {speciality ? `${speciality} Doctors` : "All Doctors"}
                                    </h2>
                                    <p className="text-gray-600">
                                        {filterDoc.length} doctor{filterDoc.length !== 1 ? 's' : ''} found
                                    </p>
                                </div>
                                {filterDoc.length > 0 && (
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Verified Professionals
                                    </div>
                                )}
                            </div>

                            {/* Doctors Grid */}
                            {filterDoc.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Doctors Found</h3>
                                    <p className="text-gray-600 mb-4">
                                        {searchTerm 
                                            ? `No doctors found matching "${searchTerm}"`
                                            : "No doctors available in this speciality."
                                        }
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            navigate("/doctors");
                                        }}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Clear Search
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filterDoc.map((item, index) => (
                                        <div
                                            onClick={() => navigate(`/appointment/${item._id}`)}
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Doctors;
