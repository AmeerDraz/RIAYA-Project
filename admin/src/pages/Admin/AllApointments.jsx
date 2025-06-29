// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "./../../assets/assets";
// import { MessageCircle } from "lucide-react"; // ✅ أيقونة من مكتبة lucide-react

// const AllAppointments = () => {
//     const { aToken, appointments, getAllAppointments, cancelAppointment } =
//         useContext(AdminContext);
//     const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

//     useEffect(() => {
//         if (aToken) {
//             getAllAppointments();
//         }
//     }, [aToken]);

//     return (
//         <div className="w-full max-w-6xl m-5">
//             <p className="mb-3 text-lg font-medium">All Appointments</p>

//             <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
//                 {/* Header Row */}
//                 <div className="hidden md:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_0.5fr_0.8fr] py-3 px-6 border-b gap-2 bg-gray-50 font-medium">
//                     <p>#</p>
//                     <p>Patient</p>
//                     <p>Age</p>
//                     <p>Date & Time</p>
//                     <p>Doctor</p>
//                     <p>Fees</p>
//                     <p>Contact</p>
//                     <p>Actions</p>
//                 </div>

//                 {appointments.map((item, index) => (
//                     <div
//                         className="flex flex-wrap justify-between gap-3 max-md:gap-2 md:grid md:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_0.5fr_0.8fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
//                         key={index}
//                     >
//                         <p className="max-sm:hidden">{index + 1}</p>

//                         {/* Patient */}
//                         <div className="flex items-center gap-2">
//                             <img
//                                 className="w-8 rounded-full"
//                                 src={item.userData.image}
//                                 alt=""
//                             />
//                             <p>{item.userData.name}</p>
//                         </div>

//                         {/* Age */}
//                         <p className="max-sm:hidden">
//                             {calculateAge(item.userData.dob)}
//                         </p>

//                         {/* Date & Time */}
//                         <p>
//                             {slotDateFormat(item.slotDate)}, {item.slotTime}
//                         </p>

//                         {/* Doctor */}
//                         <div className="flex items-center gap-2">
//                             <img
//                                 className="w-8 rounded-full bg-gray-200"
//                                 src={item.docData.image}
//                                 alt=""
//                             />
//                             <p>{item.docData.name}</p>
//                         </div>

//                         {/* Fees */}
//                         <p>
//                             {currency}
//                             {item.amount}
//                         </p>

//                         {/* Contact  */}
//                         <div className="flex justify-start items-center h-full">
//                             {item.userData.phone && (
//                                 <a
//                                     href={`https://wa.me/${item.userData.phone}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     title="Chat on WhatsApp"
//                                 >
//                                     <MessageCircle
//                                         size={25}
//                                         className="text-green-500"
//                                     />
//                                 </a>
//                             )}
//                         </div>

//                         {/* Cancel */}
//                         <div className="flex justify-start items-center h-full">
//                             {item.cancelled ? (
//                                 <p className="text-red-400 text-xs font-medium text-center">
//                                     Cancelled
//                                 </p>
//                             ) : item.isCompleted ? (
//                                 <p className="text-green-500 text-xs font-medium text-center">
//                                     Completed
//                                 </p>
//                             ) : (
//                                 <img
//                                     onClick={() => cancelAppointment(item._id)}
//                                     className="w-10 cursor-pointer"
//                                     src={assets.cancel_icon}
//                                     alt="Cancel"
//                                 />
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AllAppointments;

// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "./../../assets/assets";
// import { MessageCircle } from "lucide-react"; // ✅ أيقونة من مكتبة lucide-react
// import Loader from "../../components/Loader";

// const AllAppointments = () => {
//     const {
//         aToken,
//         appointments,
//         getAllAppointments,
//         cancelAppointment,
//         loadingAppointments,
//     } = useContext(AdminContext);
//     const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

//     useEffect(() => {
//         if (aToken) {
//             getAllAppointments();
//         }
//     }, [aToken]);

//     if (loadingAppointments) {
//         return (
//             <div className="flex justify-center items-center h-[70vh]">
//                 <Loader />
//             </div>
//         );
//     }

//     return (
//         <div className="w-full max-w-6xl m-5">
//             <p className="mb-3 text-lg font-medium">All Appointments</p>

//             <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
//                 {/* Header Row */}
//                 <div className="hidden md:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_0.5fr_0.8fr] py-3 px-6 border-b gap-2 bg-gray-50 font-medium">
//                     <p>#</p>
//                     <p>Patient</p>
//                     <p>Age</p>
//                     <p>Date & Time</p>
//                     <p>Doctor</p>
//                     <p>Fees</p>
//                     <p>Contact</p>
//                     <p>Actions</p>
//                 </div>

//                 {appointments.map((item, index) => (
//                     <div
//                         className="flex flex-wrap justify-between gap-3 max-md:gap-2 md:grid md:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_0.5fr_0.8fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
//                         key={index}
//                     >
//                         <p className="max-sm:hidden">{index + 1}</p>

