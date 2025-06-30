// import React, { useContext, useEffect, useState } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "./../../../../frontend/src/context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const DoctorProfile = () => {
//     const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
//         useContext(DoctorContext);

//     const { currency } = useContext(AppContext);

//     const [isEdit, setIsEdit] = useState(false);

//     const updateProfile = async () => {
//         try {
//             const updataData = {
//                 address: profileData.address,
//                 fees: profileData.fees,
//                 available: profileData.available,
//             };

//             const { data } = await axios.post(
//                 backendUrl + "/api/doctor/update-profile",
//                 updataData,
//                 { headers: { dToken } }
//             );

//             if (data.success) {
//                 toast.success(data.message);
//                 setIsEdit(false);
//                 getProfileData();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (dToken) {
//             getProfileData();
//         }
//     }, [dToken]);

//     return (
//         profileData && (
//             <div>
//                 <div className="flex flex-col gap-4 m-5">
//                     <div>
//                         <img
//                             className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
//                             src={profileData.image}
//                             alt=""
//                         />
//                     </div>

//                     <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
//                         {/* --------- Doc Info : name, degree, experience --------- */}
//                         <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
//                             {profileData.name}
//                         </p>
//                         <div className="flex items-center gap-2 mt-1 text-gray-600">
//                             <p>
//                                 {profileData.degree} - {profileData.speciality}
//                             </p>
//                             <button className="py-0.5 px-2 border text-xs rounded-full">
//                                 {profileData.experience}
//                             </button>
//                         </div>

//                         {/* ----- Doc About -------- */}

//                         <div>
//                             <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
//                                 About:
//                             </p>
//                             <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//                                 {profileData.about}
//                             </p>
//                         </div>
//                         <p className="text-gray-600 font-medium mt-4">
//                             Appointment fee :{" "}
//                             <span className="text-gray-800">
//                                 {currency}{" "}
//                                 {isEdit ? (
//                                     <input
//                                         type="number"
//                                         onChange={(e) =>
//                                             setProfileData((prev) => ({
//                                                 ...prev,
//                                                 fees: e.target.value,
//                                             }))
//                                         }
//                                         value={profileData.fees}
//                                     />
//                                 ) : (
//                                     profileData.fees
//                                 )}
//                             </span>
//                         </p>

//                         <div className="flex gap-2 py-2">
//                             <p>Address:</p>
//                             <p className="text-sm">
//                                 {isEdit ? (
//                                     <input
//                                         type="text"
//                                         onChange={(e) =>
//                                             setProfileData((prev) => ({
//                                                 ...prev,
//                                                 address: {
//                                                     ...prev.address,
//                                                     line1: e.target.value,
//                                                 },
//                                             }))
//                                         }
//                                         value={profileData.address.line1}
//                                     />
//                                 ) : (
//                                     profileData.address.line1
//                                 )}
//                                 <br />
//                                 {isEdit ? (
//                                     <input
//                                         type="text"
//                                         onChange={(e) =>
//                                             setProfileData((prev) => ({
//                                                 ...prev,
//                                                 address: {
//                                                     ...prev.address,
//                                                     line2: e.target.value,
//                                                 },
//                                             }))
//                                         }
//                                         value={profileData.address.line2}
//                                     />
//                                 ) : (
//                                     profileData.address.line2
//                                 )}
//                             </p>
//                         </div>

//                         <div className="flex gap-1 pt-2">
//                             <input
//                                 onChange={() =>
//                                     isEdit &&
//                                     setProfileData((prev) => ({
//                                         ...prev,
//                                         available: !prev.available,
//                                     }))
//                                 }
//                                 checked={profileData.available}
//                                 type="checkbox"
//                                 name=""
//                                 id=""
//                             />
//                             <label htmlFor="">Available</label>
//                         </div>

//                         {isEdit ? (
//                             <button
//                                 onClick={updateProfile}
//                                 className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
//                             >
//                                 Save
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={() => setIsEdit(true)}
//                                 className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
//                             >
//                                 Edit
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         )
//     );
// };

