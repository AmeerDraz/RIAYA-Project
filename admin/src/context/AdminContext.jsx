import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
    const [doctors, setDoctors] = useState([]);
    const [loadingDoctors, setLoadingDoctors] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(null);
    const [loadingDashData, setLoadingDashData] = useState(false);
    const [loadingAppointments, setLoadingAppointments] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        setLoadingDoctors(true);
        try {
            const { data } = await axios.get(
                backendUrl + "/api/admin/all-doctors",
                { headers: { aToken } }
            );

            console.log("Doctors API Response:", data);

            if (data.success) {
                setDoctors(data.doctor); // ✅ هذا هو التعديل الأهم
                console.log("Doctors updated:", data.doctor);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error(error.message);
        }
        setLoadingDoctors(false);
    };

    const changeAvailapility = async (docId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/change-availability",
                { docId },
                { headers: { aToken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getAllAppointments = async () => {
        setLoadingAppointments(true);
        try {
            const { data } = await axios.get(
                backendUrl + "/api/admin/appointments",
                { headers: { aToken } }
            );

            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoadingAppointments(false);
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/cancel-appointment",
                { appointmentId },
                { headers: { aToken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
                getDashData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getDashData = async () => {
        setLoadingDashData(true);
        try {
            const { data } = await axios.get(
                backendUrl + "/api/admin/dashboard",
                { headers: { aToken } }
            );
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoadingDashData(false);
    };

    // Get single doctor by ID
    const getDoctorById = async (doctorId) => {
        try {
            const { data } = await axios.get(
                backendUrl + `/api/admin/doctor/${doctorId}`,
                { headers: { aToken } }
            );
            if (data.success) {
                return data.doctor;
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (error) {
            toast.error(error.message);
            return null;
        }
    };

    // Update doctor profile
    const updateDoctorProfile = async (doctorId, updateData) => {
        try {
            const { data } = await axios.put(
                backendUrl + `/api/admin/doctor/${doctorId}`,
                updateData,
                { headers: { aToken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllDoctors(); // Refresh the doctors list
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    };

    // Update doctor working hours
    const updateDoctorWorkingHours = async (doctorId, workingHours, slotDuration) => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                return { success: false, message: 'Not authenticated' };
            }

            const response = await axios.put(
                `${backendUrl}/api/admin/doctor/${doctorId}/working-hours`,
                { workingHours, slotDuration },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Error updating doctor working hours:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update working hours'
            };
        }
    };

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailapility,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData,
        loadingDashData,
        loadingAppointments,
        loadingDoctors,
        getDoctorById,
        updateDoctorProfile,
        updateDoctorWorkingHours,
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
