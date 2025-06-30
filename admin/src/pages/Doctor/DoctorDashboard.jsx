// import React, { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { assets } from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";

// const DoctorDashboard = () => {
//     const {
//         dToken,
//         dashData,
//         setDashData,
//         getDashData,
//         completeAppointment,
//         cancelAppointment,
//     } = useContext(DoctorContext);

//     const { currency, slotDateFormat } = useContext(AppContext);

//     useEffect(() => {
//         if (dToken) {
//             getDashData();
//         }
//     }, [dToken]);

//     return (
//         dashData && (
//             <div className="w-full px-4 py-5 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
//                 {/* Cards grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
//                     {[
//                         {
//                             icon: assets.earning_icon,
//                             label: "Earnings",
//                             value: `${currency} ${dashData.earnings}`,
//                         },
//                         {
//                             icon: assets.appointments_icon,
//                             label: "Appointments",
//                             value: dashData.appointments,
//                         },
//                         {
//                             icon: assets.patients_icon,
//                             label: "Patients",
//                             value: dashData.patients,
//                         },
//                     ].map(({ icon, label, value }) => (
//                         <div
//                             key={label}
//                             className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-lg border shadow-sm hover:shadow-md transition-all"
//                         >
//                             <img
//                                 src={icon}
//                                 alt={label}
//                                 className="w-12 sm:w-14 h-12 sm:h-14 object-contain flex-shrink-0"
//                             />
//                             <div>
//                                 <p className="text-lg sm:text-xl font-bold text-gray-700">
//                                     {value}
//                                 </p>
//                                 <p className="text-sm sm:text-base text-gray-500">
//                                     {label}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Latest Bookings */}
//                 <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
//                     <div className="flex items-center gap-2 px-4 py-4 border-b bg-gray-50">
//                         <img
//                             src={assets.list_icon}
//                             alt="List icon"
//                             className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
//                         />
//                         <p className="font-semibold text-base sm:text-lg text-gray-700">
//                             Latest Bookings
//                         </p>
//                     </div>

//                     <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto">
//                         {dashData.latestAppointments.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 sm:py-4 border-b hover:bg-gray-50 transition-all"
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <img
//                                         className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
//                                         src={item.userData.image}
//                                         alt={item.userData.name}
//                                     />
//                                     <div>
//                                         <p className="text-sm sm:text-base text-gray-800 font-medium truncate max-w-[200px] sm:max-w-[300px]">
//                                             {item.userData.name}
//                                         </p>
//                                         <p className="text-xs sm:text-sm text-gray-500">
//                                             {slotDateFormat(item.slotDate)}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Actoin */}
//                                 {item.cancelled ? (
//                                     <p className="text-red-400 text-xs font-medium px-2">
//                                         Cancelled
//                                     </p>
//                                 ) : item.isCompleted ? (
//                                     <p className="text-green-500 text-xs font-medium px-2">
//                                         Completed
//                                     </p>
//                                 ) : (
//                                     <div className="flex gap-2 justify-start items-center px-1">
//                                         <img
//                                             onClick={() =>
//                                                 cancelAppointment(item._id)
//                                             }
//                                             className="
//                                                                     w-10 cursor-pointer"
//                                             src={assets.cancel_icon}
//                                             alt=""
//                                         />
//                                         <img
//                                             onClick={() =>
//                                                 completeAppointment(item._id)
//                                             }
//                                             className="
//                                                                     w-10 cursor-pointer"
//                                             src={assets.tick_icon}
//                                             alt=""
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         )
//     );
// };

// export default DoctorDashboard;

// import React, { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { assets } from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";

// const DoctorDashboard = () => {
//     const {
//         dToken,
//         dashData,
//         getDashData,
//         completeAppointment,
//         cancelAppointment,
//     } = useContext(DoctorContext);

//     const { currency, slotDateFormat } = useContext(AppContext);

//     useEffect(() => {
//         if (dToken) {
//             getDashData();
//         }
//     }, [dToken]);

//     return (
//         dashData && (
//             <div className="w-full px-4 py-5 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
//                 {/* Cards grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
//                     {[
//                         {
//                             icon: assets.earning_icon,
//                             label: "Earnings",
//                             value: `${currency} ${dashData.earnings}`,
//                         },
//                         {
//                             icon: assets.appointments_icon,
//                             label: "Appointments",
//                             value: dashData.appointments,
//                         },
//                         {
//                             icon: assets.patients_icon,
//                             label: "Patients",
//                             value: dashData.patients,
//                         },
//                     ].map(({ icon, label, value }) => (
//                         <div
//                             key={label}
//                             className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-lg border shadow-sm hover:shadow-md transition-all"
//                         >
//                             <img
//                                 src={icon}
//                                 alt={label}
//                                 className="w-12 sm:w-14 h-12 sm:h-14 object-contain flex-shrink-0"
//                             />
//                             <div>
//                                 <p className="text-lg sm:text-xl font-bold text-gray-700">
//                                     {value}
//                                 </p>
//                                 <p className="text-sm sm:text-base text-gray-500">
//                                     {label}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Latest Bookings */}
//                 <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
//                     <div className="flex items-center gap-2 px-4 py-4 border-b bg-gray-50">
//                         <img
//                             src={assets.list_icon}
//                             alt="List icon"
//                             className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
//                         />
//                         <p className="font-semibold text-base sm:text-lg text-gray-700">
//                             Latest Bookings
//                         </p>
//                     </div>