// export default DoctorProfile;


// import React, { useContext, useEffect, useState } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const DoctorProfile = () => {
//     const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
//         useContext(DoctorContext);

//     const { currency } = useContext(AppContext);

//     const [isEdit, setIsEdit] = useState(false);

//     const updateProfile = async () => {
//         try {
//             const updataData = {
//                 address: profileData.address,
//                 fees: profileData.fees,
//                 available: profileData.available,
//             };

//             const { data } = await axios.post(
//                 backendUrl + "/api/doctor/update-profile",
//                 updataData,
//                 { headers: { dToken } }
//             );

//             if (data.success) {
//                 toast.success(data.message);
//                 setIsEdit(false);
//                 getProfileData();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (dToken) {
//             getProfileData();
//         }
//     }, [dToken]);

//     return (
//         profileData && (
//             <div>
//                 <div className="flex flex-col gap-4 m-5">
//                     <div>
//                         <img
//                             className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
//                             src={profileData.image}
//                             alt=""
//                         />
//                     </div>

//                     <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
//                         {/* --------- Doc Info : name, degree, experience --------- */}
//                         <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
//                             {profileData.name}
//                         </p>
//                         <div className="flex items-center gap-2 mt-1 text-gray-600">
//                             <p>
//                                 {profileData.degree} - {profileData.speciality}
//                             </p>
//                             <button className="py-0.5 px-2 border text-xs rounded-full">
//                                 {profileData.experience}
//                             </button>
//                         </div>

//                         {/* ----- Doc About -------- */}
//                         <div>
//                             <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
//                                 About:
//                             </p>
//                             <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//                                 {profileData.about}
//                             </p>
//                         </div>

//                         <p className="text-gray-600 font-medium mt-4">
//                             Appointment fee :
//                             <span className="text-gray-800">
//                                 {currency}
//                                 {isEdit ? (
//                                     <input
//                                         type="number"
//                                         onChange={(e) =>
//                                             setProfileData((prev) => ({
//                                                 ...prev,
//                                                 fees: e.target.value,
//                                             }))
//                                         }
//                                         value={profileData.fees}
//                                     />
//                                 ) : (
//                                     profileData.fees
//                                 )}
//                             </span>
//                         </p>

//                         <div className="flex gap-2 py-2">
//                             <p>Address:</p>
//                             <p className="text-sm">
//                                 {isEdit ? (
//                                     <input
//                                         type="text"
//                                         onChange={(e) =>
//                                             setProfileData((prev) => ({
//                                                 ...prev,
//                                                 address: {
//                                                     ...prev.address,
//                                                     line1: e.target.value,
//                                                 },
//                                             }))
//                                         }
//                                         value={profileData.address?.line1 || ""}
//                                     />
//                                 ) : (
//                                     profileData.address?.line1
//                                 )}
//                                 <br />
//                                 {isEdit ? (
//                                     <input
//                                         type="text"
//                                         onChange={(e) =>
//                                             setProfileData((prev) => ({
//                                                 ...prev,
//                                                 address: {
//                                                     ...prev.address,
//                                                     line2: e.target.value,
//                                                 },
//                                             }))
//                                         }
//                                         value={profileData.address?.line2 || ""}
//                                     />
//                                 ) : (
//                                     profileData.address?.line2
//                                 )}
//                             </p>
//                         </div>

//                         <div className="flex gap-1 pt-2">
//                             <input
//                                 onChange={() =>
//                                     isEdit &&
//                                     setProfileData((prev) => ({
//                                         ...prev,
//                                         available: !prev.available,
//                                     }))
//                                 }
//                                 checked={profileData.available}
//                                 type="checkbox"
//                                 name=""
//                                 id=""
//                             />
//                             <label htmlFor="">Available</label>
//                         </div>

