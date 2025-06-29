// // import { createContext, useState } from "react";

// // export const AdminContext = createContext();
// // import { toast } from "react-toastify";
// // import axios from "axios";
// // import DocImg from "../assets/doc5.png";

// // const AdminContextProvider = (props) => {
// //     const [aToken, setAToken] = useState(
// //         localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
// //     );

// //     const [doctors, setDoctors] = useState([]);

// //     const [appointments, setAppointments] = useState();

// //     const [dashData, setDashData] = useState(false);

// //     const backendUrl = import.meta.env.VITE_BACKEND_URL;

// //     const getAllDoctors = async () => {
// //         ///////////////////////////////////////////////

// //         try {
// //             const { data } = await axios.post(
// //                 backendUrl + "/api/admin/all-doctors",
// //                 {},
// //                 { headers: { aToken } }
// //             );

// //             if (data.success) {
// //                 setDoctors(data.doctors);

// //                 console.log(data.doctors);
// //             } else {
// //                 toast.error(data.message);
// //             }
// //         } catch (error) {
// //             toast.error(error.message);
// //         }
// //     };

// //     const changeAvailapility = async (docId) => {
// //         try {
// //             const { data } = await axios.post(
// //                 backendUrl + "/api/admin/change-availability",
// //                 { docId },
// //                 { headers: { aToken } }
// //             );
// //             if (data.success) {
// //                 toast.success(data.message);
// //                 getAllDoctors();
// //             } else {
// //                 toast.error(data.message);
// //             }
// //         } catch (error) {
// //             toast.error(error.message);
// //         }
// //     };

// //     const getAllAppointments = async () => {
// //         try {
// //             const { data } = await axios.get(
// //                 backendUrl + "/api/admin/appointments",
// //                 { headers: { aToken } }
// //             );

// //             if (data.success) {
// //                 setAppointments(data.appointments);
// //                 console.log(data.appointments);
// //             } else {
// //                 toast.error(data.message);
// //             }
// //         } catch (error) {
// //             toast.error(error.message);
// //         }
// //     };

// //     const cancelAppointment = async (appointmentId) => {
// //         try {
// //             const { data } = await axios.post(
// //                 backendUrl + "/api/admin/cancel-appointment",
// //                 { appointmentId },
// //                 { headers: { aToken } }
// //             );
// //             if (data.success) {
// //                 toast.success(data.message);
// //                 getAllAppointments();
// //             } else {
// //                 toast.error(data.message);
// //             }
// //         } catch (error) {
// //             toast.error(error.message);
// //         }
// //     };

// //     const getDashData = async () => {
// //         try {
// //             const { data } = await axios.get(
// //                 backendUrl + "/api/admin/dashboard",
// //                 { headers: { aToken } }
// //             );
// //             if (data.success) {
// //                 setDashData(data.dashData)
// //                 console.log(data.dashData);
                
// //             } else {
// //                 toast.error(data.message);
// //             }
                
// //         } catch (error) {
// //             toast.error(error.message);
// //         }
// //     };

// //     const value = {
// //         aToken,
// //         setAToken,
// //         backendUrl,
// //         doctors,
// //         getAllDoctors,
// //         changeAvailapility,
// //         appointments,
// //         setAppointments,
// //         getAllAppointments,
// //         cancelAppointment,
// //         dashData,
// //         getDashData,
// //     };

// //     return (
// //         <AdminContext.Provider value={value}>
// //             {props.children}
// //         </AdminContext.Provider>
// //     );
// // };

// // export default AdminContextProvider;



// import { createContext, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const AdminContext = createContext();

// const AdminContextProvider = (props) => {
//     const [aToken, setAToken] = useState(
//         localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
//     );

//     const [doctors, setDoctors] = useState([]);
//     const [appointments, setAppointments] = useState();
//     const [dashData, setDashData] = useState(false);

//     const backendUrl = import.meta.env.VITE_BACKEND_URL;

//     const getAllDoctors = async () => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/admin/all-doctors",
//                 {},
//                 { headers: { aToken } }
//             );

//             if (data.success) {
//                 setDoctors(data.doctor); // <-- هنا صححت الاسم
//                 console.log(data.doctor);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const changeAvailapility = async (docId) => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/admin/change-availability",
//                 { docId },
//                 { headers: { aToken } }
//             );
//             if (data.success) {
//                 toast.success(data.message);
//                 getAllDoctors();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const getAllAppointments = async () => {
//         try {
//             const { data } = await axios.get(
//                 backendUrl + "/api/admin/appointments",
//                 { headers: { aToken } }
//             );

//             if (data.success) {
//                 setAppointments(data.appointments);
//                 console.log(data.appointments);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const cancelAppointment = async (appointmentId) => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/admin/cancel-appointment",
//                 { appointmentId },
//                 { headers: { aToken } }
//             );
//             if (data.success) {
//                 toast.success(data.message);
//                 getAllAppointments();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const getDashData = async () => {
//         try {
//             const { data } = await axios.get(
//                 backendUrl + "/api/admin/dashboard",
//                 { headers: { aToken } }
//             );
//             if (data.success) {
//                 setDashData(data.dashData);
//                 console.log(data.dashData);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const value = {
//         aToken,
//         setAToken,
//         backendUrl,
//         doctors,
//         getAllDoctors,
//         changeAvailapility,
//         appointments,
//         setAppointments,
//         getAllAppointments,
//         cancelAppointment,
//         dashData,
//         getDashData,
//     };

