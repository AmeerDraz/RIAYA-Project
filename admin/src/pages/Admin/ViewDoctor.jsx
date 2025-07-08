// import React, { useContext, useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AdminContext } from "../../context/AdminContext";
// import { toast } from "react-toastify";
// import Loader from "../../components/Loader";
// import { assets } from '../../assets/assets';

// const ViewDoctor = () => {
//     console.log("ViewDoctor component is rendering...");
    
//     const { doctorId } = useParams();
//     const navigate = useNavigate();
//     const { getDoctorById, backendUrl, updateDoctorWorkingHours } = useContext(AdminContext);
//     const [doctor, setDoctor] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [workingHours, setWorkingHours] = useState({});
//     const [slotDuration, setSlotDuration] = useState(30);
//     const [saving, setSaving] = useState(false);

//     console.log("ViewDoctor - doctorId:", doctorId);
//     console.log("ViewDoctor - getDoctorById function:", !!getDoctorById);

//     useEffect(() => {
//         const fetchDoctor = async () => {
//             try {
//                 setLoading(true);
//                 const doctorData = await getDoctorById(doctorId);
//                 if (doctorData.success) {
//                     setDoctor(doctorData.doctor);
//                     setWorkingHours(doctorData.doctor.workingHours || {});
//                     setSlotDuration(doctorData.doctor.slotDuration || 30);
//                 } else {
//                     toast.error(doctorData.message);
//                     navigate('/doctors-list');
//                 }
//             } catch (error) {
//                 console.error("Error fetching doctor:", error);
//                 toast.error("Failed to load doctor data");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (doctorId) {
//             fetchDoctor();
//         }
//     }, [doctorId, getDoctorById, navigate]);

//     const handleWorkingHoursChange = (day, field, value) => {
//         setWorkingHours(prev => ({
//             ...prev,
//             [day]: {
//                 ...prev[day],
//                 [field]: value
//             }
//         }));
//     };

//     const handleSaveWorkingHours = async () => {
//         try {
//             setSaving(true);
//             const data = await updateDoctorWorkingHours(doctorId, workingHours, slotDuration);
//             if (data.success) {
//                 toast.success('Working hours updated successfully');
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.error('Error updating working hours:', error);
//             toast.error('Failed to update working hours');
//         } finally {
//             setSaving(false);
//         }
//     };

//     if (loading) {
//         return <Loader />;
//     }