//                         {isEdit ? (
//                             <button
//                                 onClick={updateProfile}
//                                 className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
//                             >
//                                 Save
//                             </button>
//                         ) : (
//                             <button
//                                 onClick={() => setIsEdit(true)}
//                                 className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
//                             >
//                                 Edit
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         )
//     );
// };

// export default DoctorProfile;


// import React, { useContext, useEffect, useState } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const DoctorProfile = () => {
//     const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
//         useContext(DoctorContext);

//     const { currency } = useContext(AppContext);

//     const [isEdit, setIsEdit] = useState(false);
//     const [slotsSettings, setSlotsSettings] = useState({
//         workingHours: profileData?.workingHours || {
//             SUN: { from: "10:00", to: "21:00" },
//             MON: { from: "10:00", to: "21:00" },
//             TUE: { from: "10:00", to: "21:00" },
//             WED: { from: "10:00", to: "21:00" },
//             THU: { from: "10:00", to: "21:00" },
//             FRI: { from: "10:00", to: "21:00" },
//             SAT: { from: "10:00", to: "21:00" },
//         },
//         slotDuration: profileData?.slotDuration || 30,
//     });

//     const updateProfile = async () => {
//         try {
//             const updataData = {
//                 address: profileData.address,
//                 fees: profileData.fees,
//                 available: profileData.available,
//             };

//             const { data } = await axios.post(
//                 backendUrl + "/api/doctor/update-profile",
//                 updataData,
//                 { headers: { dToken } }
//             );

//             if (data.success) {
//                 toast.success(data.message);
//                 setIsEdit(false);
//                 getProfileData();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//             console.log(error);
//         }
//     };

//     const saveSlotsSettings = async () => {
//         try {
//             const { data } = await axios.post(
//                 backendUrl + "/api/doctor/update-slots-settings",
//                 slotsSettings,
//                 { headers: { dToken } }
//             );

//             if (data.success) {
//                 toast.success(data.message);
//                 getProfileData();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         if (profileData) {
//             setSlotsSettings({
//                 workingHours:
//                     profileData.workingHours || slotsSettings.workingHours,
//                 slotDuration:
//                     profileData.slotDuration || slotsSettings.slotDuration,
//             });
//         }
//     }, [profileData]);

//     useEffect(() => {
//         if (dToken) {
//             getProfileData();
//         }
//     }, [dToken]);

//     const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//     return (
//         profileData && (
//             <div className="flex flex-col gap-4 m-5">
//                 {/* ----- صورة واسم الطبيب وبياناته ----- */}
//                 <div>
//                     <img
//                         className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
//                         src={profileData.image || "/images/default-avatar.png"}
//                         alt={profileData.name || "Doctor"}
//                     />
//                 </div>

//                 <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
//                     {/* اسم الطبيب */}
//                     <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
//                         {profileData.name}
//                     </p>

//                     {/* الدرجة والتخصص والخبرة */}
//                     <div className="flex items-center gap-2 mt-1 text-gray-600">
//                         <p>
//                             {profileData.degree} - {profileData.speciality}
//                         </p>
//                         <button className="py-0.5 px-2 border text-xs rounded-full">
//                             {profileData.experience}
//                         </button>
//                     </div>

//                     {/* نبذة عن الطبيب */}
//                     <div>
//                         <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
//                             About:
//                         </p>
//                         <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//                             {profileData.about}
//                         </p>
//                     </div>

//                     {/* رسوم الكشف */}
//                     <p className="text-gray-600 font-medium mt-4">
//                         Appointment fee :
//                         <span className="text-gray-800 ml-1">
//                             {currency}
//                             {isEdit ? (
//                                 <input
//                                     type="number"
//                                     onChange={(e) =>
//                                         setProfileData((prev) => ({
//                                             ...prev,
//                                             fees: e.target.value,
//                                         }))
//                                     }
//                                     value={profileData.fees}
//                                     className="border rounded px-1 py-0.5 w-20"
//                                 />
//                             ) : (
//                                 profileData.fees
//                             )}
//                         </span>
//                     </p>

