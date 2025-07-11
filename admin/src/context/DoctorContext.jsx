import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");

    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false);
    const [loadingAppointments, setLoadingAppointments] = useState(false); // ✅ New state

    const getAppointments = async () => {
        try {
            setLoadingAppointments(true); // ✅ Start loading
            const { data } = await axios.get(
                backendUrl + "/api/doctor/appointments",
                { headers: { dToken } }
            );
            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoadingAppointments(false); // ✅ Stop loading
        }
    };

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/doctor/complete-appointment",
                { appointmentId },
                { headers: { dToken } }
            );
            if (data.success) {
                toast.success(data.message);
                await getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/doctor/cancel-appointment",
                { appointmentId },
                { headers: { dToken } }
            );
            if (data.success) {
                toast.success(data.message);
                await getAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getDashData = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/doctor/dashboard",
                { headers: { dToken } }
            );
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getProfileData = async () => {
        try {
            console.log('DoctorContext: Starting getProfileData...');
            console.log('DoctorContext: dToken:', dToken);
            console.log('DoctorContext: backendUrl:', backendUrl);
            
            const { data } = await axios.get(
                backendUrl + "/api/doctor/profile",
                { headers: { dToken } }
            );
            
            console.log('DoctorContext: API response:', data);
            
            if (data.success) {
                console.log('DoctorContext: Setting profile data:', data.profileData);
                setProfileData(data.profileData);
            } else {
                console.log('DoctorContext: API returned error:', data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.log('DoctorContext: Error in getProfileData:', error);
            console.log('DoctorContext: Error response:', error.response?.data);
            toast.error(error.message);
        }
    };

    const value = {
        dToken,
        setDToken,
        backendUrl,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,
        setDashData,
        getDashData,
        profileData,
        setProfileData,
        getProfileData,
        loadingAppointments, // ✅ Pass loading state to context
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
