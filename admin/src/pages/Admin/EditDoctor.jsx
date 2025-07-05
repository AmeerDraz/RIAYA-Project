import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const EditDoctor = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const {
        getDoctorById,
        updateDoctorProfile,
        updateDoctorWorkingHours,
        backendUrl,
        aToken,
    } = useContext(AdminContext);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [doctor, setDoctor] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        speciality: "",
        degree: "",
        experience: "",
        about: "",
        fees: 0,
        available: true,
        address: {
            line1: "",
            line2: "",
        },
    });

    // Working hours state
    const [workingHours, setWorkingHours] = useState({
        SUN: { from: "09:00", to: "17:00", enabled: true },
        MON: { from: "09:00", to: "17:00", enabled: true },
        TUE: { from: "09:00", to: "17:00", enabled: true },
        WED: { from: "09:00", to: "17:00", enabled: true },
        THU: { from: "09:00", to: "17:00", enabled: true },
        FRI: { from: "09:00", to: "17:00", enabled: true },
        SAT: { from: "09:00", to: "17:00", enabled: true },
    });
    const [slotDuration, setSlotDuration] = useState(30);

    const days = [
        { key: "SUN", label: "Sunday" },
        { key: "MON", label: "Monday" },
        { key: "TUE", label: "Tuesday" },
        { key: "WED", label: "Wednesday" },
        { key: "THU", label: "Thursday" },
        { key: "FRI", label: "Friday" },
        { key: "SAT", label: "Saturday" },
    ];

    useEffect(() => {
        const fetchDoctor = async () => {
            if (!doctorId) {
                toast.error("Doctor ID is required");
                navigate("/doctors");
                return;
            }

            setLoading(true);
            const doctorData = await getDoctorById(doctorId);
            
            if (doctorData) {
                setDoctor(doctorData);
                setFormData({
                    name: doctorData.name || "",
                    email: doctorData.email || "",
                    speciality: doctorData.speciality || "",
                    degree: doctorData.degree || "",
                    experience: doctorData.experience || "",
                    about: doctorData.about || "",
                    fees: doctorData.fees || 0,
                    available: doctorData.available || true,
                    address: {
                        line1: doctorData.address?.line1 || "",
                        line2: doctorData.address?.line2 || "",
                    },
                });

                // Set working hours
                if (doctorData.workingHours) {
                    const formattedWorkingHours = {};
                    Object.entries(doctorData.workingHours).forEach(([day, times]) => {
                        if (days.find(d => d.key === day)) {
                            formattedWorkingHours[day] = {
                                from: times.from || "09:00",
                                to: times.to || "17:00",
                                enabled: true,
                            };
                        }
                    });

                    // Set default values for missing days
                    days.forEach(({ key }) => {
                        if (!formattedWorkingHours[key]) {
                            formattedWorkingHours[key] = {
                                from: "09:00",
                                to: "17:00",
                                enabled: false,
                            };
                        }
                    });

                    setWorkingHours(formattedWorkingHours);
                }

                setSlotDuration(doctorData.slotDuration || 30);
            } else {
                toast.error("Doctor not found");
                navigate("/doctors");
            }
            setLoading(false);
        };

        fetchDoctor();
    }, [doctorId, getDoctorById, navigate]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === "checkbox" ? checked : value,
                },
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleWorkingHoursChange = (day, field, value) => {
        setWorkingHours(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [field]: value,
            },
        }));
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        const success = await updateDoctorProfile(doctorId, formData);
        if (success) {
            setIsEdit(false);
        }
        setSaving(false);
    };

    const handleSaveWorkingHours = async () => {
        setSaving(true);

        // Check if at least one day is enabled
        const enabledDays = Object.values(workingHours).filter(day => day.enabled);
        if (enabledDays.length === 0) {
            toast.error("Please enable at least one working day");
            setSaving(false);
            return;
        }

        // Convert to backend format
        const formattedWorkingHours = {};
        Object.entries(workingHours).forEach(([day, times]) => {
            if (times.enabled) {
                // Validate that end time is after start time
                const startTime = new Date(`2000-01-01T${times.from}`);
                const endTime = new Date(`2000-01-01T${times.to}`);
                if (endTime <= startTime) {
                    toast.error(`End time must be after start time for ${day}`);
                    setSaving(false);
                    return;
                }

                formattedWorkingHours[day] = {
                    from: times.from,
                    to: times.to,
                };
            }
        });

        const success = await updateDoctorWorkingHours(doctorId, formattedWorkingHours, slotDuration);
        if (success) {
            setIsEdit(false);
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Doctor not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Edit Doctor Profile</h1>
                            <p className="text-gray-600">Update doctor information and working hours</p>
                        </div>
                        <button
                            onClick={() => navigate("/doctors")}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Back to Doctors
                        </button>
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
                                    src={doctor.image || "/images/default-avatar.png"}
                                    alt={doctor.name || "Doctor"}
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
                                        {doctor.about}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">Appointment Fee</h3>
                                    <div className="flex items-center">
                                        <span className="text-lg font-semibold text-blue-600">
                                            ${doctor.fees}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">Address</h3>
                                    <p className="text-sm text-gray-600">
                                        {doctor.address?.line1}
                                        {doctor.address?.line2 && (
                                            <>
                                                <br />
                                                {doctor.address.line2}
                                            </>
                                        )}
                                    </p>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={doctor.available}
                                        disabled
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label className="ml-2 text-sm font-medium text-gray-700">
                                        Available for appointments
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Edit Form */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                                    <p className="text-gray-600">Update basic doctor information</p>
                                </div>
                                {isEdit ? (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleSaveProfile}
                                            disabled={saving}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                        >
                                            {saving ? "Saving..." : "Save Changes"}
                                        </button>
                                        <button
                                            onClick={() => setIsEdit(false)}
                                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsEdit(true)}
                                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        disabled={!isEdit}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEdit}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Speciality
                                    </label>
                                    <input
                                        type="text"
                                        name="speciality"
                                        value={formData.speciality}
                                        onChange={handleInputChange}
                                        disabled={!isEdit}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Degree
                                    </label>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleInputChange}
                                        disabled={!isEdit}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Experience
                                    </label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        disabled={!isEdit}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fees
                                    </label>
                                    <input
                                        type="number"
                                        name="fees"
                                        value={formData.fees}
                                        onChange={handleInputChange}
                                        disabled={!isEdit}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        About
                                    </label>
                                    <textarea
                                        name="about"
                                        value={formData.about}
                                        onChange={handleInputChange}
                                        disabled={!isEdit}
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address Line 1
                                    </label>
                                    <input
                                        type="text"
                                        name="address.line1"
                                        value={formData.address.line1}
                                        onChange={handleInputChange}
                                        disabled={!isEdit}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address Line 2
                                    </label>
                                    <input
                                        type="text"
                                        name="address.line2"
                                        value={formData.address.line2}
                                        onChange={handleInputChange}
                                        disabled={!isEdit}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Working Hours Edit Form */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">Working Hours</h2>
                                    <p className="text-gray-600">Set doctor's availability for each day</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            const allEnabled = Object.values(workingHours).every(day => day.enabled);
                                            setWorkingHours(prev => ({
                                                ...prev,
                                                ...Object.fromEntries(
                                                    Object.entries(prev).map(([day, times]) => [
                                                        day,
                                                        { ...times, enabled: !allEnabled }
                                                    ])
                                                )
                                            }));
                                        }}
                                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                    >
                                        {Object.values(workingHours).every(day => day.enabled) ? 'Disable All' : 'Enable All'}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {days.map(({ key, label }) => (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                checked={workingHours[key]?.enabled || false}
                                                onChange={(e) =>
                                                    handleWorkingHoursChange(key, "enabled", e.target.checked)
                                                }
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="font-medium text-gray-700 min-w-[80px]">
                                                {label}
                                            </span>
                                        </div>

                                        {workingHours[key]?.enabled && (
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="time"
                                                    value={workingHours[key]?.from || "09:00"}
                                                    onChange={(e) =>
                                                        handleWorkingHoursChange(key, "from", e.target.value)
                                                    }
                                                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <span className="text-gray-500">to</span>
                                                <input
                                                    type="time"
                                                    value={workingHours[key]?.to || "17:00"}
                                                    onChange={(e) =>
                                                        handleWorkingHoursChange(key, "to", e.target.value)
                                                    }
                                                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div className="border-t pt-4 mt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Appointment Duration
                                            </label>
                                            <select
                                                value={slotDuration}
                                                onChange={(e) => setSlotDuration(parseInt(e.target.value))}
                                                className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value={15}>15 minutes</option>
                                                <option value={30}>30 minutes</option>
                                                <option value={45}>45 minutes</option>
                                                <option value={60}>60 minutes</option>
                                            </select>
                                        </div>

                                        <button
                                            onClick={handleSaveWorkingHours}
                                            disabled={saving}
                                            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                        >
                                            {saving ? "Saving..." : "Save Working Hours"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDoctor; 