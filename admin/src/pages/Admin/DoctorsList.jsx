// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";

// const DoctorsList = () => {
//     const { doctors, aToken, getAllDoctors, changeAvailapility } =
//         useContext(AdminContext);

//     useEffect(() => {
//         if (aToken) {
//             getAllDoctors();
//         }
//     }, [aToken]);

//     return (
//         <div className="  m-5 max-h-[90vh] overflow-y-scroll">
//             <h1 className="text-lg font-medium">All Doctors</h1>
//             <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
//                 {doctors.map((item, index) => (
//                     <div
//                         className="border border-teal-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
//                         key={index}
//                     >
//                         <img
//                             className="w-56 bg-teal-50 group-hover:bg-primary hover:scale-105 transition-all duration-500"
//                             src={item.image}
//                             alt=""
//                         />
//                         <div className="p-4 ">
//                             <p className="text-neutral-800 text-lg font-medium">
//                                 {item.name}
//                             </p>
//                             <p className="text-zinc-600 text-sm">
//                                 {item.speciality}
//                             </p>
//                             <div className="mt-2 flex items-center gap-1 text-sm">
//                                 <input
//                                     onChange={() =>
//                                         changeAvailapility(item._id)
//                                     }
//                                     type="checkbox"
//                                     checked={item.available}
//                                 />
//                                 <p>Available</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DoctorsList;

// ************************************/

// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";

// const DoctorsList = () => {
//     const { doctors, aToken, getAllDoctors, changeAvailapility } =
//         useContext(AdminContext);

//     useEffect(() => {
//         if (aToken) {
//             getAllDoctors();
//         }
//     }, [aToken]);

//     // لو الدكاترة ما موجودين أو فارغين نعرض رسالة
//     if (!doctors || doctors.length === 0) {
//         return (
//             <div className="m-5">
//                 <h1 className="text-lg font-medium">All Doctors</h1>
//                 <p className="mt-4 text-gray-500">No doctors found.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="m-5 max-h-[90vh] overflow-y-scroll">
//             <h1 className="text-lg font-medium">All Doctors</h1>
//             <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
//                 {doctors.map((item, index) => (
//                     <div
//                         className="border border-teal-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
//                         key={item._id || index}
//                     >
//                         <img
//                             className="w-56 bg-teal-50 group-hover:bg-primary hover:scale-105 transition-all duration-500 h-[220px] w-full object-cover"
//                             src={item.image}
//                             alt={item.name}
//                         />
//                         <div className="p-4">
//                             <p className="text-neutral-800 text-lg font-medium">
//                                 {item.name}
//                             </p>
//                             <p className="text-zinc-600 text-sm">
//                                 {item.speciality}
//                             </p>
//                             <div className="mt-2 flex items-center gap-1 text-sm">
//                                 <input
//                                     onChange={() =>
//                                         changeAvailapility(item._id)
//                                     }
//                                     type="checkbox"
//                                     checked={item.available}
//                                 />
//                                 <p>Available</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DoctorsList;

// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";

// import Loader from "../../components/Loader";

// const DoctorsList = () => {
//     const {
//         doctors,
//         aToken,
//         getAllDoctors,
//         changeAvailapility,
//         loadingDoctors,
//     } = useContext(AdminContext);

//     useEffect(() => {
//         if (aToken) {
//             getAllDoctors();
//         }
//     }, [aToken]);

//     // أثناء التحميل
//     if (loadingDoctors) {
//         return (
//             <div className="m-5 flex justify-center items-center h-[70vh]">
//                 <Loader />
//             </div>
//         );
//     }

//     // لو الدكاترة غير موجودين
//     if (!doctors || doctors.length === 0) {
//         return (
//             <div className="m-5">
//                 <h1 className="text-lg font-medium">All Doctors</h1>
//                 <p className="mt-4 text-gray-500">No doctors found.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="m-5 max-h-[90vh] overflow-y-scroll">
//             <h1 className="text-lg font-medium">All Doctors</h1>
//             <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
//                 {doctors.map((item, index) => (
//                     <div
//                         className="border border-teal-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
//                         key={item._id || index}
//                     >
//                         <img
//                             className="w-56 bg-teal-50 group-hover:bg-primary hover:scale-105 transition-all duration-500 h-[220px] w-full object-cover"
//                             src={item.image}
//                             alt={item.name}
//                         />
//                         <div className="p-4">
//                             <p className="text-neutral-800 text-lg font-medium">
//                                 {item.name}
//                             </p>
//                             <p className="text-zinc-600 text-sm">
//                                 {item.speciality}
//                             </p>
//                             <div className="mt-2 flex items-center gap-1 text-sm">
//                                 <input
//                                     onChange={() =>
//                                         changeAvailapility(item._id)
//                                     }
//                                     type="checkbox"
//                                     checked={item.available}
//                                 />
//                                 <p>Available</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DoctorsList;

// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import Loader from "../../components/Loader";

// const DoctorsList = () => {
//     const {
//         doctors,
//         aToken,
//         getAllDoctors,
//         changeAvailapility,
//         loadingDoctors,
//     } = useContext(AdminContext);

//     useEffect(() => {
//         if (aToken) {
//             console.log("Token موجود: ", aToken);
//             getAllDoctors();
//         } else {
//             console.warn("لا يوجد aToken في localStorage");
//         }
//     }, [aToken]);

//     console.log("Current doctors state: ", doctors); // ✅ لمعرفة حالة الستيت داخل الكومبوننت

//     if (loadingDoctors) {
//         return (
//             <div className="m-5 flex justify-center items-center h-[70vh]">
//                 <Loader />
//             </div>
//         );
//     }

