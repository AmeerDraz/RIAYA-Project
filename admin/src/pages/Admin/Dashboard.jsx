// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { assets } from "./../../assets/assets";
// import { AppContext } from "../../context/AppContext";

// const Dashboard = () => {
//     const { aToken, getDashData, cancelAppointment, dashData } =
//         useContext(AdminContext);
//     const { slotDateFormat } = useContext(AppContext);

//     useEffect(() => {
//         if (aToken) {
//             getDashData();
//         }
//     }, [aToken]);

//     return (
//         dashData && (
//             <div className="px-4 py-5 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
//                 {/* Cards grid */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
//                     {[
//                         {
//                             icon: assets.doctor_icon,
//                             label: "Doctors",
//                             value: dashData.doctors,
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
//                                         src={item.docData.image}
//                                         alt={item.docData.name}
//                                     />
//                                     <div>
//                                         <p className="text-sm sm:text-base text-gray-800 font-medium truncate max-w-[200px] sm:max-w-[300px]">
//                                             {item.docData.name}
//                                         </p>
//                                         <p className="text-xs sm:text-sm text-gray-500">
//                                             {slotDateFormat(item.slotDate)}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {item.cancelled ? (
//                                     <p className="text-red-500 text-xs sm:text-sm font-semibold text-center sm:text-right">
//                                         Cancelled
//                                     </p>
//                                 ) : item.isCompleted ? (
//                                     <p className="text-green-500 text-xs font-medium text-center">
//                                         Completed
//                                     </p>
//                                 ) : (
//                                     <button
//                                         onClick={() =>
//                                             cancelAppointment(item._id)
//                                         }
//                                         className="flex justify-center sm:justify-end"
//                                         aria-label={`Cancel appointment with ${item.docData.name}`}
//                                     >
//                                         <img
//                                             className="w-8 h-8 sm:w-9 sm:h-9 cursor-pointer hover:opacity-75 transition-opacity"
//                                             src={assets.cancel_icon}
//                                             alt="Cancel appointment"
//                                         />
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         )
//     );
// };

// export default Dashboard;




// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { assets } from "./../../assets/assets";
// import { AppContext } from "../../context/AppContext";
// import Loader from "../../components/Loader";

// const Dashboard = () => {
//     const {
//         aToken,
//         getDashData,
//         cancelAppointment,
//         dashData,
//         loadingDashData,
//     } = useContext(AdminContext);
//     const { slotDateFormat } = useContext(AppContext);

//     useEffect(() => {
//         if (aToken) {
//             getDashData();
//         }
//     }, [aToken]);

//     // لو البيانات لسا ما وصلتنا او جارِ التحميل نعرض الـ Loader
//     if (loadingDashData || !dashData) {
//         return (
//             <div className="flex justify-center items-center h-[70vh]">
//                 <Loader />
//             </div>
//         );
//     }

//     return (
//         <div className="px-4 py-5 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
//             {/* Cards grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
//                 {[
//                     {
//                         icon: assets.doctor_icon,
//                         label: "Doctors",
//                         value: dashData.doctors,
//                     },
//                     {
//                         icon: assets.appointments_icon,
//                         label: "Appointments",
//                         value: dashData.appointments,
//                     },
//                     {
//                         icon: assets.patients_icon,
//                         label: "Patients",
//                         value: dashData.patients,
//                     },
//                 ].map(({ icon, label, value }) => (
//                     <div
//                         key={label}
//                         className="flex items-center gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-lg border shadow-sm hover:shadow-md transition-all"
//                     >
//                         <img
//                             src={icon}
//                             alt={label}
//                             className="w-12 sm:w-14 h-12 sm:h-14 object-contain flex-shrink-0"
//                         />
//                         <div>
//                             <p className="text-lg sm:text-xl font-bold text-gray-700">
//                                 {value}
//                             </p>
//                             <p className="text-sm sm:text-base text-gray-500">
//                                 {label}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Latest Bookings */}
//             <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
//                 <div className="flex items-center gap-2 px-4 py-4 border-b bg-gray-50">
//                     <img
//                         src={assets.list_icon}
//                         alt="List icon"
//                         className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
//                     />
//                     <p className="font-semibold text-base sm:text-lg text-gray-700">
//                         Latest Bookings
//                     </p>
//                 </div>