//                     {/* العنوان */}
//                     <div className="flex gap-2 py-2">
//                         <p>Address:</p>
//                         <p className="text-sm">
//                             {isEdit ? (
//                                 <>
//                                     <input
//                                         type="text"
//                                         onChange={(e) =>
//                                             setProfileData((prev) => ({
//                                                 ...prev,
//                                                 address: {
//                                                     ...prev.address,
//                                                     line1: e.target.value,
//                                                 },
//                                             }))
//                                         }
//                                         value={profileData.address?.line1 || ""}
//                                         className="border rounded px-1 py-0.5 mb-1 w-full max-w-xs"
//                                     />
//                                     <input
//                                         type="text"
//                                         onChange={(e) =>
//                                             setProfileData((prev) => ({
//                                                 ...prev,
//                                                 address: {
//                                                     ...prev.address,
//                                                     line2: e.target.value,
//                                                 },
//                                             }))
//                                         }
//                                         value={profileData.address?.line2 || ""}
//                                         className="border rounded px-1 py-0.5 w-full max-w-xs"
//                                     />
//                                 </>
//                             ) : (
//                                 <>
//                                     {profileData.address?.line1}
//                                     <br />
//                                     {profileData.address?.line2}
//                                 </>
//                             )}
//                         </p>
//                     </div>

//                     {/* حالة التوفر */}
//                     <div className="flex gap-1 pt-2 items-center">
//                         <input
//                             onChange={() =>
//                                 isEdit &&
//                                 setProfileData((prev) => ({
//                                     ...prev,
//                                     available: !prev.available,
//                                 }))
//                             }
//                             checked={profileData.available}
//                             type="checkbox"
//                             id="available-checkbox"
//                         />
//                         <label
//                             htmlFor="available-checkbox"
//                             className="select-none"
//                         >
//                             Available
//                         </label>
//                     </div>

//                     {/* أزرار تعديل/حفظ */}
//                     {isEdit ? (
//                         <button
//                             onClick={updateProfile}
//                             className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
//                         >
//                             Save
//                         </button>
//                     ) : (
//                         <button
//                             onClick={() => setIsEdit(true)}
//                             className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
//                         >
//                             Edit
//                         </button>
//                     )}

//                     {/* ----- إعدادات ساعات العمل ومدة الفترات ----- */}
//                     <div className="border p-4 rounded-lg bg-gray-50 mt-6">
//                         <h3 className="font-semibold text-lg mb-2">
//                             Edit Working Hours & Slot Duration
//                         </h3>

//                         {days.map((day) => (
//                             <div
//                                 key={day}
//                                 className="flex items-center gap-2 mb-2"
//                             >
//                                 <p className="w-12">{day}:</p>
//                                 <input
//                                     type="time"
//                                     value={
//                                         slotsSettings.workingHours[day]?.from ||
//                                         "10:00"
//                                     }
//                                     onChange={(e) =>
//                                         setSlotsSettings((prev) => ({
//                                             ...prev,
//                                             workingHours: {
//                                                 ...prev.workingHours,
//                                                 [day]: {
//                                                     ...prev.workingHours[day],
//                                                     from: e.target.value,
//                                                 },
//                                             },
//                                         }))
//                                     }
//                                     className="border px-2 py-1 rounded"
//                                 />
//                                 <span>to</span>
//                                 <input
//                                     type="time"
//                                     value={
//                                         slotsSettings.workingHours[day]?.to ||
//                                         "21:00"
//                                     }
//                                     onChange={(e) =>
//                                         setSlotsSettings((prev) => ({
//                                             ...prev,
//                                             workingHours: {
//                                                 ...prev.workingHours,
//                                                 [day]: {
//                                                     ...prev.workingHours[day],
//                                                     to: e.target.value,
//                                                 },
//                                             },
//                                         }))
//                                     }
//                                     className="border px-2 py-1 rounded"
//                                 />
//                             </div>
//                         ))}

