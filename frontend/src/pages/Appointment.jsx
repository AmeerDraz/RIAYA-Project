import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";

const Appointment = () => {
    const { docId } = useParams();
    const { currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
    const navigate = useNavigate();

    const [docInfo, setDocInfo] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [error, setError] = useState(null);

    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Fetch doctor info and available slots
    const fetchDoctorData = async () => {
        try {
            setLoadingSlots(true);
            setError(null);
            
            if (!docId) {
                setError('No doctor ID provided');
                return;
            }

            const response = await axios.get(
                `${backendUrl}/api/user/doctor/${docId}/available-slots`
            );

            const { data } = response;

            if (data.success) {
                setDocInfo(data.doctorInfo);
                setAvailableSlots(data.slots);
            } else {
                setError(data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching doctor data:', error);
            setError(error.response?.data?.message || 'Failed to load doctor information');
            toast.error("Failed to load doctor information");
        } finally {
            setLoadingSlots(false);
        }
    };

    // Book appointment
    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Please login to book an appointment.");
            return navigate("/login");
        }

        if (selectedDay === null) {
            toast.error("Please select a day for the appointment.");
            return;
        }

        if (!selectedTime) {
            toast.error("Please select a time for the appointment.");
            return;
        }

        setLoading(true);

        try {
            const selectedSlot = availableSlots[selectedDay].find(slot => slot.time === selectedTime);
            if (!selectedSlot) {
                toast.error("Selected slot is no longer available.");
                return;
            }

            const date = selectedSlot.date;
            
            // Ensure date is a Date object
            const dateObj = date instanceof Date ? date : new Date(date);
            
            // Check if date is valid
            if (isNaN(dateObj.getTime())) {
                toast.error("Invalid date selected.");
                return;
            }
            
            let day = dateObj.getDate();
            let month = dateObj.getMonth() + 1;
            let year = dateObj.getFullYear();
            const slotDate = `${day}_${month}_${year}`;

            const { data } = await axios.post(
                `${backendUrl}/api/user/book-Appointment`,
                { docId, slotDate, slotTime: selectedTime },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                await getDoctorsData(); // Refresh doctors data
                navigate("/my-appointments");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            toast.error(error.response?.data?.message || "Failed to book appointment.");
        } finally {
            setLoading(false);
        }
    };

    // Get day name from date
    const getDayName = (date) => {
        // Ensure date is a Date object
        const dateObj = date instanceof Date ? date : new Date(date);
        
        // Check if date is valid
        if (isNaN(dateObj.getTime())) {
            return "Invalid Date";
        }
        
        return dayNames[dateObj.getDay()];
    };

    // Format date for display
    const formatDate = (date) => {
        // Ensure date is a Date object
        const dateObj = date instanceof Date ? date : new Date(date);
        
        // Check if date is valid
        if (isNaN(dateObj.getTime())) {
            return "Invalid Date";
        }
        
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        }).format(dateObj);
    };

    useEffect(() => {
        fetchDoctorData();
    }, [docId]);

    if (loadingSlots) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Doctor</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <div className="space-y-2">
                        <button 
                            onClick={() => navigate('/doctors')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
                        >
                            Back to Doctors
                        </button>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!docInfo) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Doctor Not Found</h2>
                    <p className="text-gray-600 mb-4">The doctor you're looking for doesn't exist.</p>
                    <button 
                        onClick={() => navigate('/doctors')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to Doctors
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {loading && <Loader />}
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Doctor Details */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                        <div className="md:flex">
                            <div className="md:w-1/3">
                                <img
                                    className="w-full h-64 md:h-full object-cover"
                                    src={docInfo.image && docInfo.image.trim() !== "" ? docInfo.image : assets.doctor_icon}
                                    alt={docInfo.name}
                                    onError={(e) => {
                                        e.target.src = assets.doctor_icon;
                                    }}
                                />
                            </div>
                            <div className="md:w-2/3 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {docInfo.name}
                                    </h1>
                                    <img
                                        className="w-6 h-6"
                                        src={assets.verified_icon}
                                        alt="Verified"
                                    />
                                </div>
                                
                                <div className="flex items-center gap-3 mb-4">
                                    <p className="text-lg text-gray-600">
                                        {docInfo.degree} - {docInfo.speciality}
                                    </p>
                                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                        {docInfo.experience} Years Experience
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {docInfo.about || "No information available about this doctor."}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Appointment Fee</p>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {currencySymbol} {docInfo.fees}
                                        </p>
                                    </div>
                                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                                        docInfo.available 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {docInfo.available ? 'Available' : 'Not Available'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h2>
                        
                        {availableSlots.every(day => day.length === 0) ? (
                            <div className="text-center py-8">
                                <div className="text-gray-500 mb-4">
                                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Available Slots</h3>
                                <p className="text-gray-600 mb-4">
                                    This doctor doesn't have any available appointment slots at the moment.
                                </p>
                                <p className="text-sm text-gray-500">
                                    Please check back later or contact the doctor directly.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Day Selection */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
                                    <div className="grid grid-cols-7 gap-3">
                                        {availableSlots.map((daySlots, index) => {
                                            if (daySlots.length === 0) return null;
                                            
                                            const firstSlot = daySlots[0];
                                            const date = firstSlot.date;
                                            
                                            // Ensure date is a Date object
                                            const dateObj = date instanceof Date ? date : new Date(date);
                                            
                                            // Check if date is valid
                                            if (isNaN(dateObj.getTime())) {
                                                return null;
                                            }
                                            
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        setSelectedDay(index);
                                                        setSelectedTime("");
                                                    }}
                                                    className={`p-4 rounded-lg border-2 transition-all ${
                                                        selectedDay === index
                                                            ? "border-blue-500 bg-blue-50 text-blue-700"
                                                            : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                >
                                                    <div className="text-center">
                                                        <p className="text-sm font-medium text-gray-600">
                                                            {getDayName(dateObj)}
                                                        </p>
                                                        <p className="text-lg font-bold">
                                                            {dateObj.getDate()}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {daySlots.length} slots
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Time Selection */}
                                {selectedDay !== null && availableSlots[selectedDay]?.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h3>
                                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                                            {availableSlots[selectedDay].map((slot, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedTime(slot.time)}
                                                    className={`p-3 rounded-lg border-2 transition-all ${
                                                        selectedTime === slot.time
                                                            ? "border-blue-500 bg-blue-500 text-white"
                                                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                    }`}
                                                >
                                                    <span className="text-sm font-medium">
                                                        {slot.time}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Booking Button */}
                                {selectedDay !== null && selectedTime && (
                                    <div className="border-t pt-6">
                                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                                            <h4 className="font-semibold text-blue-900 mb-2">Appointment Summary</h4>
                                            <div className="text-sm text-blue-800">
                                                <p><strong>Date:</strong> {formatDate(availableSlots[selectedDay][0].date)}</p>
                                                <p><strong>Time:</strong> {selectedTime}</p>
                                                <p><strong>Fee:</strong> {currencySymbol} {docInfo.fees}</p>
                                            </div>
                                        </div>
                                        
                                        <button
                                            onClick={bookAppointment}
                                            disabled={loading}
                                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? "Booking..." : "Confirm Appointment"}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Related Doctors */}
                    <RelatedDoctors
                        docId={docId}
                        speciality={docInfo.speciality}
                    />
                </div>
            </div>
        </>
    );
};

export default Appointment;