//     if (!doctors || doctors.length === 0) {
//         return (
//             <div className="m-5">
//                 <h1 className="text-lg font-medium">All Doctors</h1>
//                 <p className="mt-4 text-gray-500">No doctors found.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="m-5 max-h-[90vh] overflow-y-scroll">
//             <h1 className="text-lg font-medium">All Doctors</h1>
//             <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
//                 {doctors.map((item, index) => (
//                     <div
//                         className="border border-teal-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
//                         key={item._id || index}
//                     >
//                         <img
//                             className="w-56 bg-teal-50  hover:scale-105 transition-all duration-500 h-[220px] w-[260px] object-cover object-top"
//                             src={item.image}
//                             alt={item.name}
//                         />
//                         <div className="p-4">
//                             <p className="text-neutral-800 text-lg font-medium">
//                                 {item.name}
//                             </p>
//                             <p className="text-zinc-600 text-sm">
//                                 {item.speciality}
//                             </p>
//                             <div className="mt-2 flex items-center gap-1 text-sm">
//                                 <input
//                                     onChange={() =>
//                                         changeAvailapility(item._id)
//                                     }
//                                     type="checkbox"
//                                     checked={item.available}
//                                 />
//                                 <p>Available</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DoctorsList;

// import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AdminContext } from "../../context/AdminContext";
// import Loader from "../../components/Loader";

// const DoctorsList = () => {
// const navigate = useNavigate();
// const {
// doctors,
// aToken,
// getAllDoctors,
// changeAvailapility,
// loadingDoctors,
//     } = useContext(AdminContext);
//     useEffect(() => {
//         if (aToken) {
//             console.log("Token موجود: ", aToken);
//             getAllDoctors();
//         } else {
//             console.warn("لا يوجد aToken في localStorage");
//         }
//     }, [aToken]);

//     console.log("Current doctors state: ", doctors); // ✅ لمعرفة حالة الستيت داخل الكومبوننت

//     if (loadingDoctors) {
//         return (
//             <div className="m-5 flex justify-center items-center h-[70vh]">
//                 <Loader />
//             </div>
//         );
//     }

//     if (!doctors || doctors.length === 0) {
//         return (
//             <div className="m-5">
//                 <h1 className="text-lg font-medium">All Doctors</h1>
//                 <p className="mt-4 text-gray-500">No doctors found.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="m-5 max-h-[90vh] overflow-y-scroll">
//             <h1 className="text-lg font-medium">All Doctors</h1>
//             <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
//                 {doctors.map((item, index) => (
//                     <div
//                         className="border border-teal-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
//                         key={item._id || index}
//                     >
//                         <img
//                             className="w-56 bg-teal-50  hover:scale-105 transition-all duration-500 h-[220px] w-[260px] object-cover object-top"
//                             src={item.image || "/placeholder.svg"}
//                             alt={item.name}
//                         />
//                         <div className="p-4">
//                             <p className="text-neutral-800 text-lg font-medium">
//                                 {item.name}
//                             </p>
//                             <p className="text-zinc-600 text-sm">
//                                 {item.speciality}
//                             </p>
//                             <div className="mt-2 flex items-center gap-1 text-sm">
//                                 <input
//                                     onChange={() =>
//                                         changeAvailapility(item._id)
//                                     }
//                                     type="checkbox"
//                                     checked={item.available}
//                                 />
//                                 <p>Available</p>
//                             </div>

//                             {/* زر الانتقال إلى ViewDoctor */}
//                             <button
//                                 onClick={() => navigate(`/view-doctor/${item._id}`)}
//                                 className="w-full mt-3 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
//                             >
//                                 View Doctor
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DoctorsList;

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import Loader from "../../components/Loader";

const DoctorsList = () => {
    const navigate = useNavigate();
    const {
        doctors,
        aToken,
        getAllDoctors,
        loadingDoctors,
    } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            console.log("Token موجود: ", aToken);
            getAllDoctors();
        } else {
            console.warn("لا يوجد aToken في localStorage");
        }
    }, [aToken]);

    console.log("Current doctors state: ", doctors); // ✅ لمعرفة حالة الستيت داخل الكومبوننت

    if (loadingDoctors) {
        return (
            <div className="m-5 flex justify-center items-center h-[70vh]">
                <Loader />
            </div>
        );
    }

    if (!doctors || doctors.length === 0) {
        return (
            <div className="m-5">
                <h1 className="text-lg font-medium">All Doctors</h1>
                <p className="mt-4 text-gray-500">No doctors found.</p>
            </div>
        );
    }

    return (
        <div className="m-5 max-h-[90vh] max-w-8xl overflow-y-scroll">
            <h1 className="text-lg font-medium">All Doctors</h1>
            <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
                {doctors.map((item, index) => (
                    <div
                        className="border border-teal-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
                        key={item._id || index}
                    >
                        <img
                            className="w-56 bg-teal-50 hover:scale-105 transition-all duration-500 h-[220px] w-[260px] object-cover object-top"
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                        />
                        <div className="p-4">
                            <p className="text-neutral-800 text-lg font-medium">
                                {item.name}
                            </p>
                            <p className="text-zinc-600 text-sm">
                                {item.speciality}
                            </p>
                            <div className="mt-2 flex items-center gap-1 text-sm">
                                <input
                                    type="checkbox"
                                    checked={item.available}
                                />
                                <p>Available</p>
                            </div>

                            <div className="mt-3 flex space-x-2">
                                <button
                                    onClick={() =>
                                        navigate(`/view-doctor/${item._id}`)
                                    }
                                    className="px-3 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50 transition-colors"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;