//                         {/* Patient */}
//                         <div className="flex items-center gap-2">
//                             <img
//                                 className="w-8 rounded-full"
//                                 src={item.userData.image}
//                                 alt=""
//                             />
//                             <p>{item.userData.name}</p>
//                         </div>

//                         {/* Age */}
//                         <p className="max-sm:hidden">
//                             {calculateAge(item.userData.dob)}
//                         </p>

//                         {/* Date & Time */}
//                         <p>
//                             {slotDateFormat(item.slotDate)}, {item.slotTime}
//                         </p>

//                         {/* Doctor */}
//                         <div className="flex items-center gap-2">
//                             <img
//                                 className="w-8 rounded-full bg-gray-200"
//                                 src={item.docData.image}
//                                 alt=""
//                             />
//                             <p>{item.docData.name}</p>
//                         </div>

//                         {/* Fees */}
//                         <p>
//                             {currency}
//                             {item.amount}
//                         </p>

//                         {/* Contact  */}
//                         <div className="flex justify-start items-center h-full">
//                             {item.userData.phone && (
//                                 <a
//                                     href={`https://wa.me/${item.userData.phone}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     title="Chat on WhatsApp"
//                                 >
//                                     <MessageCircle
//                                         size={25}
//                                         className="text-green-500"
//                                     />
//                                 </a>
//                             )}
//                         </div>

//                         {/* Cancel */}
//                         <div className="flex justify-start items-center h-full">
//                             {item.cancelled ? (
//                                 <p className="text-red-400 text-xs font-medium text-center">
//                                     Cancelled
//                                 </p>
//                             ) : item.isCompleted ? (
//                                 <p className="text-green-500 text-xs font-medium text-center">
//                                     Completed
//                                 </p>
//                             ) : (
//                                 <img
//                                     onClick={() => cancelAppointment(item._id)}
//                                     className="w-10 cursor-pointer"
//                                     src={assets.cancel_icon}
//                                     alt="Cancel"
//                                 />
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AllAppointments;

import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "./../../assets/assets";
import { MessageCircle } from "lucide-react";
import Loader from "../../components/Loader";

const AllAppointments = () => {
    const {
        aToken,
        appointments,
        getAllAppointments,
        cancelAppointment,
        loadingAppointments,
    } = useContext(AdminContext);
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken]);

    if (loadingAppointments) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl m-5">
            <p className="mb-3 text-lg font-medium">All Appointments</p>

            <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_0.5fr_0.8fr] py-3 px-6 border-b gap-2 bg-gray-50 font-medium">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Doctor</p>
                    <p>Fees</p>
                    <p>Contact</p>
                    <p>Actions</p>
                </div>

                {appointments.reverse().map((item, index) => (
                    <div
                        className="flex flex-wrap justify-between gap-3 max-md:gap-2 md:grid md:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_0.5fr_0.8fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                        key={index}
                    >
                        <p className="max-sm:hidden">{index + 1}</p>

                        {/* Patient */}
                        <div className="flex items-center gap-2">
                            <img
                                className="min-w-8 min-h-8 w-8 h-8 object-cover object-top rounded-full  bg-gray-300"
                                src={
                                    item.userData?.image ||
                                    assets.default_user_image
                                }
                                alt={item.userData?.name || "Patient"}
                            />
                            <p>{item.userData?.name || "-"}</p>
                        </div>

                        {/* Age */}
                        <p className="max-sm:hidden">
                            {item.userData?.dob
                                ? calculateAge(item.userData.dob)
                                : "-"}
                        </p>

                        {/* Date & Time */}
                        <p>
                            {item.slotDate
                                ? slotDateFormat(item.slotDate)
                                : "-"}
                            , {item.slotTime || "-"}
                        </p>

                        {/* Doctor */}
                        <div className="flex items-center gap-2">
                            <img
                                className="min-w-8 min-h-8 w-8 h-8 object-cover object-top rounded-full bg-gray-300"
                                src={
                                    item.docData?.image ||
                                    assets.default_user_image
                                }
                                alt={assets.doctor_icon}
                            />
                            <p>{item.docData?.name || "-"}</p>
                        </div>

                        {/* Fees */}
                        <p>
                            {currency}
                            {item.amount || "-"}
                        </p>

                        {/* Contact  */}
                        <div className="flex justify-start items-center h-full">
                            {item.userData?.phone ? (
                                <a
                                    href={`https://wa.me/${item.userData.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Chat on WhatsApp"
                                >
                                    <MessageCircle
                                        size={25}
                                        className="text-green-500"
                                    />
                                </a>
                            ) : (
                                "-"
                            )}
                        </div>

                        {/* Cancel */}
                        <div className="flex justify-start items-center h-full">
                            {item.cancelled ? (
                                <p className="text-red-400 text-xs font-medium text-center">
                                    Cancelled
                                </p>
                            ) : item.isCompleted ? (
                                <p className="text-green-500 text-xs font-medium text-center">
                                    Completed
                                </p>
                            ) : (
                                <img
                                    onClick={() => cancelAppointment(item._id)}
                                    className="w-10 cursor-pointer"
                                    src={assets.cancel_icon}
                                    alt="Cancel"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllAppointments;