//                 <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto">
//                     {dashData.latestAppointments.map((item, index) => (
//                         <div
//                             key={index}
//                             className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 sm:py-4 border-b hover:bg-gray-50 transition-all"
//                         >
//                             <div className="flex items-center gap-3">
//                                 <img
//                                     className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
//                                     src={item.docData.image}
//                                     alt={item.docData.name}
//                                 />
//                                 <div>
//                                     <p className="text-sm sm:text-base text-gray-800 font-medium truncate max-w-[200px] sm:max-w-[300px]">
//                                         {item.docData.name}
//                                     </p>
//                                     <p className="text-xs sm:text-sm text-gray-500">
//                                         {slotDateFormat(item.slotDate)}
//                                     </p>
//                                 </div>
//                             </div>

//                             {item.cancelled ? (
//                                 <p className="text-red-500 text-xs sm:text-sm font-semibold text-center sm:text-right">
//                                     Cancelled
//                                 </p>
//                             ) : item.isCompleted ? (
//                                 <p className="text-green-500 text-xs font-medium text-center">
//                                     Completed
//                                 </p>
//                             ) : (
//                                 <button
//                                     onClick={() => cancelAppointment(item._id)}
//                                     className="flex justify-center sm:justify-end"
//                                     aria-label={`Cancel appointment with ${item.docData.name}`}
//                                 >
//                                     <img
//                                         className="w-8 h-8 sm:w-9 sm:h-9 cursor-pointer hover:opacity-75 transition-opacity"
//                                         src={assets.cancel_icon}
//                                         alt="Cancel appointment"
//                                     />
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "./../../assets/assets";
import { AppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";

const Dashboard = () => {
    const {
        aToken,
        getDashData,
        cancelAppointment,
        dashData,
        loadingDashData,
    } = useContext(AdminContext);
    const { slotDateFormat } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    if (loadingDashData || !dashData) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="px-4 py-5 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                {[
                    {
                        icon: assets.doctor_icon,
                        label: "Doctors",
                        value: dashData.doctors ?? 0,
                    },
                    {
                        icon: assets.appointments_icon,
                        label: "Appointments",
                        value: dashData.appointments ?? 0,
                    },
                    {
                        icon: assets.patients_icon,
                        label: "Patients",
                        value: dashData.patients ?? 0, // لو patients مش موجودة يطبع 0
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

                <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto">
                    {dashData.latestAppointments.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 sm:py-4 border-b hover:bg-gray-50 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                                    src={item.docData.image}
                                    alt={item.docData.name}
                                />
                                <div>
                                    <p className="text-sm sm:text-base text-gray-800 font-medium truncate max-w-[200px] sm:max-w-[300px]">
                                        {item.docData.name}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        {slotDateFormat(item.slotDate)}
                                    </p>
                                </div>
                            </div>

                            {item.cancelled ? (
                                <p className="text-red-500 text-xs sm:text-sm font-semibold text-center sm:text-right">
                                    Cancelled
                                </p>
                            ) : item.isCompleted ? (
                                <p className="text-green-500 text-xs font-medium text-center">
                                    Completed
                                </p>
                            ) : (
                                <button
                                    onClick={() => cancelAppointment(item._id)}
                                    className="flex justify-center sm:justify-end"
                                    aria-label={`Cancel appointment with ${item.docData.name}`}
                                >
                                    <img
                                        className="w-8 h-8 sm:w-9 sm:h-9 cursor-pointer hover:opacity-75 transition-opacity"
                                        src={assets.cancel_icon}
                                        alt="Cancel appointment"
                                    />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