//                     <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto">
//                         {Array.isArray(dashData.latestAppointments) &&
//                             dashData.latestAppointments.map((item, index) => (
//                                 <div
//                                     key={index}
//                                     className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 sm:py-4 border-b hover:bg-gray-50 transition-all"
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <img
//                                             className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
//                                             src={item.userData.image}
//                                             alt={item.userData.name}
//                                         />
//                                         <div>
//                                             <p className="text-sm sm:text-base text-gray-800 font-medium truncate max-w-[200px] sm:max-w-[300px]">
//                                                 {item.userData.name}
//                                             </p>
//                                             <p className="text-xs sm:text-sm text-gray-500">
//                                                 {slotDateFormat(item.slotDate)}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     {/* Action */}
//                                     {item.cancelled ? (
//                                         <p className="text-red-400 text-xs font-medium px-2">
//                                             Cancelled
//                                         </p>
//                                     ) : item.isCompleted ? (
//                                         <p className="text-green-500 text-xs font-medium px-2">
//                                             Completed
//                                         </p>
//                                     ) : (
//                                         <div className="flex gap-2 justify-start items-center px-1">
//                                             <img
//                                                 onClick={() =>
//                                                     cancelAppointment(item._id)
//                                                 }
//                                                 className="w-10 cursor-pointer"
//                                                 src={assets.cancel_icon}
//                                                 alt="Cancel"
//                                             />
//                                             <img
//                                                 onClick={() =>
//                                                     completeAppointment(
//                                                         item._id
//                                                     )
//                                                 }
//                                                 className="w-10 cursor-pointer"
//                                                 src={assets.tick_icon}
//                                                 alt="Complete"
//                                             />
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                     </div>
//                 </div>
//             </div>
//         )
//     );
// };

// export default DoctorDashboard;

import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";

const DoctorDashboard = () => {
    const {
        dToken,
        dashData,
        getDashData,
        completeAppointment,
        cancelAppointment,
    } = useContext(DoctorContext);

    const { currency, slotDateFormat } = useContext(AppContext);

    const [loading, setLoading] = useState(false); // تحميل أولي للصفحة
    const [loadingBookings, setLoadingBookings] = useState(false); // تحميل خاص بالحجوزات فقط

    useEffect(() => {
        const fetchDashData = async () => {
            try {
                setLoading(true);
                await getDashData();
            } finally {
                setLoading(false);
            }
        };

        if (dToken) {
            fetchDashData();
        }
    }, [dToken]);

    // تحديث فقط Latest Bookings مع لودر داخلي صغير
    const handleAppointmentAction = async (id, actionType) => {
        try {
            setLoadingBookings(true);
            if (actionType === "complete") {
                await completeAppointment(id);
            } else if (actionType === "cancel") {
                await cancelAppointment(id);
            }
            await getDashData();
        } finally {
            setLoadingBookings(false);
        }
    };

    if (loading || !dashData) return <Loader />; // لودر التحميل الأولي

    return (
        <div className="w-full px-4 py-5 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                {[
                    {
                        icon: assets.earning_icon,
                        label: "Earnings",
                        value: `${currency} ${dashData.earnings}`,
                    },
                    {
                        icon: assets.appointments_icon,
                        label: "Appointments",
                        value: dashData.appointments,
                    },
                    {
                        icon: assets.patients_icon,
                        label: "Patients",
                        value: dashData.patients,
                    },
                ].map(({ icon, label, value }) => (
                    <div
                        key={label}
                        className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-lg border shadow-sm hover:shadow-md transition-all"
                    >
                        <img
                            src={icon}
                            alt={label}
                            className="w-12 sm:w-14 h-12 sm:h-14 object-contain flex-shrink-0"
                        />
                        <div>
                            <p className="text-lg sm:text-xl font-bold text-gray-700">
                                {value}
                            </p>
                            <p className="text-sm sm:text-base text-gray-500">
                                {label}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Latest Bookings */}
            <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
                <div className="flex items-center gap-2 px-4 py-4 border-b bg-gray-50">
                    <img
                        src={assets.list_icon}
                        alt="List icon"
                        className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
                    />
                    <p className="font-semibold text-base sm:text-lg text-gray-700">
                        Latest Bookings
                    </p>
                </div>

                {/* Loader داخل جزء Latest Bookings */}
                {loadingBookings ? (
                    <div className="flex justify-center py-10">
                        <Loader />
                    </div>
                ) : (
                    <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto">
                        {Array.isArray(dashData.latestAppointments) &&
                            dashData.latestAppointments.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 sm:py-4 border-b hover:bg-gray-50 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                                            src={item.userData.image}
                                            alt={item.userData.name}
                                        />
                                        <div>
                                            <p className="text-sm sm:text-base text-gray-800 font-medium truncate max-w-[200px] sm:max-w-[300px]">
                                                {item.userData.name}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-500">
                                                {slotDateFormat(item.slotDate)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action */}
                                    {item.cancelled ? (
                                        <p className="text-red-400 text-xs font-medium px-2">
                                            Cancelled
                                        </p>
                                    ) : item.isCompleted ? (
                                        <p className="text-green-500 text-xs font-medium px-2">
                                            Completed
                                        </p>
                                    ) : (
                                        <div className="flex gap-2 justify-start items-center px-1">
                                            <img
                                                onClick={() =>
                                                    handleAppointmentAction(
                                                        item._id,
                                                        "cancel"
                                                    )
                                                }
                                                className="w-10 cursor-pointer"
                                                src={assets.cancel_icon}
                                                alt="Cancel"
                                            />
                                            <img
                                                onClick={() =>
                                                    handleAppointmentAction(
                                                        item._id,
                                                        "complete"
                                                    )
                                                }
                                                className="w-10 cursor-pointer"
                                                src={assets.tick_icon}
                                                alt="Complete"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorDashboard;
