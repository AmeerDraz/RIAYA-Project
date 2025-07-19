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

// import React, { useContext, useEffect, useState } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Loader from "../../components/Loader"; // ✅ استيراد اللودر

// const DoctorProfile = () => {
//     const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
//         useContext(DoctorContext);

//     const { currency } = useContext(AppContext);

//     const [isEdit, setIsEdit] = useState(false);
//     const [loading, setLoading] = useState(false); // ✅ حالة اللودر
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
//             setLoading(true); // ✅ بدء اللودر
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
//                 await getProfileData();
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//             console.log(error);
//         } finally {
//             setLoading(false); // ✅ إيقاف اللودر
//         }
//     };

//     const updateSlotsSettings = async () => {
//         try {
//             setLoading(true);

//             // Convert workingHours object to array as expected by the backend
//             const formattedWorkingHours = Object.entries(
//                 slotsSettings.workingHours
//             ).map(([day, times]) => ({
//                 day,
//                 start: times.from,
//                 end: times.to,
//             }));

//             const requestBody = {
//                 workingHours: formattedWorkingHours,
//                 slotDuration: slotsSettings.slotDuration,
//             };

//             const { data } = await axios.post(
//                 backendUrl + "/api/doctor/update-slots-settings",
//                 requestBody,
//                 {
//                     headers: {
//                         dToken,
//                     },
//                 }
//             );

//             if (data.success) {
//                 toast.success(data.message);
//                 await getProfileData(); // Refresh doctor's profile data if needed
//                 console.log("Updated slots settings:", data);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // useEffect(() => {
//     //     if (profileData) {
//     //         setSlotsSettings({
//     //             workingHours:
//     //                 profileData.workingHours || slotsSettings.workingHours,
//     //             slotDuration:
//     //                 profileData.slotDuration || slotsSettings.slotDuration,
//     //         });
//     //     }
//     // }, [profileData]);

//     useEffect(() => {
//         if (profileData) {
//             let formattedWorkingHours = {};

//             // Handle both array and object formats
//             if (Array.isArray(profileData.workingHours)) {
//                 profileData.workingHours.forEach((item) => {
//                     formattedWorkingHours[item.day] = {
//                         from: item.start,
//                         to: item.end,
//                     };
//                 });
//             } else if (typeof profileData.workingHours === "object") {
//                 formattedWorkingHours = { ...profileData.workingHours };
//             }

//             setSlotsSettings({
//                 workingHours: formattedWorkingHours,
//                 slotDuration: profileData.slotDuration || 30,
//             });
//         }
//     }, [profileData]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true); // ✅ بدء اللودر
//                 await getProfileData();
//             } finally {
//                 setLoading(false); // ✅ إيقاف اللودر
//             }
//         };

//         if (dToken) {
//             fetchData();
//         }
//     }, [dToken]);

//     const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//     if (loading) return <Loader />; // ✅ عرض اللودر

//     return (
//         profileData && (
//             <div className="flex flex-col gap-4 m-5 h-[90vh] overflow-scroll">
//                 {/* ----- صورة واسم الطبيب وبياناته ----- */}
//                 <div>
//                     <img
//                         className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
//                         src={profileData.image || "/images/default-avatar.png"}
//                         alt={profileData.name || "Doctor"}
//                     />
//                 </div>

//                 <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
//                     <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
//                         {profileData.name}
//                     </p>

//                     <div className="flex items-center gap-2 mt-1 text-gray-600">
//                         <p>
//                             {profileData.degree} - {profileData.speciality}
//                         </p>
//                         <button className="py-0.5 px-2 border text-xs rounded-full">
//                             {profileData.experience}
//                         </button>
//                     </div>

//                     <div>
//                         <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
//                             About:
//                         </p>
//                         <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//                             {profileData.about}
//                         </p>
//                     </div>

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
//                             onClick={updateSlotsSettings}
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
import Loader from "../../components/Loader";