//     if (!doctor) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <h2 className="text-xl font-semibold text-gray-800 mb-2">Doctor Not Found</h2>
//                     <p className="text-gray-600 mb-4">The doctor you're looking for doesn't exist.</p>
//                     <button
//                         onClick={() => navigate('/doctors-list')}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                     >
//                         Back to Doctors List
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const days = [
//         { key: "SUN", label: "Sunday" },
//         { key: "MON", label: "Monday" },
//         { key: "TUE", label: "Tuesday" },
//         { key: "WED", label: "Wednesday" },
//         { key: "THU", label: "Thursday" },
//         { key: "FRI", label: "Friday" },
//         { key: "SAT", label: "Saturday" },
//     ];

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <div className="max-w-6xl mx-auto">
//                 {/* Header */}
//                 <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-800 mb-2">Doctor Profile</h1>
//                             <p className="text-gray-600">View doctor information and working hours</p>
//                         </div>
//                         <div className="flex space-x-3">
//                             <button
//                                 onClick={() => navigate(`/edit-doctor/${doctorId}`)}
//                                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                             >
//                                 Edit Doctor
//                             </button>
//                             <button
//                                 onClick={() => navigate('/doctors-list')}
//                                 className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
//                             >
//                                 Back to List
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Profile Information */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg shadow-sm p-6">
//                             {/* Profile Image */}
//                             <div className="text-center mb-6">
//                                 <img
//                                     className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-100"
//                                     src={doctor.image || assets.doctor_icon}
//                                     alt={doctor.name || "Doctor"}
//                                     onError={(e) => {
//                                         e.target.src = assets.doctor_icon;
//                                     }}
//                                 />
//                             </div>

//                             {/* Basic Info */}
//                             <div className="space-y-4">
//                                 <div>
//                                     <h2 className="text-xl font-semibold text-gray-800">
//                                         {doctor.name}
//                                     </h2>
//                                     <p className="text-gray-600">
//                                         {doctor.degree} - {doctor.speciality}
//                                     </p>
//                                     <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
//                                         {doctor.experience} Experience
//                                     </span>
//                                 </div>

//                                 <div>
//                                     <h3 className="font-medium text-gray-800 mb-2">About</h3>
//                                     <p className="text-sm text-gray-600 leading-relaxed">
//                                         {doctor.about || "No description available"}
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <h3 className="font-medium text-gray-800 mb-2">Appointment Fee</h3>
//                                     <div className="flex items-center">
//                                         <span className="text-lg font-semibold text-blue-600">
//                                             ₹ {doctor.fees}
//                                         </span>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <h3 className="font-medium text-gray-800 mb-2">Address</h3>
//                                     <p className="text-sm text-gray-600">
//                                         {doctor.address?.line1 || "No address available"}
//                                         {doctor.address?.line2 && (
//                                             <>
//                                                 <br />
//                                                 {doctor.address.line2}
//                                             </>
//                                         )}
//                                     </p>
//                                 </div>

//                                 <div className="flex items-center">
//                                     <div className={`w-3 h-3 rounded-full mr-2 ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                                     <span className="text-sm font-medium text-gray-700">
//                                         {doctor.available ? 'Available for appointments' : 'Not available for appointments'}
//                                     </span>
//                                 </div>

//                                 <div>
//                                     <h3 className="font-medium text-gray-800 mb-2">Contact</h3>
//                                     <p className="text-sm text-gray-600">
//                                         Email: {doctor.email}<br />
//                                         Phone: {doctor.phone || "Not provided"}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Working Hours */}
//                     <div className="lg:col-span-2">
//                         <div className="bg-white rounded-lg shadow-sm p-6">
//                             <div className="flex items-center justify-between mb-6">
//                                 <div>
//                                     <h2 className="text-xl font-semibold text-gray-800">Working Hours</h2>
//                                     <p className="text-gray-600">Doctor's availability schedule</p>
//                                 </div>
//                                 <div className="text-sm text-gray-500">
//                                     Slot Duration: {slotDuration} minutes
//                                 </div>
//                             </div>

//                             <div className="space-y-3">
//                                 {days.map(({ key, label }) => {
//                                     const daySchedule = workingHours[key];
//                                     const isEnabled = daySchedule?.enabled;
                                    
//                                     return (
//                                         <div
//                                             key={key}
//                                             className={`flex items-center justify-between p-4 border rounded-lg ${
//                                                 isEnabled
//                                                     ? 'border-green-200 bg-green-50'
//                                                     : 'border-gray-200 bg-gray-50'
//                                             }`}
//                                         >
//                                             <div className="flex items-center space-x-3">
//                                                 <div className={`w-4 h-4 rounded-full ${
//                                                     isEnabled ? 'bg-green-500' : 'bg-gray-300'
//                                                 }`}></div>
//                                                 <span className="font-medium text-gray-800">{label}</span>
//                                             </div>
//                                             <div className="text-sm text-gray-600">
//                                                 {isEnabled ? (
//                                                     <span>
//                                                         {daySchedule.from} - {daySchedule.to}
//                                                     </span>
//                                                 ) : (
//                                                     <span className="text-gray-400">Not available</span>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>

//                             {/* Summary */}
//                             <div className="mt-6 p-4 bg-blue-50 rounded-lg">
//                                 <h3 className="font-medium text-blue-800 mb-2">Working Hours Summary</h3>
//                                 <div className="text-sm text-blue-700">
//                                     {Object.values(workingHours || {}).filter(day => day.enabled).length} out of 7 days available
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Working Hours Management */}
//                 <div className="mt-6 pt-6 border-t">
//                     <button
//                         onClick={handleSaveWorkingHours}
//                         disabled={saving}
//                         className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         {saving ? 'Saving...' : 'Save Working Hours'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewDoctor;