//                         <div className="mt-4">
//                             <label className="block mb-1 font-medium">
//                                 Slot Duration (minutes):
//                             </label>
//                             <select
//                                 value={slotsSettings.slotDuration}
//                                 onChange={(e) =>
//                                     setSlotsSettings((prev) => ({
//                                         ...prev,
//                                         slotDuration: parseInt(e.target.value),
//                                     }))
//                                 }
//                                 className="border px-2 py-1 rounded"
//                             >
//                                 <option value={15}>15 mins</option>
//                                 <option value={30}>30 mins</option>
//                                 <option value={45}>45 mins</option>
//                                 <option value={60}>60 mins</option>
//                             </select>
//                         </div>

//                         <button
//                             onClick={saveSlotsSettings}
//                             className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
//                         >
//                             Save Slots Settings
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         )
//     );
// };

// export default DoctorProfile;



import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../components/Loader"; // ✅ استيراد اللودر

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
        useContext(DoctorContext);

    const { currency } = useContext(AppContext);

    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false); // ✅ حالة اللودر
    const [slotsSettings, setSlotsSettings] = useState({
        workingHours: profileData?.workingHours || {
            SUN: { from: "10:00", to: "21:00" },
            MON: { from: "10:00", to: "21:00" },
            TUE: { from: "10:00", to: "21:00" },
            WED: { from: "10:00", to: "21:00" },
            THU: { from: "10:00", to: "21:00" },
            FRI: { from: "10:00", to: "21:00" },
            SAT: { from: "10:00", to: "21:00" },
        },
        slotDuration: profileData?.slotDuration || 30,
    });

    const updateProfile = async () => {
        try {
            setLoading(true); // ✅ بدء اللودر
            const updataData = {
                address: profileData.address,
                fees: profileData.fees,
                available: profileData.available,
            };

            const { data } = await axios.post(
                backendUrl + "/api/doctor/update-profile",
                updataData,
                { headers: { dToken } }
            );

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                await getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false); // ✅ إيقاف اللودر
        }
    };

    const saveSlotsSettings = async () => {
        try {
            setLoading(true); // ✅ بدء اللودر
            const { data } = await axios.post(
                backendUrl + "/api/doctor/update-slots-settings",
                slotsSettings,
                { headers: { dToken } }
            );

            if (data.success) {
                toast.success(data.message);
                await getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        } finally {
            setLoading(false); // ✅ إيقاف اللودر
        }
    };

    useEffect(() => {
        if (profileData) {
            setSlotsSettings({
                workingHours:
                    profileData.workingHours || slotsSettings.workingHours,
                slotDuration:
                    profileData.slotDuration || slotsSettings.slotDuration,
            });
        }
    }, [profileData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // ✅ بدء اللودر
                await getProfileData();
            } finally {
                setLoading(false); // ✅ إيقاف اللودر
            }
        };

        if (dToken) {
            fetchData();
        }
    }, [dToken]);

    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    if (loading) return <Loader />; // ✅ عرض اللودر

    return (
        profileData && (
            <div className="flex flex-col gap-4 m-5">
                {/* ----- صورة واسم الطبيب وبياناته ----- */}
                <div>
                    <img
                        className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
                        src={profileData.image || "/images/default-avatar.png"}
                        alt={profileData.name || "Doctor"}
                    />
                </div>

                <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
                    <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
                        {profileData.name}
                    </p>

                    <div className="flex items-center gap-2 mt-1 text-gray-600">
                        <p>
                            {profileData.degree} - {profileData.speciality}
                        </p>
                        <button className="py-0.5 px-2 border text-xs rounded-full">
                            {profileData.experience}
                        </button>
                    </div>

                    <div>
                        <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                            About:
                        </p>
                        <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                            {profileData.about}
                        </p>
                    </div>

                    <p className="text-gray-600 font-medium mt-4">
                        Appointment fee :
                        <span className="text-gray-800 ml-1">
                            {currency}
                            {isEdit ? (
                                <input
                                    type="number"
                                    onChange={(e) =>
                                        setProfileData((prev) => ({
                                            ...prev,
                                            fees: e.target.value,
                                        }))
                                    }
                                    value={profileData.fees}
                                    className="border rounded px-1 py-0.5 w-20"
                                />
                            ) : (
                                profileData.fees
                            )}
                        </span>
                    </p>

                    <div className="flex gap-2 py-2">
                        <p>Address:</p>
                        <p className="text-sm">
                            {isEdit ? (
                                <>
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line1: e.target.value,
                                                },
                                            }))
                                        }
                                        value={profileData.address?.line1 || ""}
                                        className="border rounded px-1 py-0.5 mb-1 w-full max-w-xs"
                                    />
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line2: e.target.value,
                                                },
                                            }))
                                        }
                                        value={profileData.address?.line2 || ""}
                                        className="border rounded px-1 py-0.5 w-full max-w-xs"
                                    />
                                </>
                            ) : (
                                <>
                                    {profileData.address?.line1}
                                    <br />
                                    {profileData.address?.line2}
                                </>
                            )}
                        </p>
                    </div>

                    <div className="flex gap-1 pt-2 items-center">
                        <input
                            onChange={() =>
                                isEdit &&
                                setProfileData((prev) => ({
                                    ...prev,
                                    available: !prev.available,
                                }))
                            }
                            checked={profileData.available}
                            type="checkbox"
                            id="available-checkbox"
                        />
                        <label
                            htmlFor="available-checkbox"
                            className="select-none"
                        >
                            Available
                        </label>
                    </div>

                    {isEdit ? (
                        <button
                            onClick={updateProfile}
                            className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                        >
                            Edit
                        </button>
                    )}

                    <div className="border p-4 rounded-lg bg-gray-50 mt-6">
                        <h3 className="font-semibold text-lg mb-2">
                            Edit Working Hours & Slot Duration
                        </h3>

                        {days.map((day) => (
                            <div
                                key={day}
                                className="flex items-center gap-2 mb-2"
                            >
                                <p className="w-12">{day}:</p>
                                <input
                                    type="time"
                                    value={
                                        slotsSettings.workingHours[day]?.from ||
                                        "10:00"
                                    }
                                    onChange={(e) =>
                                        setSlotsSettings((prev) => ({
                                            ...prev,
                                            workingHours: {
                                                ...prev.workingHours,
                                                [day]: {
                                                    ...prev.workingHours[day],
                                                    from: e.target.value,
                                                },
                                            },
                                        }))
                                    }
                                    className="border px-2 py-1 rounded"
                                />
                                <span>to</span>
                                <input
                                    type="time"
                                    value={
                                        slotsSettings.workingHours[day]?.to ||
                                        "21:00"
                                    }
                                    onChange={(e) =>
                                        setSlotsSettings((prev) => ({
                                            ...prev,
                                            workingHours: {
                                                ...prev.workingHours,
                                                [day]: {
                                                    ...prev.workingHours[day],
                                                    to: e.target.value,
                                                },
                                            },
                                        }))
                                    }
                                    className="border px-2 py-1 rounded"
                                />
                            </div>
                        ))}

                        <div className="mt-4">
                            <label className="block mb-1 font-medium">
                                Slot Duration (minutes):
                            </label>
                            <select
                                value={slotsSettings.slotDuration}
                                onChange={(e) =>
                                    setSlotsSettings((prev) => ({
                                        ...prev,
                                        slotDuration: parseInt(e.target.value),
                                    }))
                                }
                                className="border px-2 py-1 rounded"
                            >
                                <option value={15}>15 mins</option>
                                <option value={30}>30 mins</option>
                                <option value={45}>45 mins</option>
                                <option value={60}>60 mins</option>
                            </select>
                        </div>

                        <button
                            onClick={saveSlotsSettings}
                            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
                        >
                            Save Slots Settings
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default DoctorProfile;
