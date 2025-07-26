
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./../context/AppContext";
import Loader from "../components/Loader"; // تأكد يكون موجود عندك

const Doctors = () => {
    const { speciality } = useParams();

    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");


    const navigate = useNavigate();
    const { doctors, currencySymbol } = useContext(AppContext);



    const applyFilter = () => {
        setLoading(true);
        let filtered = doctors;

        // Filter by speciality
        if (speciality) {
            filtered = filtered.filter((doc) => doc.speciality === speciality);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(
                (doc) =>
                    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    doc.speciality
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        setFilterDoc(filtered);
        setLoading(false);
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality, searchTerm]);



    return (
        <div>
            {/* <p className="text-gray-600">
                Browse through the doctors specialist.
            </p> */}

            {/* Header Section */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Find Your Perfect Doctor
                </h1>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Browse through our extensive network of qualified healthcare
                    specialists. Find the right doctor for your specific health
                    needs and book appointments with ease.
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
                            className="w-full px-6 py-2 pl-12 text-lg border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-green-300 focus:border-transparent transition-all duration-200 outline-none"
                        />
                        <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                <button
                    className={`py-1 px-3 border rounded-[6px] text-sm transition-all sm:hidden ${
                        showFilter ? "bg-primary text-white" : ""
                    }`}
                    onClick={() => setShowFilter((prev) => !prev)}
                >
                    Filters
                </button>
                <div
                    className={` flex flex-col gap-4 text-sm text-gray-600 ${
                        showFilter ? "flex" : "hidden sm:flex"
                    }`}
                >
                    <p
                        onClick={() =>
                            speciality === "General physician"
                                ? navigate("/doctors")
                                : navigate("/doctors/General physician")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "General physician"
                                ? "bg-teal-100 text-black"
                                : ""
                        }`}
                    >
                        General physician
                    </p>
                    <p
                        onClick={() =>
                            speciality === "Gynecologist"
                                ? navigate("/doctors")
                                : navigate("/doctors/Gynecologist")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Gynecologist"
                                ? "bg-teal-100 text-black"
                                : ""
                        } `}
                    >
                        Gynecologist
                    </p>
                    <p
                        onClick={() =>
                            speciality === "Dermatologist"
                                ? navigate("/doctors")
                                : navigate("/doctors/Dermatologist")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Dermatologist"
                                ? "bg-teal-100 text-black"
                                : ""
                        }`}
                    >
                        Dermatologist
                    </p>
                    <p
                        onClick={() =>
                            speciality === "Pediatricians"
                                ? navigate("/doctors")
                                : navigate("/doctors/Pediatricians")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Pediatricians"
                                ? "bg-teal-100 text-black"
                                : ""
                        }`}
                    >
                        Pediatricians
                    </p>
                    <p
                        onClick={() =>
                            speciality === "Neurologist"
                                ? navigate("/doctors")
                                : navigate("/doctors/Neurologist")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Neurologist"
                                ? "bg-teal-100 text-black"
                                : ""
                        }`}
                    >
                        Neurologist
                    </p>
                    <p
                        onClick={() =>
                            speciality === "Gastroenterologist"
                                ? navigate("/doctors")
                                : navigate("/doctors/Gastroenterologist")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Gastroenterologist"
                                ? "bg-teal-100 text-black"
                                : ""
                        }`}
                    >
                        Gastroenterologist
                    </p>
                </div>
                <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
                    {filterDoc.map((item, index) => (
                        <div
                            onClick={() => navigate(`/appointment/${item._id}`)}
                            className="border border-green-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                            key={index}
                        >
                            
                            <img
                                className="bg-green-50 w-full h-[220px] object-cover object-top rounded-t-xl"
                                src={item.image}
                                alt=""
                            />

                            <div className="p-4">
                                <div
                                    className={`flex items-center gap-2 text-sm text-center ${
                                        item.available
                                            ? "text-green-500"
                                            : "text-gray-500"
                                    } `}
                                >
                                    <p
                                        className={`w-2 h-2 ${
                                            item.available
                                                ? "bg-green-500"
                                                : "bg-gray-500"
                                        }  rounded-full`}
                                    ></p>
                                    <p>
                                        {item.available
                                            ? "Available"
                                            : "Not Available"}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-gray-900 text-lg font-medium">
                                            {item.name}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {item.speciality}
                                        </p>
                                    </div>

                                    <p className="text-lg font-bold text-green-500 ">
                                        {currencySymbol} {item.fees}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
