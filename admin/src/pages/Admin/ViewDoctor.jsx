import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { assets } from "../../assets/assets";
import axios from "axios";


const ViewDoctor = () => {
    // ...existing code...
    // Restore handleInputChange function
    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else if (name.includes(".")) {
            // التعامل مع الحقول المتداخلة مثل address.line1
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    // ...existing code...

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
                // toast.success(data.message);
                toast.success("Working hours updated successfully.");

                setIsEdit(false);
                // Refresh doctor data
                const updatedDoctor = await getDoctorById(doctorId);
                if (updatedDoctor) {
                    setDoctor(updatedDoctor);
                }
            } else {
                // toast.error(data.message);
                toast.error(
                    "Failed to update working hours. Please try again."
                );
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            // toast.error(error.response?.data?.message || error.message);
            toast.error("An error occurred while updating working hours.");
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
                // toast.error(data.message);
                toast.error(
                    "Failed to update working hours. Please try again."
                );
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating working hours.");
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
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                                Doctor Profile
                            </h1>
                            <p className="text-gray-600 text-sm sm:text-base">
                                View and manage doctor information and working hours
                            </p>
                        </div>
                        <div className="flex space-x-0 sm:space-x-3 w-full sm:w-auto mt-3 sm:mt-0">
                            <button
                                onClick={() => navigate("/doctors-list")}
                                className="w-full sm:w-auto border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back to List
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Profile Information */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 lg:mb-0">
                            {/* Profile Image */}
                            <div className="text-center mb-4 sm:mb-6">
                                <img
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto object-cover border-4 border-green-100"
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
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

                                {/* ...existing code for address, available, contact, edit/cancel/save buttons... */}
                            </div>
                        </div>
                    </div>

                    {/* Working Hours Settings */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                                        Working Hours
                                    </h2>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        Set doctor's availability for each day of the week
                                    </p>
                                </div>
                                <div className="flex space-x-2 w-full sm:w-auto">
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
                                        className="w-full sm:w-auto px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                    >
                                        {Object.values(
                                            slotsSettings.workingHours
                                        ).every((day) => day.enabled)
                                            ? "Disable All"
                                            : "Enable All"}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                {days.map(({ key, label }) => {
                                    return (
                                        <div
                                            key={key}
                                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors gap-2 sm:gap-0"
                                        >
                                            <div className="flex items-center space-x-2 sm:space-x-3">
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
                                                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
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
                                                        className="border border-gray-300 rounded px-2 sm:px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                                                        className="border border-gray-300 rounded px-2 sm:px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                {/* Summary Section */}
                                <div className="border-t pt-4 mt-4 sm:mt-6">
                                    <div className="bg-green-50 p-3 sm:p-4 rounded-lg mb-3 sm:mb-4">
                                        <h4 className="font-medium text-green-800 mb-1 sm:mb-2">
                                            Working Hours Summary
                                        </h4>
                                        <div className="text-sm text-green-700">
                                            <p>
                                                Enabled days: {" "}
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
                                                Appointment duration: {" "}
                                                {slotsSettings.slotDuration} {" "}
                                                minutes
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
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
                                                className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none w-full sm:w-auto"
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
                                            className="w-full sm:w-auto bg-green-600 text-white py-2 px-4 sm:px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
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