const DoctorProfile = () => {
    // console.log("DoctorProfile component is rendering...");

    const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
        useContext(DoctorContext);

    const { currency } = useContext(AppContext);

    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [savingSlots, setSavingSlots] = useState(false);

    // Initialize working hours with proper structure
    const [slotsSettings, setSlotsSettings] = useState({
        workingHours: {
            SUN: { from: "09:00", to: "17:00", enabled: true },
            MON: { from: "09:00", to: "17:00", enabled: true },
            TUE: { from: "09:00", to: "17:00", enabled: true },
            WED: { from: "09:00", to: "17:00", enabled: true },
            THU: { from: "09:00", to: "17:00", enabled: true },
            FRI: { from: "09:00", to: "17:00", enabled: true },
            SAT: { from: "09:00", to: "17:00", enabled: true },
        },
        slotDuration: 30,
    });

    // Add form state for editing profile data
    const [formData, setFormData] = useState({
        name: "",
        experience: 0,
        speciality: "",
        degree: "",
        about: "",
        fees: 0,
        available: true,
        address: {
            line1: "",
            line2: "",
        },
    });

    const days = [
        { key: "SUN", label: "Sunday" },
        { key: "MON", label: "Monday" },
        { key: "TUE", label: "Tuesday" },
        { key: "WED", label: "Wednesday" },
        { key: "THU", label: "Thursday" },
        { key: "FRI", label: "Friday" },
        { key: "SAT", label: "Saturday" },
    ];

    const updateProfile = async () => {
        try {
            setLoading(true);

            // Validate required fields
            if (!formData.name.trim()) {
                toast.error("Name is required");
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
                experience: formData.experience,
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

            // console.log("Updating profile with data:", updateData);

            const { data } = await axios.post(
                backendUrl + "/api/doctor/update-profile",
                updateData,
                { headers: { dToken } }
            );

            if (data.success) {
                toast.success(data.message);
                setIsEdit(false);
                await getProfileData(); // Refresh the profile data
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
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

            const { data } = await axios.post(
                backendUrl + "/api/doctor/update-slots-settings",
                requestBody,
                {
                    headers: { dToken },
                }
            );

            if (data.success) {
                toast.success("Working hours updated successfully!");
                await getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            const errorMessage =
                error.response?.data?.message ||
                "Failed to update working hours";
            toast.error(errorMessage);
        } finally {
            setSavingSlots(false);
        }
    };

    // Initialize slots settings when profile data is loaded
    useEffect(() => {
        if (profileData) {
            let formattedWorkingHours = {};

            // Handle both array and object formats from backend
            if (Array.isArray(profileData.workingHours)) {
                profileData.workingHours.forEach((item) => {
                    formattedWorkingHours[item.day] = {
                        from: item.start || item.from,
                        to: item.end || item.to,
                        enabled: true,
                    };
                });
            } else if (
                typeof profileData.workingHours === "object" &&
                profileData.workingHours !== null
            ) {
                Object.entries(profileData.workingHours).forEach(
                    ([day, times]) => {
                        formattedWorkingHours[day] = {
                            from: times.from || "09:00",
                            to: times.to || "17:00",
                            enabled: true,
                        };
                    }
                );
            }

            // Set default values for missing days
            days.forEach(({ key }) => {
                if (!formattedWorkingHours[key]) {
                    formattedWorkingHours[key] = {
                        from: "09:00",
                        to: "17:00",
                        enabled: false,
                    };
                }
            });

            setSlotsSettings({
                workingHours: formattedWorkingHours,
                slotDuration: profileData.slotDuration || 30,
            });
        }
    }, [profileData]);

    // Initialize form data when profile data is loaded
    useEffect(() => {
        if (profileData) {
            setFormData({
                name: profileData.name || "",
                experience: parseInt(profileData.experience) || 0,
                speciality: profileData.speciality || "",
                degree: profileData.degree || "",
                about: profileData.about || "",
                fees: profileData.fees || 0,
                available: profileData.available || false,
                address: {
                    line1: profileData.address?.line1 || "",
                    line2: profileData.address?.line2 || "",
                },
            });
        }
    }, [profileData]);

    // const handleInputChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     if (name.includes(".")) {
    //         const [parent, child] = name.split(".");
    //         setFormData((prev) => ({
    //             ...prev,
    //             [parent]: {
    //                 ...prev[parent],
    //                 [child]: type === "checkbox" ? checked : value,
    //             },
    //         }));
    //     } else {
    //         setFormData((prev) => ({
    //             ...prev,
    //             [name]: type === "checkbox" ? checked : value,
    //         }));
    //     }
    // };


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
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log("DoctorProfile: Starting to fetch profile data...");
                console.log("DoctorProfile: dToken exists:", !!dToken);
                await getProfileData();
                console.log("DoctorProfile: Profile data fetched successfully");
            } catch (error) {
                console.error(
                    "DoctorProfile: Error fetching profile data:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        if (dToken) {
            fetchData();
        } else {
            console.log(
                "DoctorProfile: No dToken found, redirecting to login..."
            );
            // Redirect to login if no token
            window.location.href = "/login";
        }
    }, [dToken]);

    // console.log("DoctorProfile: Current state:", {
    //     loading,
    //     profileData,
    //     dToken: !!dToken,
    // });

    if (loading) return <Loader />;

    if (!dToken) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Not Authenticated
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Please log in to access your profile.
                    </p>
                    <button
                        onClick={() => (window.location.href = "/login")}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-85"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Profile Not Found
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Unable to load your profile data. Please try again.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:opacity-85"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        // <div className="min-h-screen bg-gray-50 p-6">
        //     <div className="max-w-6xl mx-auto">
        //         {/* Header */}
        //         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        //             <h1 className="text-2xl font-bold text-gray-800 mb-2">
        //                 Doctor Profile
        //             </h1>
        //             <p className="text-gray-600">
        //                 Manage your profile information and working hours
        //             </p>
        //         </div>

        //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        //             {/* Profile Information */}
        //             <div className="lg:col-span-1">
        //                 <div className="bg-white rounded-lg shadow-sm p-6">
        //                     {/* Profile Image */}
        //                     <div className="text-center mb-6">
        //                         <img
        //                             className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-100"
        //                             src={
        //                                 profileData.image ||
        //                                 "/images/default-avatar.png"
        //                             }
        //                             alt={profileData.name || "Doctor"}
        //                         />
        //                     </div>

        //                     {/* Basic Info */}
        //                     <div className="space-y-4">
        //                         <div>
        //                             {isEdit ? (
        //                                 <div className="space-y-3">
        //                                     <input
        //                                         type="text"
        //                                         name="name"
        //                                         value={formData.name}
        //                                         onChange={handleInputChange}
        //                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-xl font-semibold"
        //                                         placeholder="Doctor Name"
        //                                     />
        //                                     <div className="grid grid-cols-2 gap-2">
        //                                         <input
        //                                             type="text"
        //                                             name="degree"
        //                                             value={formData.degree}
        //                                             onChange={handleInputChange}
        //                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        //                                             placeholder="Degree"
        //                                         />
        //                                         <input
        //                                             type="text"
        //                                             name="speciality"
        //                                             value={formData.speciality}
        //                                             onChange={handleInputChange}
        //                                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        //                                             placeholder="Speciality"
        //                                         />
        //                                     </div>
        //                                     <input
        //                                         type="number"
        //                                         name="experience"
        //                                         value={formData.experience}
        //                                         onChange={handleInputChange}
        //                                         min="0"
        //                                         max="50"
        //                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        //                                         placeholder="Years of Experience"
        //                                     />
        //                                 </div>
        //                             ) : (
        //                                 <div>
        //                                     <h2 className="text-xl font-semibold text-gray-800">
        //                                         {profileData.name}
        //                                     </h2>
        //                                     <p className="text-gray-600">
        //                                         {profileData.degree} -{" "}
        //                                         {profileData.speciality}
        //                                     </p>
        //                                     <span className="inline-block bg-green-100 text-green-500 text-xs px-2 py-1 rounded-full mt-1">
        //                                         {parseInt(
        //                                             profileData.experience
        //                                         ) || 0}
        //                                         Years Experience
        //                                     </span>
        //                                 </div>
        //                             )}
        //                         </div>

        //                         <div>
        //                             <h3 className="font-medium text-gray-800 mb-2">
        //                                 About
        //                             </h3>
        //                             {isEdit ? (
        //                                 <textarea
        //                                     name="about"
        //                                     value={formData.about}
        //                                     onChange={handleInputChange}
        //                                     rows={4}
        //                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
        //                                     placeholder="Tell us about yourself..."
        //                                 />
        //                             ) : (
        //                                 <p className="text-sm text-gray-600 leading-relaxed">
        //                                     {profileData.about}
        //                                 </p>
        //                             )}
        //                         </div>

        //                         <div>
        //                             <h3 className="font-medium text-gray-800 mb-2">
        //                                 Appointment Fee
        //                             </h3>
        //                             {isEdit ? (
        //                                 <input
        //                                     type="number"
        //                                     name="fees"
        //                                     value={formData.fees}
        //                                     onChange={handleInputChange}
        //                                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        //                                     placeholder="Enter appointment fee"
        //                                 />
        //                             ) : (
        //                                 <div className="flex items-center">
        //                                     <span className="text-lg font-semibold text-green-600">
        //                                         {currency} {profileData.fees}
        //                                     </span>
        //                                 </div>
        //                             )}
        //                         </div>

        //                         <div>
        //                             <h3 className="font-medium text-gray-800 mb-2">
        //                                 Address
        //                             </h3>
        //                             {isEdit ? (
        //                                 <div className="space-y-2">
        //                                     <input
        //                                         type="text"
        //                                         name="address.line1"
        //                                         value={formData.address.line1}
        //                                         onChange={handleInputChange}
        //                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        //                                         placeholder="Address Line 1"
        //                                     />
        //                                     <input
        //                                         type="text"
        //                                         name="address.line2"
        //                                         value={formData.address.line2}
        //                                         onChange={handleInputChange}
        //                                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        //                                         placeholder="Address Line 2 (optional)"
        //                                     />
        //                                 </div>
        //                             ) : (
        //                                 <p className="text-sm text-gray-600">
        //                                     {profileData.address?.line1}
        //                                     {profileData.address?.line2 && (
        //                                         <>
        //                                             <br />
        //                                             {profileData.address.line2}
        //                                         </>
        //                                     )}
        //                                 </p>
        //                             )}
        //                         </div>

        //                         <div className="flex items-center">
        //                             <input
        //                                 onChange={handleInputChange}
        //                                 checked={formData.available}
        //                                 type="checkbox"
        //                                 id="available-checkbox"
        //                                 name="available"
        //                                 className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
        //                             />
        //                             <label
        //                                 htmlFor="available-checkbox"
        //                                 className="ml-2 text-sm font-medium text-gray-700"
        //                             >
        //                                 Available for appointments
        //                             </label>
        //                         </div>

        //                         {isEdit ? (
        //                             <div className="space-y-2">
        //                                 <button
        //                                     onClick={updateProfile}
        //                                     disabled={loading}
        //                                     className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:opacity-85 transition-colors disabled:opacity-50"
        //                                 >
        //                                     {loading
        //                                         ? "Saving..."
        //                                         : "Save Changes"}
        //                                 </button>
        //                                 <button
        //                                     onClick={() => {
        //                                         setIsEdit(false);
        //                                         // Reset form data to original values
        //                                         if (profileData) {
        //                                             setFormData({
        //                                                 name:
        //                                                     profileData.name ||
        //                                                     "",
        //                                                 experience:
        //                                                     parseInt(
        //                                                         profileData.experience
        //                                                     ) || 0,
        //                                                 speciality:
        //                                                     profileData.speciality ||
        //                                                     "",
        //                                                 degree:
        //                                                     profileData.degree ||
        //                                                     "",
        //                                                 about:
        //                                                     profileData.about ||
        //                                                     "",
        //                                                 fees:
        //                                                     profileData.fees ||
        //                                                     0,
        //                                                 available:
        //                                                     profileData.available ||
        //                                                     true,
        //                                                 address: {
        //                                                     line1:
        //                                                         profileData
        //                                                             .address
        //                                                             ?.line1 ||
        //                                                         "",
        //                                                     line2:
        //                                                         profileData
        //                                                             .address
        //                                                             ?.line2 ||
        //                                                         "",
        //                                                 },
        //                                             });
        //                                         }
        //                                     }}
        //                                     className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
        //                                 >
        //                                     Cancel
        //                                 </button>
        //                             </div>
        //                         ) : (
        //                             <button
        //                                 onClick={() => setIsEdit(true)}
        //                                 className="w-full border border-green-600 text-green-600 py-2 px-4 rounded-lg hover:bg-green-50 transition-colors"
        //                             >
        //                                 Edit Profile
        //                             </button>
        //                         )}
        //                     </div>
        //                 </div>
        //             </div>

        //             {/* Working Hours Settings */}
        //             <div className="lg:col-span-2">
        //                 <div className="bg-white rounded-lg shadow-sm p-6">
        //                     <div className="flex items-center justify-between mb-6">
        //                         <div>
        //                             <h2 className="text-xl font-semibold text-gray-800">
        //                                 Working Hours
        //                             </h2>
        //                             <p className="text-gray-600">
        //                                 Set your availability for each day of
        //                                 the week
        //                             </p>
        //                         </div>
        //                         <div className="flex space-x-2">
        //                             <button
        //                                 onClick={() => {
        //                                     const allEnabled = Object.values(
        //                                         slotsSettings.workingHours
        //                                     ).every((day) => day.enabled);
        //                                     setSlotsSettings((prev) => ({
        //                                         ...prev,
        //                                         workingHours:
        //                                             Object.fromEntries(
        //                                                 Object.entries(
        //                                                     prev.workingHours
        //                                                 ).map(
        //                                                     ([day, times]) => [
        //                                                         day,
        //                                                         {
        //                                                             ...times,
        //                                                             enabled:
        //                                                                 !allEnabled,
        //                                                         },
        //                                                     ]
        //                                                 )
        //                                             ),
        //                                     }));
        //                                 }}
        //                                 className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        //                             >
        //                                 {Object.values(
        //                                     slotsSettings.workingHours
        //                                 ).every((day) => day.enabled)
        //                                     ? "Disable All"
        //                                     : "Enable All"}
        //                             </button>
        //                         </div>
        //                     </div>

        //                     <div className="space-y-4">
        //                         {days.map(({ key, label }) => (
        //                             <div
        //                                 key={key}
        //                                 className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        //                             >
        //                                 <div className="flex items-center space-x-3">
        //                                     <input
        //                                         type="checkbox"
        //                                         checked={
        //                                             slotsSettings.workingHours[
        //                                                 key
        //                                             ]?.enabled || false
        //                                         }
        //                                         onChange={(e) =>
        //                                             setSlotsSettings(
        //                                                 (prev) => ({
        //                                                     ...prev,
        //                                                     workingHours: {
        //                                                         ...prev.workingHours,
        //                                                         [key]: {
        //                                                             ...prev
        //                                                                 .workingHours[
        //                                                                 key
        //                                                             ],
        //                                                             enabled:
        //                                                                 e.target
        //                                                                     .checked,
        //                                                         },
        //                                                     },
        //                                                 })
        //                                             )
        //                                         }
        //                                         className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
        //                                     />
        //                                     <span className="font-medium text-gray-700 min-w-[80px]">
        //                                         {label}
        //                                     </span>
        //                                 </div>

        //                                 {slotsSettings.workingHours[key]
        //                                     ?.enabled && (
        //                                     <div className="flex items-center space-x-2">
        //                                         <input
        //                                             type="time"
        //                                             value={
        //                                                 slotsSettings
        //                                                     .workingHours[key]
        //                                                     ?.from || "09:00"
        //                                             }
        //                                             onChange={(e) =>
        //                                                 setSlotsSettings(
        //                                                     (prev) => ({
        //                                                         ...prev,
        //                                                         workingHours: {
        //                                                             ...prev.workingHours,
        //                                                             [key]: {
        //                                                                 ...prev
        //                                                                     .workingHours[
        //                                                                     key
        //                                                                 ],
        //                                                                 from: e
        //                                                                     .target
        //                                                                     .value,
        //                                                             },
        //                                                         },
        //                                                     })
        //                                                 )
        //                                             }
        //                                             className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        //                                         />
        //                                         <span className="text-gray-500">
        //                                             to
        //                                         </span>
        //                                         <input
        //                                             type="time"
        //                                             value={
        //                                                 slotsSettings
        //                                                     .workingHours[key]
        //                                                     ?.to || "17:00"
        //                                             }
        //                                             onChange={(e) =>
        //                                                 setSlotsSettings(
        //                                                     (prev) => ({
        //                                                         ...prev,
        //                                                         workingHours: {
        //                                                             ...prev.workingHours,
        //                                                             [key]: {
        //                                                                 ...prev
        //                                                                     .workingHours[
        //                                                                     key
        //                                                                 ],
        //                                                                 to: e
        //                                                                     .target
        //                                                                     .value,
        //                                                             },
        //                                                         },
        //                                                     })
        //                                                 )
        //                                             }
        //                                             className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        //                                         />
        //                                     </div>
        //                                 )}
        //                             </div>
        //                         ))}

        //                         {/* Summary Section */}
        //                         <div className="border-t pt-4 mt-6">
        //                             <div className="bg-green-50 p-4 rounded-lg mb-4">
        //                                 <h4 className="font-medium text-primary mb-2">
        //                                     Working Hours Summary
        //                                 </h4>
        //                                 <div className="text-sm text-primary/90">
        //                                     <p>
        //                                         Enabled days:{" "}
        //                                         {
        //                                             Object.values(
        //                                                 slotsSettings.workingHours
        //                                             ).filter(
        //                                                 (day) => day.enabled
        //                                             ).length
        //                                         }
        //                                         /7
        //                                     </p>
        //                                     <p>
        //                                         Appointment duration:{" "}
        //                                         {slotsSettings.slotDuration}{" "}
        //                                         minutes
        //                                     </p>
        //                                 </div>
        //                             </div>

        //                             <div className="flex items-center justify-between">
        //                                 <div>
        //                                     <label className="block text-sm font-medium text-gray-700 mb-2">
        //                                         Appointment Duration
        //                                     </label>
        //                                     <select
        //                                         value={
        //                                             slotsSettings.slotDuration
        //                                         }
        //                                         onChange={(e) =>
        //                                             setSlotsSettings(
        //                                                 (prev) => ({
        //                                                     ...prev,
        //                                                     slotDuration:
        //                                                         parseInt(
        //                                                             e.target
        //                                                                 .value
        //                                                         ),
        //                                                 })
        //                                             )
        //                                         }
        //                                         className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-green-300 focus:border-green-300 outline-none"
        //                                     >
        //                                         <option
        //                                             className="hover:bg-green-100"
        //                                             value={15}
        //                                         >
        //                                             15 minutes
        //                                         </option>
        //                                         <option value={30}>
        //                                             30 minutes
        //                                         </option>
        //                                         <option value={45}>
        //                                             45 minutes
        //                                         </option>
        //                                         <option value={60}>
        //                                             60 minutes
        //                                         </option>
        //                                     </select>
        //                                 </div>

        //                                 <button
        //                                     onClick={updateSlotsSettings}
        //                                     disabled={savingSlots}
        //                                     className="bg-primary text-white py-2 px-6 rounded-lg hover:opacity-85 transition-colors disabled:opacity-50"
        //                                 >
        //                                     {savingSlots
        //                                         ? "Saving..."
        //                                         : "Save Working Hours"}
        //                                 </button>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 mr-4 h-[90vh] w-full overflow-scroll">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                        Doctor Profile
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Manage your profile information and working hours
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
                    {/* Profile Information */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                            {/* Profile Image */}
                            <div className="text-center mb-4 sm:mb-6">
                                <img
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto object-cover border-4 border-green-100"
                                    src={
                                        profileData.image ||
                                        "/images/default-avatar.png"
                                    }
                                    alt={profileData.name || "Doctor"}
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
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg sm:text-xl font-semibold"
                                                placeholder="Doctor Name"
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
                                                type="number"
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleInputChange}
                                                min="0"
                                                max="50"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="Years of Experience"
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                                                {profileData.name}
                                            </h2>
                                            <p className="text-gray-600 text-sm sm:text-base">
                                                {profileData.degree} -{" "}
                                                {profileData.speciality}
                                            </p>
                                            <span className="inline-block bg-green-100 text-green-500 text-xs sm:text-sm px-2 py-1 rounded-full mt-1">
                                                {parseInt(
                                                    profileData.experience
                                                ) || 0}
                                                Years Experience
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                                        About
                                    </h3>
                                    {isEdit ? (
                                        <textarea
                                            name="about"
                                            value={formData.about}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                                            placeholder="Tell us about yourself..."
                                        />
                                    ) : (
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {profileData.about}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
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
                                            <span className="text-base sm:text-lg font-semibold text-green-600">
                                                {currency} {profileData.fees}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
                                        Address
                                    </h3>
                                    {isEdit ? (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                name="address.line1"
                                                value={formData.address.line1}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="Address Line 1"
                                            />
                                            <input
                                                type="text"
                                                name="address.line2"
                                                value={formData.address.line2}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                placeholder="Address Line 2 (optional)"
                                            />
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-600">
                                            {profileData.address?.line1}
                                            {profileData.address?.line2 && (
                                                <>
                                                    <br />
                                                    {profileData.address.line2}
                                                </>
                                            )}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        onChange={handleInputChange}
                                        checked={formData.available}
                                        type="checkbox"
                                        id="available-checkbox"
                                        name="available"
                                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                                    />
                                    <label
                                        htmlFor="available-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-700"
                                    >
                                        Available for appointments
                                    </label>
                                </div>

                                {isEdit ? (
                                    <div className="space-y-2">
                                        <button
                                            onClick={updateProfile}
                                            disabled={loading}
                                            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:opacity-85 transition-colors disabled:opacity-50"
                                        >
                                            {loading
                                                ? "Saving..."
                                                : "Save Changes"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEdit(false);
                                                if (profileData) {
                                                    setFormData({
                                                        name:
                                                            profileData.name ||
                                                            "",
                                                        experience:
                                                            parseInt(
                                                                profileData.experience
                                                            ) || 0,
                                                        speciality:
                                                            profileData.speciality ||
                                                            "",
                                                        degree:
                                                            profileData.degree ||
                                                            "",
                                                        about:
                                                            profileData.about ||
                                                            "",
                                                        fees:
                                                            profileData.fees ||
                                                            0,
                                                        available:
                                                            profileData.available ||
                                                            true,
                                                        address: {
                                                            line1:
                                                                profileData
                                                                    .address
                                                                    ?.line1 ||
                                                                "",
                                                            line2:
                                                                profileData
                                                                    .address
                                                                    ?.line2 ||
                                                                "",
                                                        },
                                                    });
                                                }
                                            }}
                                            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsEdit(true)}
                                        className="w-full border border-green-600 text-green-600 py-2 px-4 rounded-lg hover:bg-green-50 transition-colors"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Working Hours Settings */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                                        Working Hours
                                    </h2>
                                    <p className="text-gray-600 text-sm sm:text-base">
                                        Set your availability for each day of
                                        the week
                                    </p>
                                </div>
                                <div className="mt-2 sm:mt-0 flex sm:space-x-2">
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

                            <div className="space-y-4">
                                {days.map(({ key, label }) => (
                                    <div
                                        key={key}
                                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
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
                                            <span className="font-medium text-gray-700 min-w-[80px] text-sm sm:text-base">
                                                {label}
                                            </span>
                                        </div>

                                        {slotsSettings.workingHours[key]
                                            ?.enabled && (
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
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
                                                    className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                />
                                                <span className="text-gray-500 my-2 sm:my-0 sm:mx-2 text-sm sm:text-base">
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
                                                    className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Summary Section */}
                                <div className="border-t pt-4 mt-6">
                                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                                        <h4 className="font-medium text-primary mb-2 text-sm sm:text-base">
                                            Working Hours Summary
                                        </h4>
                                        <div className="text-sm text-primary/90">
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

                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <div className="mb-4 sm:mb-0">
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
                                                className="w-full sm:w-auto border border-gray-300 rounded px-3 py-2 text-sm focus:ring-1 focus:ring-green-300 focus:border-green-300 outline-none"
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
                                            className="w-full sm:w-auto bg-primary text-white py-2 px-6 rounded-lg hover:opacity-85 transition-colors disabled:opacity-50"
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

export default DoctorProfile;