//     return (
//         <AdminContext.Provider value={value}>
//             {props.children}
//         </AdminContext.Provider>
//     );
// };

// export default AdminContextProvider;


// import { createContext, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const AdminContext = createContext();

// const AdminContextProvider = (props) => {
//     const [aToken, setAToken] = useState(
//         localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
//     );

//     const [doctors, setDoctors] = useState([]);
//     const [appointments, setAppointments] = useState([]); // <- مصفوفة فارغة لتجنب مشاكل map
//     const [dashData, setDashData] = useState(false);

//     const backendUrl = import.meta.env.VITE_BACKEND_URL;

//     const getAllDoctors = async () => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/admin/all-doctors",
//                 {},
//                 { headers: { aToken } }
//             );

//             console.log("Doctors API Response:", data);

//             if (data.success) {
//                 setDoctors(data.doctors); // تأكد من الاسم حسب استجابة API
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const changeAvailapility = async (docId) => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/admin/change-availability",
//                 { docId },
//                 { headers: { aToken } }
//             );
//             if (data.success) {
//                 toast.success(data.message);
//                 getAllDoctors();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const getAllAppointments = async () => {
//         try {
//             const { data } = await axios.get(
//                 backendUrl + "/api/admin/appointments",
//                 { headers: { aToken } }
//             );

//             console.log("Appointments API Response:", data);

//             if (data.success) {
//                 setAppointments(data.appointments);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const cancelAppointment = async (appointmentId) => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/admin/cancel-appointment",
//                 { appointmentId },
//                 { headers: { aToken } }
//             );
//             if (data.success) {
//                 toast.success(data.message);
//                 getAllAppointments();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const getDashData = async () => {
//         try {
//             const { data } = await axios.get(
//                 backendUrl + "/api/admin/dashboard",
//                 { headers: { aToken } }
//             );
//             if (data.success) {
//                 setDashData(data.dashData);
//                 console.log(data.dashData);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const value = {
//         aToken,
//         setAToken,
//         backendUrl,
//         doctors,
//         getAllDoctors,
//         changeAvailapility,
//         appointments,
//         setAppointments,
//         getAllAppointments,
//         cancelAppointment,
//         dashData,
//         getDashData,
//     };

//     return (
//         <AdminContext.Provider value={value}>
//             {props.children}
//         </AdminContext.Provider>
//     );
// };

// export default AdminContextProvider;



// import { createContext, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";

// export const AdminContext = createContext();

// const AdminContextProvider = (props) => {
//     const [aToken, setAToken] = useState(
//         localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
//     );

//     const [doctors, setDoctors] = useState([]);
//     const [appointments, setAppointments] = useState([]); // ✅ لتجنب مشاكل map
//     const [dashData, setDashData] = useState(false);
//     const [loadingAppointments, setLoadingAppointments] = useState(false);

//     const backendUrl = import.meta.env.VITE_BACKEND_URL;

//     const getAllDoctors = async () => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/admin/all-doctors",
//                 {},
//                 { headers: { aToken } }
//             );

//             console.log("Doctors API Response:", data);

//             if (data.success) {
//                 setDoctors(data.doctors);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const changeAvailapility = async (docId) => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/admin/change-availability",
//                 { docId },
//                 { headers: { aToken } }
//             );
//             if (data.success) {
//                 toast.success(data.message);
//                 getAllDoctors();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const getAllAppointments = async () => {
//         setLoadingAppointments(true);
//         try {
//             const { data } = await axios.get(
//                 backendUrl + "/api/admin/appointments",
//                 { headers: { aToken } }
//             );

//             console.log("Appointments API Response:", data);

//             if (data.success) {
//                 setAppointments(data.appointments);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//         setLoadingAppointments(false);
//     };

//     const cancelAppointment = async (appointmentId) => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/admin/cancel-appointment",
//                 { appointmentId },
//                 { headers: { aToken } }
//             );
//             if (data.success) {
//                 toast.success(data.message);
//                 getAllAppointments();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const getDashData = async () => {
//         try {
//             const { data } = await axios.get(
//                 backendUrl + "/api/admin/dashboard",
//                 { headers: { aToken } }
//             );
//             if (data.success) {
//                 setDashData(data.dashData);
//                 console.log(data.dashData);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const value = {
//         aToken,
//         setAToken,
//         backendUrl,
//         doctors,
//         getAllDoctors,
//         changeAvailapility,
//         appointments,
//         setAppointments,
//         getAllAppointments,
//         cancelAppointment,
//         dashData,
//         getDashData,
//         loadingAppointments,
//     };

//     return (
//         <AdminContext.Provider value={value}>
//             {props.children}
//         </AdminContext.Provider>
//     );
// };

// export default AdminContextProvider;


import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(
        localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
    );

    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(null); // بدل false لـ null لأن البيانات كائن
    const [loadingDashData, setLoadingDashData] = useState(false); // إضافة حالة التحميل الخاصة بالداشبورد
    const [loadingAppointments, setLoadingAppointments] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/admin/all-doctors",
                {},
                { headers: { aToken } }
            );

            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
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
                getDashData(); // تحديث بيانات الداشبورد بعد الإلغاء
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
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
