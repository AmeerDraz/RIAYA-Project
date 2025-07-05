import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { assets } from '../../assets/assets';

const ViewDoctor = () => {
    console.log("ViewDoctor component is rendering...");
    
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const { getDoctorById, backendUrl, updateDoctorWorkingHours } = useContext(AdminContext);
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [workingHours, setWorkingHours] = useState({});
    const [slotDuration, setSlotDuration] = useState(30);
    const [saving, setSaving] = useState(false);

    console.log("ViewDoctor - doctorId:", doctorId);
    console.log("ViewDoctor - getDoctorById function:", !!getDoctorById);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                setLoading(true);
                const doctorData = await getDoctorById(doctorId);
                if (doctorData.success) {
                    setDoctor(doctorData.doctor);
                    setWorkingHours(doctorData.doctor.workingHours || {});
                    setSlotDuration(doctorData.doctor.slotDuration || 30);
                } else {
                    toast.error(doctorData.message);
                    navigate('/doctors-list');
                }
            } catch (error) {
                console.error("Error fetching doctor:", error);
                toast.error("Failed to load doctor data");
            } finally {
                setLoading(false);
            }
        };

        if (doctorId) {
            fetchDoctor();
        }
    }, [doctorId, getDoctorById, navigate]);

    const handleWorkingHoursChange = (day, field, value) => {
        setWorkingHours(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [field]: value
            }
        }));
    };

    const handleSaveWorkingHours = async () => {
        try {
            setSaving(true);
            const data = await updateDoctorWorkingHours(doctorId, workingHours, slotDuration);
            if (data.success) {
                toast.success('Working hours updated successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error updating working hours:', error);
            toast.error('Failed to update working hours');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!doctor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Doctor Not Found</h2>
                    <p className="text-gray-600 mb-4">The doctor you're looking for doesn't exist.</p>
                    <button 
                        onClick={() => navigate('/doctors-list')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to Doctors List
                    </button>
                </div>
            </div>
        );
    }

    const days = [
        { key: "SUN", label: "Sunday" },
        { key: "MON", label: "Monday" },
        { key: "TUE", label: "Tuesday" },
        { key: "WED", label: "Wednesday" },
        { key: "THU", label: "Thursday" },
        { key: "FRI", label: "Friday" },
        { key: "SAT", label: "Saturday" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Doctor Profile</h1>
                            <p className="text-gray-600">View doctor information and working hours</p>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => navigate(`/edit-doctor/${doctorId}`)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Edit Doctor
                            </button>
                            <button
                                onClick={() => navigate('/doctors-list')}
                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back to List
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Information */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {/* Profile Image */}
                            <div className="text-center mb-6">
                                <img
                                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-100"
                                    src={doctor.image || assets.doctor_icon}
                                    alt={doctor.name || "Doctor"}
                                    onError={(e) => {
                                        e.target.src = assets.doctor_icon;
                                    }}
                                />
                            </div>

                            {/* Basic Info */}
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {doctor.name}
                                    </h2>
                                    <p className="text-gray-600">
                                        {doctor.degree} - {doctor.speciality}
                                    </p>
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                                        {doctor.experience} Experience
                                    </span>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">About</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {doctor.about || "No description available"}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">Appointment Fee</h3>
                                    <div className="flex items-center">
                                        <span className="text-lg font-semibold text-blue-600">
                                            ₹ {doctor.fees}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">Address</h3>
                                    <p className="text-sm text-gray-600">
                                        {doctor.address?.line1 || "No address available"}
                                        {doctor.address?.line2 && (
                                            <>
                                                <br />
                                                {doctor.address.line2}
                                            </>
                                        )}
                                    </p>
                                </div>

                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-2 ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {doctor.available ? 'Available for appointments' : 'Not available for appointments'}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">Contact</h3>
                                    <p className="text-sm text-gray-600">
                                        Email: {doctor.email}<br />
                                        Phone: {doctor.phone || "Not provided"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Working Hours */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">Working Hours</h2>
                                    <p className="text-gray-600">Doctor's availability schedule</p>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Slot Duration: {slotDuration} minutes
                                </div>
                            </div>

                            <div className="space-y-3">
                                {days.map(({ key, label }) => {
                                    const daySchedule = workingHours[key];
                                    const isEnabled = daySchedule?.enabled;
                                    
                                    return (
                                        <div
                                            key={key}
                                            className={`flex items-center justify-between p-4 border rounded-lg ${
                                                isEnabled 
                                                    ? 'border-green-200 bg-green-50' 
                                                    : 'border-gray-200 bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-4 h-4 rounded-full ${
                                                    isEnabled ? 'bg-green-500' : 'bg-gray-300'
                                                }`}></div>
                                                <span className="font-medium text-gray-800">{label}</span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {isEnabled ? (
                                                    <span>
                                                        {daySchedule.from} - {daySchedule.to}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">Not available</span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Summary */}
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-medium text-blue-800 mb-2">Working Hours Summary</h3>
                                <div className="text-sm text-blue-700">
                                    {Object.values(workingHours || {}).filter(day => day.enabled).length} out of 7 days available
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Working Hours Management */}
                <div className="mt-6 pt-6 border-t">
                    <button
                        onClick={handleSaveWorkingHours}
                        disabled={saving}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Saving...' : 'Save Working Hours'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewDoctor; 