import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { assets } from "../../assets/assets";
import axios from "axios";

const ViewDoctor = () => {
    console.log("ViewDoctor component is rendering...");

    const { doctorId } = useParams();
    const navigate = useNavigate();
    const { getDoctorById, backendUrl, aToken } = useContext(AdminContext);
    const { currency } = useContext(AppContext);

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingSlots, setSavingSlots] = useState(false);

    // Initialize working hours with proper structure
    const [slotsSettings, setSlotsSettings] = useState({
        workingHours: {
            SUN: { from: "09:00", to: "17:00", enabled: true },
            MON: { from: "09:00", to: "17:00", enabled: true },
            TUE: { from: "09:00", to: "17:00", enabled: true },
            WED: { from: "09:00", to: "17:00", enabled: true },
            THU: { from: "09:00", to: "17:00", enabled: true },
            FRI: { from: "09:00", to: "17:00", enabled: true },
            SAT: { from: "09:00", to: "17:00", enabled: true },
        },
        slotDuration: 30,
    });

    // Add form state for editing profile data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        experience: "",
        speciality: "",
        degree: "",
        about: "",
        fees: 0,
        available: true,
        address: {
            line1: "",
            line2: "",
        },
    });

    const days = [
        { key: "SUN", label: "Sunday" },
        { key: "MON", label: "Monday" },
        { key: "TUE", label: "Tuesday" },
        { key: "WED", label: "Wednesday" },
        { key: "THU", label: "Thursday" },
        { key: "FRI", label: "Friday" },
        { key: "SAT", label: "Saturday" },
    ];

    console.log("ViewDoctor - doctorId:", doctorId);
    console.log("ViewDoctor - getDoctorById function:", !!getDoctorById);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                setLoading(true);
                const doctorData = await getDoctorById(doctorId);

                if (doctorData) {
                    setDoctor(doctorData);

                    // Initialize form data
                    setFormData({
                        name: doctorData.name || "",
                        email: doctorData.email || "",
                        experience: doctorData.experience || "",
                        speciality: doctorData.speciality || "",
                        degree: doctorData.degree || "",
                        about: doctorData.about || "",
                        fees: doctorData.fees || 0,
                        available: doctorData.available || true,
                        address: {
                            line1: doctorData.address?.line1 || "",
                            line2: doctorData.address?.line2 || "",
                        },
                    });

                    // Initialize working hours
                    let formattedWorkingHours = {};
                    if (Array.isArray(doctorData.workingHours)) {
                        doctorData.workingHours.forEach((item) => {
                            formattedWorkingHours[item.day] = {
                                from: item.start || item.from,
                                to: item.end || item.to,
                                enabled: true,
                            };
                        });
                    } else if (
                        typeof doctorData.workingHours === "object" &&
                        doctorData.workingHours !== null
                    ) {
                        Object.entries(doctorData.workingHours).forEach(
                            ([day, times]) => {
                                formattedWorkingHours[day] = {
                                    from: times.from || "09:00",
                                    to: times.to || "17:00",
                                    enabled: true,
                                };
                            }
                        );
                    }

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

                    setSlotsSettings({
                        workingHours: formattedWorkingHours,
                        slotDuration: doctorData.slotDuration || 30,
                    });
                } else {
                    toast.error("Doctor not found");
                    navigate("/doctors-list");
                }
            } catch (error) {
                console.error("Error fetching doctor:", error);
                toast.error("Failed to load doctor data");
                navigate("/doctors-list");
            } finally {
                setLoading(false);
            }
        };

        if (doctorId) {
            fetchDoctor();
        }
    }, [doctorId, getDoctorById, navigate]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === "checkbox" ? checked : value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const updateProfile = async () => {
        try {
            setSavingProfile(true);

            // Validate required fields
            if (!formData.name.trim()) {
                toast.error("Name is required");
                return;
            }
            if (!formData.email.trim()) {
                toast.error("Email is required");
                return;
            }
            if (!formData.experience || formData.experience <= 0) {
                toast.error("Experience must be a positive number");
                return;
            }
            if (!formData.speciality.trim()) {
                toast.error("Speciality is required");
                return;
            }
            if (!formData.degree.trim()) {
                toast.error("Degree is required");
                return;
            }
            if (!formData.address.line1.trim()) {
                toast.error("Address is required");
                return;
            }
            if (formData.fees <= 0) {
                toast.error("Fees must be greater than 0");
                return;
            }

            const updateData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                experience: formData.experience.trim(),
                speciality: formData.speciality.trim(),
                degree: formData.degree.trim(),
                about: formData.about.trim(),
                address: {
                    line1: formData.address.line1.trim(),
                    line2: formData.address.line2.trim(),
                },
                fees: formData.fees,
                available: formData.available,
            };

            console.log("Updating doctor profile with data:", updateData);
            const { data } = await axios.put(
                backendUrl + `/api/admin/update-doctor/${doctorId}`,
                updateData,
                { headers: { aToken } }
            );
            
            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                // Refresh doctor data
                const updatedDoctor = await getDoctorById(doctorId);
                if (updatedDoctor) {
                    setDoctor(updatedDoctor);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setSavingProfile(false);
        }
    };

    const updateSlotsSettings = async () => {
        try {
            setSavingSlots(true);

            // Check if at least one day is enabled
            const enabledDays = Object.values(
                slotsSettings.workingHours
            ).filter((day) => day.enabled);
            if (enabledDays.length === 0) {
                toast.error("Please enable at least one working day");
                return;
            }

            // Convert workingHours to the format expected by backend
            const formattedWorkingHours = {};
            Object.entries(slotsSettings.workingHours).forEach(
                ([day, times]) => {
                    if (times.enabled) {
                        // Validate that end time is after start time
                        const startTime = new Date(`2000-01-01T${times.from}`);
                        const endTime = new Date(`2000-01-01T${times.to}`);
                        if (endTime <= startTime) {
                            toast.error(
                                `End time must be after start time for ${day}`
                            );
                            return;
                        }
                        formattedWorkingHours[day] = {
                            from: times.from,
                            to: times.to,
                        };
                    }
                }
            );

            const requestBody = {
                workingHours: formattedWorkingHours,
                slotDuration: slotsSettings.slotDuration,
            };

            const { data } = await axios.put(
                `${backendUrl}/api/admin/doctor/${doctorId}/working-hours`,
                requestBody,
                { headers: { aToken } }
            );
            
            if (data.success) {
                toast.success("Working hours updated successfully!");
                // Refresh doctor data
                const updatedDoctor = await getDoctorById(doctorId);
                if (updatedDoctor) {
                    setDoctor(updatedDoctor);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage =
                error.response?.data?.message ||
                "Failed to update working hours";
            toast.error(errorMessage);
        } finally {
            setSavingSlots(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!doctor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Doctor Not Found
                    </h2>
                    <p className="text-gray-600 mb-4">
                        The doctor you're looking for doesn't exist.
                    </p>
                    <button
                        onClick={() => navigate("/doctors-list")}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Back to Doctors List
                    </button>
                </div>
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
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Doctor Profile
                            </h1>
                            <p className="text-gray-600">
                                View and manage doctor information and working
                                hours
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => navigate("/doctors-list")}
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
                                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-100"
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
                                    {isEdit ? (
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-xl font-semibold"
                                                placeholder="Doctor Name"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="Email"
                                            />
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    name="degree"
                                                    value={formData.degree}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                    placeholder="Degree"
                                                />
                                                <input
                                                    type="text"
                                                    name="speciality"
                                                    value={formData.speciality}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                    placeholder="Speciality"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="Years of Experience"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                {doctor.name}
                                            </h2>
                                            <p className="text-gray-600">
                                                {doctor.degree} -{" "}
                                                {doctor.speciality}
                                            </p>
                                            <span className="inline-block bg-green-100 text-green-500 text-xs px-2 py-1 rounded-full mt-1">
                                                {doctor.experience} Experience
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">
                                        About
                                    </h3>
                                    {isEdit ? (
                                        <textarea
                                            name="about"
                                            value={formData.about}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                                            placeholder="Tell us about the doctor..."
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {doctor.about ||
                                                "No description available"}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">
                                        Appointment Fee
                                    </h3>
                                    {isEdit ? (
                                        <input
                                            type="number"
                                            name="fees"
                                            value={formData.fees}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            placeholder="Enter appointment fee"
                                        />
                                    ) : (
                                        <div className="flex items-center">
                                            <span className="text-lg font-semibold text-green-600">
                                                {currency} {doctor.fees}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">
                                        Address
                                    </h3>
                                    {isEdit ? (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                name="address.line1"
                                                value={formData.address.line1}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="Address Line 1"
                                            />
                                            <input
                                                type="text"
                                                name="address.line2"
                                                value={formData.address.line2}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="Address Line 2 (optional)"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-600">
                                            {doctor.address?.line1 ||
                                                "No address available"}
                                            {doctor.address?.line2 && (
                                                <>
                                                    <br />
                                                    {doctor.address.line2}
                                                </>
                                            )}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        onChange={handleInputChange}
                                        checked={formData.available}
                                        type="checkbox"
                                        id="available-checkbox"
                                        name="available"
                                        disabled={!isEdit}
                                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                    />
                                    <label
                                        htmlFor="available-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-700"
                                    >
                                        Available for appointments
                                    </label>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">
                                        Contact
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Email: {doctor.email}
                                        <br />
                                        Phone: {doctor.phone || "Not provided"}
                                    </p>
                                </div>

                                {isEdit ? (
                                    <div className="space-y-2">
                                        <button
                                            onClick={updateProfile}
                                            disabled={savingProfile}
                                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                        >
                                            {savingProfile
                                                ? "Saving..."
                                                : "Save Changes"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEdit(false);
                                                // Reset form data to original values
                                                if (doctor) {
                                                    setFormData({
                                                        name: doctor.name || "",
                                                        email:
                                                            doctor.email || "",
                                                        experience:
                                                            doctor.experience ||
                                                            "",
                                                        speciality:
                                                            doctor.speciality ||
                                                            "",
                                                        degree:
                                                            doctor.degree || "",
                                                        about:
                                                            doctor.about || "",
                                                        fees: doctor.fees || 0,
                                                        available:
                                                            doctor.available ||
                                                            true,
                                                        address: {
                                                            line1:
                                                                doctor.address
                                                                    ?.line1 ||
                                                                "",
                                                            line2:
                                                                doctor.address
                                                                    ?.line2 ||
                                                                "",
                                                        },
                                                    });
                                                }
                                            }}
                                            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsEdit(true)}
                                        className="w-full border border-green-600 text-green-600 py-2 px-4 rounded-lg hover:bg-green-50 transition-colors"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Working Hours Settings */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Working Hours
                                    </h2>
                                    <p className="text-gray-600">
                                        Set doctor's availability for each day
                                        of the week
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            const allEnabled = Object.values(
                                                slotsSettings.workingHours
                                            ).every((day) => day.enabled);
                                            setSlotsSettings((prev) => ({
                                                ...prev,
                                                workingHours:
                                                    Object.fromEntries(
                                                        Object.entries(
                                                            prev.workingHours
                                                        ).map(
                                                            ([day, times]) => [
                                                                day,
                                                                {
                                                                    ...times,
                                                                    enabled:
                                                                        !allEnabled,
                                                                },
                                                            ]
                                                        )
                                                    ),
                                            }));
                                        }}
                                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                    >
                                        {Object.values(
                                            slotsSettings.workingHours
                                        ).every((day) => day.enabled)
                                            ? "Disable All"
                                            : "Enable All"}
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
                                                checked={
                                                    slotsSettings.workingHours[
                                                        key
                                                    ]?.enabled || false
                                                }
                                                onChange={(e) =>
                                                    setSlotsSettings(
                                                        (prev) => ({
                                                            ...prev,
                                                            workingHours: {
                                                                ...prev.workingHours,
                                                                [key]: {
                                                                    ...prev
                                                                        .workingHours[
                                                                        key
                                                                    ],
                                                                    enabled:
                                                                        e.target
                                                                            .checked,
                                                                },
                                                            },
                                                        })
                                                    )
                                                }
                                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                            />
                                            <span className="font-medium text-gray-700 min-w-[80px]">
                                                {label}
                                            </span>
                                        </div>
                                        {slotsSettings.workingHours[key]
                                            ?.enabled && (
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="time"
                                                    value={
                                                        slotsSettings
                                                            .workingHours[key]
                                                            ?.from || "09:00"
                                                    }
                                                    onChange={(e) =>
                                                        setSlotsSettings(
                                                            (prev) => ({
                                                                ...prev,
                                                                workingHours: {
                                                                    ...prev.workingHours,
                                                                    [key]: {
                                                                        ...prev
                                                                            .workingHours[
                                                                            key
                                                                        ],
                                                                        from: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                                },
                                                            })
                                                        )
                                                    }
                                                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-gray-500">
                                                    to
                                                </span>
                                                <input
                                                    type="time"
                                                    value={
                                                        slotsSettings
                                                            .workingHours[key]
                                                            ?.to || "17:00"
                                                    }
                                                    onChange={(e) =>
                                                        setSlotsSettings(
                                                            (prev) => ({
                                                                ...prev,
                                                                workingHours: {
                                                                    ...prev.workingHours,
                                                                    [key]: {
                                                                        ...prev
                                                                            .workingHours[
                                                                            key
                                                                        ],
                                                                        to: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                                },
                                                            })
                                                        )
                                                    }
                                                    className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {/* Summary Section */}
                                <div className="border-t pt-4 mt-6">
                                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                                        <h4 className="font-medium text-green-800 mb-2">
                                            Working Hours Summary
                                        </h4>
                                        <div className="text-sm text-green-700">
                                            <p>
                                                Enabled days:{" "}
                                                {
                                                    Object.values(
                                                        slotsSettings.workingHours
                                                    ).filter(
                                                        (day) => day.enabled
                                                    ).length
                                                }
                                                /7
                                            </p>
                                            <p>
                                                Appointment duration:{" "}
                                                {slotsSettings.slotDuration}{" "}
                                                minutes
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Appointment Duration
                                            </label>
                                            <select
                                                value={
                                                    slotsSettings.slotDuration
                                                }
                                                onChange={(e) =>
                                                    setSlotsSettings(
                                                        (prev) => ({
                                                            ...prev,
                                                            slotDuration:
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                ),
                                                        })
                                                    )
                                                }
                                                className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                                            >
                                                <option value={15}>
                                                    15 minutes
                                                </option>
                                                <option value={30}>
                                                    30 minutes
                                                </option>
                                                <option value={45}>
                                                    45 minutes
                                                </option>
                                                <option value={60}>
                                                    60 minutes
                                                </option>
                                            </select>
                                        </div>
                                        <button
                                            onClick={updateSlotsSettings}
                                            disabled={savingSlots}
                                            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                        >
                                            {savingSlots
                                                ? "Saving..."
                                                : "Save Working Hours"}
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

export default ViewDoctor;