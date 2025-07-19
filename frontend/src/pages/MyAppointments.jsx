// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "./../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const MyAppointments = () => {
//     const { backendUrl, token, getDoctorsData } = useContext(AppContext);

//     const [appointments, setAppointments] = useState([]);

//     const months = [
//         "",
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//     ];

//     const slotDateFormat = (slotDate) => {
//         const dateArray = slotDate.split("_");
//         return (
//             dateArray[0] +
//             " " +
//             months[Number(dateArray[1])] +
//             " " +
//             dateArray[2]
//         );
//     };

//     const navigate = useNavigate();

//     const getUserAppointments = async () => {
//         try {
//             const { data } = await axios.get(
//                 backendUrl + "/api/user/appointments",
//                 { headers: { token } }
//             );

//             if (data.success) {
//                 setAppointments(data.appointments.reverse());
//                 console.log(data.appointments);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         }
//     };

//     const cancelAppointMent = async (appointmentId) => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/user/cancel-appointment",
//                 { appointmentId },
//                 { headers: { token } }
//             );

//             if (data.success) {
//                 toast.success(data.message);
//                 getUserAppointments();
//                 getDoctorsData();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         }
//     };

//     const initPay = (order) => {
//         const options = {
//             key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//             amount: order.amount,
//             currency: order.currency,
//             name: "Appointment Payment",
//             description: "Appointment Payment",
//             order_id: order.id,
//             receipt: order.receipt,
//             handler: async (response) => {
//                 console.log(response);

//                 try {
//                     const { data } = await axios.post(
//                         backendUrl + "/api/user/verifyRazorpay",
//                         response,
//                         { headers: { token } }
//                     );
//                     if (data.success) {
//                         getUserAppointments();
//                         navigate("/my-appointments");
//                     }
//                 } catch (error) {
//                     console.log(error);
//                     toast.error(error.message);
//                 }
//             },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//     };

//     const appointmentRazorpay = async (appointmentId) => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/user/payment-razorpay",
//                 { appointmentId },
//                 { headers: { token } }
//             );

//             if (data.success) {
//                 initPay(data.order);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             getUserAppointments();
//         }
//     }, [token]);

//     return (
//         <div>
//             <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//                 My appointments
//             </p>
//             <div>
//                 {appointments.map((item, index) => (
//                     <div
//                         className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
//                         key={index}
//                     >
//                         <div>
//                             <img
//                                 className="w-32 bg-teal-50"
//                                 src={item.docData.image}
//                                 alt=""
//                             />
//                         </div>
//                         <div className="flex-1 text-sm text-zinc-600 ">
//                             <p className="text-neutral-800 font-semibold">
//                                 {item.docData.name}
//                             </p>
//                             <p>{item.docData.speciality}</p>
//                             <p className="text-zinc-700 font-medium mt-1">
//                                 Address:
//                             </p>
//                             <p className="text-xs">
//                                 {item.docData.address.line1}
//                             </p>
//                             <p className="text-xs">
//                                 {item.docData.address.line2}
//                             </p>
//                             <p className="text-xs mt-1">
//                                 <span className="text-sm text-neutral-700 font-medium">
//                                     Date & Time:
//                                 </span>
//                                 {slotDateFormat(item.slotDate)} |{item.slotTime}
//                             </p>
//                         </div>
//                         <div></div>
//                         <div className="flex flex-col gap-2 justify-end">
//                             {!item.cancelled &&
//                                 item.payment &&
//                                 !item.isCompleted && (
//                                     <button className="sm:min-w-48 py-2 border rounded-[6px] text-stone-500 bg-teal-50">
//                                         Paid
//                                     </button>
//                                 )}
//                             {!item.cancelled &&
//                                 !item.payment &&
//                                 !item.isCompleted && (
//                                     <button
//                                         onClick={() =>
//                                             appointmentRazorpay(item._id)
//                                         }
//                                         className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
//                                     >
//                                         Pay Online
//                                     </button>
//                                 )}
//                             {!item.cancelled && !item.isCompleted && (
//                                 <button
//                                     onClick={() => cancelAppointMent(item._id)}
//                                     className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
//                                 >
//                                     Cancel appointment
//                                 </button>
//                             )}
//                             {item.cancelled && !item.isCompleted && (
//                                 <button className="sm:min-w-48 py-2 border border-red-500 rounded-[6px] text-red-500">
//                                     Appointment cancelled
//                                 </button>
//                             )}
//                             {
//                                 item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded-[6px] text-green-500">Completed</button>
//                             }
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyAppointments;

// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const MyAppointments = () => {
//     const { backendUrl, token, getDoctorsData } = useContext(AppContext);
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const months = [
//         "",
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//     ];

//     const slotDateFormat = (slotDate) => {
//         if (!slotDate) return "";
//         const dateArray = slotDate.split("_");
//         return `${dateArray[0]} ${months[Number(dateArray[1])]} ${
//             dateArray[2]
//         }`;
//     };

//     const getUserAppointments = async () => {
//         if (!token) {
//             setError("You are not logged in.");
//             return;
//         }

//         setLoading(true);
//         setError("");

//         try {
//             const { data } = await axios.get(
//                 `${backendUrl}/api/user/appointments`,
//                 {
//                     headers: { token },
//                 }
//             );

//             if (data.success) {
//                 setAppointments(data.appointments.reverse());
//             } else {
//                 setError("Failed to fetch appointments.");
//             }
//         } catch (err) {
//             console.error(err);
//             setError(err.response?.data?.message || err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelAppointment = async (appointmentId) => {
//         try {
//             const { data } = await axios.delete(
//                 backendUrl + "/api/user/cancel-appointment",
//                 {
//                     data: { appointmentId },
//                     headers: { token },
//                 }
//             );

//             if (data.success) {
//                 toast.success(data.message);
//                 getUserAppointments();
//                 getDoctorsData();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         }
//     };

//     const initPay = (order) => {
//                 const options = {
//                     key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//                     amount: order.amount,
//                     currency: order.currency,
//                     name: "Appointment Payment",
//                     description: "Appointment Payment",
//                     order_id: order.id,
//                     receipt: order.receipt,
//                     handler: async (response) => {
//                         console.log(response);

//                         try {
//                             const { data } = await axios.post(
//                                 backendUrl + "/api/user/verifyRazorpay",
//                                 response,
//                                 { headers: { token } }
//                             );
//                             if (data.success) {
//                                 getUserAppointments();
//                                 navigate("/my-appointments");
//                             }
//                         } catch (error) {
//                             console.log(error);
//                             toast.error(error.message);
//                         }
//                     },
//                 };

//                 const rzp = new window.Razorpay(options);
//                 rzp.open();
//             };

//             const appointmentRazorpay = async (appointmentId) => {
//                 try {
//                     const { data } = await axios.post(
//                         backendUrl + "/api/user/payment-razorpay",
//                         { appointmentId },
//                         { headers: { token } }
//                     );

//                     if (data.success) {
//                         initPay(data.order);
//                     }
//                 } catch (error) {
//                     console.log(error);
//                     toast.error(error.message);
//                 }
//             };

//     useEffect(() => {
//         if (token) {
//             getUserAppointments();
//         }
//     }, [token]);

//     return (
//         <div>
//             <h2 className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//                 My Appointments
//             </h2>

//             {loading && <p>Loading appointments...</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             {!loading && !error && appointments.length === 0 && (
//                 <p>No appointments found.</p>
//             )}

//             {appointments.map((item, index) => (
//                 <div
//                     key={index}
//                     className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
//                 >
//                     <div>
//                         <img
//                             className="w-32 bg-teal-50"
//                             src={item.docData.image}
//                             alt={item.docData.name}
//                         />
//                     </div>
//                     <div className="flex-1 text-sm text-zinc-600">
//                         <p className="text-neutral-800 font-semibold">
//                             {item.docData.name}
//                         </p>
//                         <p>{item.docData.speciality}</p>
//                         <p className="text-zinc-700 font-medium mt-1">
//                             Address:
//                         </p>
//                         <p className="text-xs">{item.docData.address.line1}</p>
//                         <p className="text-xs">{item.docData.address.line2}</p>
//                         <p className="text-xs mt-1">
//                             <span className="text-sm text-neutral-700 font-medium">
//                                 Date & Time:{" "}
//                             </span>
//                             {slotDateFormat(item.slotDate)} | {item.slotTime}
//                         </p>
//                     </div>
//                     <div className="flex flex-col gap-2 justify-end">
//                         {!item.cancelled &&
//                             item.payment &&
//                             !item.isCompleted && (
//                                 <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-teal-50">
//                                     Paid
//                                 </button>
//                             )}
//                         {!item.cancelled &&
//                             !item.payment &&
//                             !item.isCompleted && (
//                                 <button
//                                     onClick={() =>
//                                         appointmentRazorpay(item._id)
//                                     }
//                                     className="text-sm text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
//                                 >
//                                     Pay Online
//                                 </button>
//                             )}
//                         {!item.cancelled && !item.isCompleted && (
//                             <button
//                                 onClick={() => cancelAppointment(item._id)}
//                                 className="text-sm text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
//                             >
//                                 Cancel Appointment
//                             </button>
//                         )}
//                         {item.cancelled && !item.isCompleted && (
//                             <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
//                                 Appointment Cancelled
//                             </button>
//                         )}
//                         {item.isCompleted && (
//                             <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
//                                 Completed
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default MyAppointments;

// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Loader from "../components/Loader"; // تأكد من المسار الصحيح

// const MyAppointments = () => {
//     const { backendUrl, token, getDoctorsData } = useContext(AppContext);
//     const [appointments, setAppointments] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const months = [
//         "",
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//     ];

//     const slotDateFormat = (slotDate) => {
//         if (!slotDate) return "";
//         const dateArray = slotDate.split("_");
//         return `${dateArray[0]} ${months[Number(dateArray[1])]} ${
//             dateArray[2]
//         }`;
//     };

//     const getUserAppointments = async () => {
//         if (!token) {
//             setError("You are not logged in.");
//             return;
//         }

//         setLoading(true);
//         setError("");

//         try {
//             const { data } = await axios.get(
//                 `${backendUrl}/api/user/appointments`,
//                 {
//                     headers: { token },
//                 }
//             );

//             if (data.success) {
//                 setAppointments(data.appointments.reverse());
//             } else {
//                 setError("Failed to fetch appointments.");
//             }
//         } catch (err) {
//             console.error(err);
//             setError(err.response?.data?.message || err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelAppointment = async (appointmentId) => {
//         try {
//             const { data } = await axios.delete(
//                 backendUrl + "/api/user/cancel-appointment",
//                 {
//                     data: { appointmentId },
//                     headers: { token },
//                 }
//             );

//             if (data.success) {
//                 toast.success(data.message);
//                 getUserAppointments();
//                 getDoctorsData();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         }
//     };

//     const initPay = (order) => {
//         const options = {
//             key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//             amount: order.amount,
//             currency: order.currency,
//             name: "Appointment Payment",
//             description: "Appointment Payment",
//             order_id: order.id,
//             receipt: order.receipt,
//             handler: async (response) => {
//                 console.log(response);

//                 try {
//                     const { data } = await axios.post(
//                         backendUrl + "/api/user/verifyRazorpay",
//                         response,
//                         { headers: { token } }
//                     );
//                     if (data.success) {
//                         getUserAppointments();
//                         navigate("/my-appointments");
//                     }
//                 } catch (error) {
//                     console.log(error);
//                     toast.error(error.message);
//                 }
//             },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//     };

//     const appointmentRazorpay = async (appointmentId) => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/user/payment-razorpay",
//                 { appointmentId },
//                 { headers: { token } }
//             );

//             if (data.success) {
//                 initPay(data.order);
//             } else {
//                 console.log(data);

//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             getUserAppointments();
//         }
//     }, [token]);

//     return (
//         <div>
//             <h2 className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//                 My Appointments
//             </h2>

//             {loading && (
//                 <div className="flex justify-center items-center min-h-[100px]">
//                     <Loader />
//                 </div>
//             )}

//             {error && <p className="text-red-500">{error}</p>}

//             {!loading && !error && appointments.length === 0 && (
//                 <p>No appointments found.</p>
//             )}

//             {!loading &&
//                 !error &&
//                 appointments.map((item, index) => (
//                     <div
//                         key={index}
//                         className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
//                     >
//                         <div>
//                             <img
//                                 className="bg-teal-50 h-32 w-32 object-cover object-top"
//                                 src={item.docData.image}
//                                 alt={item.docData.name}
//                             />
//                         </div>
//                         <div className="flex-1 text-sm text-zinc-600">
//                             <p className="text-neutral-800 font-semibold">
//                                 {item.docData.name}
//                             </p>
//                             <p>{item.docData.speciality}</p>
//                             <p className="text-zinc-700 font-medium mt-1">
//                                 Address:
//                             </p>
//                             <p className="text-xs">
//                                 {item.docData.address.line1}
//                             </p>
//                             <p className="text-xs">
//                                 {item.docData.address.line2}
//                             </p>
//                             <p className="text-xs mt-1">
//                                 <span className="text-sm text-neutral-700 font-medium">
//                                     Date & Time:{" "}
//                                 </span>
//                                 {slotDateFormat(item.slotDate)} |{" "}
//                                 {item.slotTime}
//                             </p>
//                         </div>
//                         <div className="flex flex-col gap-2 justify-end">
//                             {!item.cancelled &&
//                                 item.payment &&
//                                 !item.isCompleted && (
//                                     <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-teal-50">
//                                         Paid
//                                     </button>
//                                 )}
//                             {!item.cancelled &&
//                                 !item.payment &&
//                                 !item.isCompleted && (
//                                     <button
//                                         onClick={() =>
//                                             appointmentRazorpay(item._id)
//                                         }
//                                         className="text-sm text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
//                                     >
//                                         Pay Online
//                                     </button>
//                                 )}
//                             {!item.cancelled && !item.isCompleted && (
//                                 <button
//                                     onClick={() => cancelAppointment(item._id)}
//                                     className="text-sm text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
//                                 >
//                                     Cancel Appointment
//                                 </button>
//                             )}
//                             {item.cancelled && !item.isCompleted && (
//                                 <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
//                                     Appointment Cancelled
//                                 </button>
//                             )}
//                             {item.isCompleted && (
//                                 <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
//                                     Completed
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//         </div>
//     );
// };

// export default MyAppointments;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const MyAppointments = () => {
    const { backendUrl, token, getDoctorsData } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all"); // all, upcoming, completed, cancelled
    const navigate = useNavigate();

    const months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const slotDateFormat = (slotDate) => {
        if (!slotDate) return "";
        const dateArray = slotDate.split("_");
        return `${dateArray[0]} ${months[Number(dateArray[1])]} ${
            dateArray[2]
        }`;
    };

    // const getStatusColor = (appointment) => {
    //     if (appointment.cancelled) return "red";
    //     if (appointment.isCompleted) return "green";
    //     if (appointment.payment) return "green";
    //     // if (appointment.payment === "Online") return "green";

    //     // return "yellow";
    // };

    const getStatusColor = (appointment) => {
        if (appointment.cancelled) return "red";
        if (appointment.isCompleted) return "green";
        if (appointment.payment === "Online" || appointment.payment === "Cash")
            return "green";
        return "yellow"; // Pending
    };

    // const getStatusText = (appointment) => {
    //     if (appointment.cancelled) return "Cancelled";
    //     if (appointment.isCompleted) return "Completed";
    //     // if (appointment.payment) return "Confirmed";
    //     if (appointment.payment === "Online") return "Confirmed";
    //     return "Pending Payment";
    // };

    const getStatusText = (appointment) => {
        if (appointment.cancelled) return "Cancelled";
        if (appointment.isCompleted) return "Completed";
        if (appointment.payment === "Online") return "Confirmed";
        return "Pending Payment";
    };

    const getStatusIcon = (appointment) => {
        if (appointment.cancelled) {
            return (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            );
        }
        if (appointment.isCompleted) {
            return (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            );
        }
        if (appointment.payment) {
            return (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            );
        }
        return (
            <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        );
    };

    const getUserAppointments = async () => {
        if (!token) {
            setError("You are not logged in.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const { data } = await axios.get(
                `${backendUrl}/api/user/appointments`,
                {
                    headers: { token },
                }
            );

            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                setError("Failed to fetch appointments.");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.delete(
                backendUrl + "/api/user/cancel-appointment",
                {
                    data: { appointmentId },
                    headers: { token },
                }
            );

            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
                getDoctorsData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const paymentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/user/payment-stripe",
                { appointmentId },
                { headers: { token } }
            );

            if (data.sessionUrl) {
                window.location.href = data.sessionUrl;
            } else {
                toast.error("Failed to initiate Stripe payment.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const filteredAppointments = appointments.filter((appointment) => {
        if (filter === "all") return true;
        if (filter === "upcoming")
            return !appointment.cancelled && !appointment.isCompleted;
        if (filter === "completed") return appointment.isCompleted;
        if (filter === "cancelled") return appointment.cancelled;
        return true;
    });

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        My Appointments
                    </h1>
                    <p className="text-gray-600">
                        Manage and track your healthcare appointments
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Total
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {appointments.length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Upcoming
                                </p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {
                                        appointments.filter(
                                            (a) =>
                                                !a.cancelled && !a.isCompleted
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-yellow-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Completed
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {
                                        appointments.filter(
                                            (a) => a.isCompleted
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">
                                    Cancelled
                                </p>
                                <p className="text-2xl font-bold text-red-600">
                                    {
                                        appointments.filter((a) => a.cancelled)
                                            .length
                                    }
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-lg shadow-sm border mb-6">
                    <div className="flex flex-wrap gap-2 p-4">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                filter === "all"
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            All Appointments
                        </button>
                        <button
                            onClick={() => setFilter("upcoming")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                filter === "upcoming"
                                    ? "bg-yellow-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                filter === "completed"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setFilter("cancelled")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                filter === "cancelled"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            Cancelled
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredAppointments.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No appointments found
                        </h3>
                        <p className="text-green-600 mb-6">
                            {filter === "all"
                                ? "You haven't booked any appointments yet."
                                : `No ${filter} appointments found.`}
                        </p>
                        <button
                            onClick={() => navigate("/doctors")}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                            Book an Appointment
                        </button>
                    </div>
                )}

                {/* Appointments List */}
                {!loading && !error && filteredAppointments.length > 0 && (
                    <div className="space-y-4">
                        {filteredAppointments.map((appointment, index) => {
                            const statusColor = getStatusColor(appointment);
                            const statusText = getStatusText(appointment);
                            const statusIcon = getStatusIcon(appointment);

                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-sm border overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            {/* Doctor Image */}
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-24 h-24 rounded-lg object-cover border-2 border-gray-100"
                                                    src={
                                                        appointment.docData
                                                            .image
                                                    }
                                                    alt={
                                                        appointment.docData.name
                                                    }
                                                    onError={(e) => {
                                                        e.target.src =
                                                            "https://via.placeholder.com/96x96?text=DR";
                                                    }}
                                                />
                                            </div>

                                            {/* Appointment Details */}
                                            <div className="flex-1">
                                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div>
                                                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                                    Dr.{" "}
                                                                    {
                                                                        appointment
                                                                            .docData
                                                                            .name
                                                                    }
                                                                </h3>
                                                                <p className="text-green-600 font-medium mb-2">
                                                                    {
                                                                        appointment
                                                                            .docData
                                                                            .speciality
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div
                                                                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                                                                    statusColor ===
                                                                    "red"
                                                                        ? "bg-red-100 text-red-700"
                                                                        : statusColor ===
                                                                          "green"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : statusColor ===
                                                                          "green"
                                                                        ? "bg-green-100 text-green-700"
                                                                        : "bg-yellow-100 text-yellow-700"
                                                                }`}
                                                            >
                                                                {statusIcon}
                                                                {statusText}
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                                                    Appointment
                                                                    Details
                                                                </h4>
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                        <svg
                                                                            className="w-4 h-4 text-gray-400"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                            />
                                                                        </svg>
                                                                        <span className="font-medium">
                                                                            Date:
                                                                        </span>
                                                                        <span>
                                                                            {slotDateFormat(
                                                                                appointment.slotDate
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                        <svg
                                                                            className="w-4 h-4 text-gray-400"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                            />
                                                                        </svg>
                                                                        <span className="font-medium">
                                                                            Time:
                                                                        </span>
                                                                        <span>
                                                                            {
                                                                                appointment.slotTime
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                                                    Doctor's
                                                                    Address
                                                                </h4>
                                                                <div className="space-y-1 text-sm text-gray-600">
                                                                    <p>
                                                                        {appointment
                                                                            .docData
                                                                            .address
                                                                            ?.line1 ||
                                                                            "Address not available"}
                                                                    </p>
                                                                    {appointment
                                                                        .docData
                                                                        .address
                                                                        ?.line2 && (
                                                                        <p>
                                                                            {
                                                                                appointment
                                                                                    .docData
                                                                                    .address
                                                                                    .line2
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex flex-col gap-2 lg:w-48">
                                                        {!appointment.cancelled &&
                                                            !appointment.isCompleted && (
                                                                <>
                                                                    {appointment.payment ===
                                                                    "Pending" ? (
                                                                        <button
                                                                            onClick={() =>
                                                                                paymentStripe(
                                                                                    appointment._id
                                                                                )
                                                                            }
                                                                            //
                                                                            className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                                                        >
                                                                            <svg
                                                                                className="w-4 h-4"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={
                                                                                        2
                                                                                    }
                                                                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                                                />
                                                                            </svg>
                                                                            Pay
                                                                            Online
                                                                        </button>
                                                                    ) : (
                                                                        <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                                                                            <div className="flex items-center gap-2 text-green-700">
                                                                                <svg
                                                                                    className="w-4 h-4"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    viewBox="0 0 24 24"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth={
                                                                                            2
                                                                                        }
                                                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                                    />
                                                                                </svg>
                                                                                <span className="text-sm font-medium">
                                                                                    Payment
                                                                                    Confirmed
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    <button
                                                                        onClick={() =>
                                                                            cancelAppointment(
                                                                                appointment._id
                                                                            )
                                                                        }
                                                                        className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                d="M6 18L18 6M6 6l12 12"
                                                                            />
                                                                        </svg>
                                                                        Cancel
                                                                    </button>
                                                                </>
                                                            )}

                                                        {appointment.cancelled && (
                                                            <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
                                                                <div className="flex items-center gap-2 text-red-700">
                                                                    <svg
                                                                        className="w-4 h-4"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M6 18L18 6M6 6l12 12"
                                                                        />
                                                                    </svg>
                                                                    <span className="text-sm font-medium">
                                                                        Cancelled
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {appointment.isCompleted && (
                                                            <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                                                                <div className="flex items-center gap-2 text-green-700">
                                                                    <svg
                                                                        className="w-4 h-4"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                2
                                                                            }
                                                                            d="M5 13l4 4L19 7"
                                                                        />
                                                                    </svg>
                                                                    <span className="text-sm font-medium">
                                                                        Completed
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
