// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyProfile = () => {
//     const { userData, setUserData, token, backendUrl, loadUserProfileData } =
//         useContext(AppContext);

//     const [isEdit, setIsEdit] = useState(false);
//     const [image, setImage] = useState(null); // خليها null بدل false

//     const updateUserProfileData = async () => {
//         try {
//             const formData = new FormData();
//             formData.append("name", userData.name);
//             formData.append("phone", userData.phone);
//             formData.append("address", JSON.stringify(userData.address));
//             formData.append("gender", userData.gender);
//             formData.append("dob", userData.dob);

//             if (image) {
//                 formData.append("image", image);
//             }

//             const { data } = await axios.post(
//                 backendUrl + "/api/user/update-profile",
//                 formData,
//                 {
//                     headers: { token, "Content-Type": "multipart/form-data" },
//                 }
//             );

//             if (data.success) {
//                 toast.success(data.message);

//                 // جلب بيانات البروفايل من جديد وتحديث الحالة
//                 await loadUserProfileData();

//                 // تأكد من تحديث userData فوراً (إذا loadUserProfileData لا يحدث setUserData بشكل صحيح)
//                 // يمكنك إزالة هذا إذا كان loadUserProfileData يحدث setUserData بشكل صحيح
//                 // setUserData(data.updatedUser || userData);

//                 setIsEdit(false);
//                 setImage(null);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error(error.message);
//         }
//     };

//     return (
//         userData && (
//             <div className="max-w-lg flex flex-col gap-2 text-sm ">
//                 {isEdit ? (
//                     <label htmlFor="image">
//                         <div className="inline-block relative cursor-pointer">
//                             <img
//                                 className="w-36 rounded opacity-75"
//                                 src={
//                                     image
//                                         ? URL.createObjectURL(image)
//                                         : userData.image
//                                 }
//                                 alt=""
//                             />
// <img
//     className="w-10 absolute bottom-12 right-12"
//     src={image ? "" : assets.upload_icon}
//     alt=""
// />
//                             <input
//                                 onChange={(e) => setImage(e.target.files[0])}
//                                 type="file"
//                                 id="image"
//                                 accept="image/*"
//                                 hidden
//                             />
//                         </div>
//                     </label>
//                 ) : (
//                     <img className="w-36 rounded" src={userData.image} alt="" />
//                 )}

//                 {isEdit ? (
//                     <input
//                         className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
//                         type="text"
//                         value={userData.name}
//                         onChange={(e) =>
//                             setUserData((prev) => ({
//                                 ...prev,
//                                 name: e.target.value,
//                             }))
//                         }
//                     />
//                 ) : (
//                     <p className="font-medium text-3xl text-neutral-800 mt-4">
//                         {userData.name}
//                     </p>
//                 )}

//                 <hr className="bg-zinc-400 h-[1px] border-none" />
//                 <div>
//                     <p className="text-neutral-500 underline mt-3">
//                         CONTACT INFORMATION
//                     </p>
//                     <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//                         <p className="font-medium">Email id:</p>
//                         <p className="text-green-500">{userData.email}</p>
//                         <p className="font-medium">Phone:</p>
//                         {isEdit ? (
//                             <input
//                                 className="bg-gray-100 max-w-52"
//                                 type="text"
//                                 placeholder="Enter Whats App Number"
//                                 value={userData.phone}
//                                 onChange={(e) =>
//                                     setUserData((prev) => ({
//                                         ...prev,
//                                         phone: e.target.value,
//                                     }))
//                                 }
//                             />
//                         ) : (
//                             <p className="text-green-400">{userData.phone}</p>
//                         )}
//                         <p className="font-medium ">Address:</p>
//                         {isEdit ? (
//                             <p>
//                                 <input
//                                     className="bg-gray-50"
//                                     onChange={(e) =>
//                                         setUserData((prev) => ({
//                                             ...prev,
//                                             address: {
//                                                 ...prev.address,
//                                                 line1: e.target.value,
//                                             },
//                                         }))
//                                     }
//                                     value={userData.address.line1}
//                                     type="text"
//                                 />
//                                 <br />
//                                 <input
//                                     className="bg-gray-50"
//                                     onChange={(e) =>
//                                         setUserData((prev) => ({
//                                             ...prev,
//                                             address: {
//                                                 ...prev.address,
//                                                 line2: e.target.value,
//                                             },
//                                         }))
//                                     }
//                                     value={userData.address.line2}
//                                     type="text"
//                                 />
//                             </p>
//                         ) : (
//                             <p className="text-gray-500">
//                                 {userData.address.line1}
//                                 <br />
//                                 {userData.address.line2}
//                             </p>
//                         )}
//                     </div>
//                 </div>
//                 <div>
//                     <p className="text-neutral-500 underline mt-3">
//                         BASIC INFORMATION
//                     </p>
//                     <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//                         <p className="font-medium">Gender:</p>
//                         {isEdit ? (
//                             <select
//                                 className="max-w-20 bg-gray-100"
//                                 onChange={(e) =>
//                                     setUserData((prev) => ({
//                                         ...prev,
//                                         gender: e.target.value,
//                                     }))
//                                 }
//                                 value={userData.gender}
//                             >
//                                 <option value="Male">Male</option>
//                                 <option value="Female">Female</option>
//                             </select>
//                         ) : (
//                             <p className="text-gray-400">{userData.gender}</p>
//                         )}
//                         <p className="font-medium">Birthday:</p>
//                         {isEdit ? (
//                             <input
//                                 className="max-w-28 bg-gray-100"
//                                 type="date"
//                                 onChange={(e) =>
//                                     setUserData((prev) => ({
//                                         ...prev,
//                                         dob: e.target.value,
//                                     }))
//                                 }
//                                 value={userData.dob}
//                             />
//                         ) : (
//                             <p className="text-gray-400">{userData.dob}</p>
//                         )}
//                     </div>
//                 </div>

//                 <div className="mt-10">
//                     {isEdit ? (
//                         <button
//                             className="border border-primary px-8 py-2 rounded-[6px] hover:bg-primary hover:text-white transition-all duration-300"
//                             onClick={updateUserProfileData}
//                         >
//                             Save information
//                         </button>
//                     ) : (
//                         <button
//                             className="border border-primary px-8 py-2 rounded-[6px] hover:bg-primary hover:text-white transition-all duration-300"
//                             onClick={() => setIsEdit(true)}
//                         >
//                             Edit
//                         </button>
//                     )}
//                 </div>
//             </div>
//         )
//     );
// };

// export default MyProfile;

// import React, { useContext, useState, useEffect } from "react";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Loader from "../components/Loader";

// const MyProfile = () => {
//     const { userData, setUserData, token, backendUrl, loadUserProfileData } =
//         useContext(AppContext);
//     const [isEdit, setIsEdit] = useState(false);
//     const [image, setImage] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (!userData || Object.keys(userData).length === 0) {
//                 setLoading(true);
//                 await loadUserProfileData();
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [userData, loadUserProfileData]);

//     const updateUserProfileData = async () => {
//         try {
//             setLoading(true); // تبدأ عرض الـ Loader عند بداية الحفظ

//             const formData = new FormData();
//             formData.append("name", userData.name);
//             formData.append("phone", userData.phone);
//             formData.append("address", JSON.stringify(userData.address));
//             formData.append("gender", userData.gender);
//             formData.append("dob", userData.dob);

//             if (image) {
//                 formData.append("image", image);
//             }

//             const { data } = await axios.post(
//                 backendUrl + "/api/user/update-profile",
//                 formData,
//                 {
//                     headers: {
//                         token,
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );

//             if (data.success) {
//                 toast.success(data.message);
//                 await loadUserProfileData();
//                 setIsEdit(false);
//                 setImage(null);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error("حدث خطأ أثناء تحديث البيانات");
//         } finally {
//             setLoading(false); // إخفاء الـ Loader بعد انتهاء الحفظ سواء بنجاح أو فشل
//         }
//     };

//     if (loading || !userData) {
//         return <Loader />;
//     }

//     return (
//         <div className="max-w-lg flex flex-col gap-2 text-sm">
//             {/* صورة المستخدم */}
//             {isEdit ? (
//                 <label
//                     htmlFor="image"
//                     className="inline-block relative cursor-pointer"
//                 >
//                     <img
//                         className="w-36 rounded opacity-75"
//                         src={
//                             image ? URL.createObjectURL(image) : userData.image
//                         }
//                         alt="profile"
//                     />
//                     <img
//                         className="w-10 absolute bottom-12 right-12"
//                         src={image ? "" : assets.upload_icon}
//                         alt=""
//                     />
//                     <input
//                         type="file"
//                         id="image"
//                         accept="image/*"
//                         hidden
//                         onChange={(e) => setImage(e.target.files[0])}
//                     />
//                 </label>
//             ) : (
//                 <img
//                     className="w-36 rounded"
//                     src={userData.image}
//                     alt="profile"
//                 />
//             )}

//             {/* الاسم */}
//             {isEdit ? (
//                 <input
//                     className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
//                     type="text"
//                     value={userData.name}
//                     onChange={(e) =>
//                         setUserData((prev) => ({
//                             ...prev,
//                             name: e.target.value,
//                         }))
//                     }
//                 />
//             ) : (
//                 <p className="font-medium text-3xl text-neutral-800 mt-4">
//                     {userData.name}
//                 </p>
//             )}

//             <hr className="bg-zinc-400 h-[1px] border-none" />

//             {/* بيانات التواصل */}
//             <div>
//                 <p className="text-neutral-500 underline mt-3">
//                     CONTACT INFORMATION
//                 </p>
//                 <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//                     <p className="font-medium">Email id:</p>
//                     <p className="text-green-500">{userData.email}</p>

//                     <p className="font-medium">Phone:</p>
//                     {isEdit ? (
//                         <input
//                             className="bg-gray-100 max-w-52"
//                             type="text"
//                             placeholder="Enter WhatsApp Number"
//                             value={userData.phone}
//                             onChange={(e) =>
//                                 setUserData((prev) => ({
//                                     ...prev,
//                                     phone: e.target.value,
//                                 }))
//                             }
//                         />
//                     ) : (
//                         <p className="text-green-400">{userData.phone}</p>
//                     )}

//                     <p className="font-medium">Address:</p>
//                     {isEdit ? (
//                         <div>
//                             <input
//                                 className="bg-gray-50 w-full mb-1"
//                                 type="text"
//                                 placeholder="Address Line 1"
//                                 value={userData.address?.line1 || ""}
//                                 onChange={(e) =>
//                                     setUserData((prev) => ({
//                                         ...prev,
//                                         address: {
//                                             ...prev.address,
//                                             line1: e.target.value,
//                                         },
//                                     }))
//                                 }
//                             />
//                             <input
//                                 className="bg-gray-50 w-full"
//                                 type="text"
//                                 placeholder="Address Line 2"
//                                 value={userData.address?.line2 || ""}
//                                 onChange={(e) =>
//                                     setUserData((prev) => ({
//                                         ...prev,
//                                         address: {
//                                             ...prev.address,
//                                             line2: e.target.value,
//                                         },
//                                     }))
//                                 }
//                             />
//                         </div>
//                     ) : (
//                         <p className="text-gray-500">
//                             {userData.address?.line1}
//                             <br />
//                             {userData.address?.line2}
//                         </p>
//                     )}
//                 </div>
//             </div>

//             {/* معلومات اساسية */}
//             <div>
//                 <p className="text-neutral-500 underline mt-3">
//                     BASIC INFORMATION
//                 </p>
//                 <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//                     <p className="font-medium">Gender:</p>
//                     {isEdit ? (
//                         <select
//                             className="max-w-20 bg-gray-100"
//                             value={userData.gender}
//                             onChange={(e) =>
//                                 setUserData((prev) => ({
//                                     ...prev,
//                                     gender: e.target.value,
//                                 }))
//                             }
//                         >
//                             <option value="male">male</option>
//                             <option value="female">female</option>
//                         </select>
//                     ) : (
//                         <p className="text-gray-400">{userData.gender}</p>
//                     )}

//                     <p className="font-medium">Birthday:</p>
//                     {isEdit ? (
//                         <input
//                             className="max-w-28 bg-gray-100"
//                             type="date"
//                             value={userData.dob}
//                             onChange={(e) =>
//                                 setUserData((prev) => ({
//                                     ...prev,
//                                     dob: e.target.value,
//                                 }))
//                             }
//                         />
//                     ) : (
//                         <p className="text-gray-400">{userData.dob}</p>
//                     )}
//                 </div>
//             </div>

//             {/* أزرار الحفظ والتعديل */}
//             <div className="mt-10">
//                 {isEdit ? (
//                     <button
//                         className="border border-primary px-8 py-2 rounded-[6px] hover:bg-primary hover:text-white transition-all duration-300"
//                         onClick={updateUserProfileData}
//                     >
//                         Save information
//                     </button>
//                 ) : (
//                     <button
//                         className="border border-primary px-8 py-2 rounded-[6px] hover:bg-primary hover:text-white transition-all duration-300"
//                         onClick={() => setIsEdit(true)}
//                     >
//                         Edit
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyProfile;

import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const MyProfile = () => {
    const { userData, setUserData, token, backendUrl, loadUserProfileData } =
        useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tempData, setTempData] = useState({
        name: "",
        phone: "",
        address: {
            line1: "",
            line2: "",
        },
        gender: "male",
        dob: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!userData || Object.keys(userData).length === 0) {
                setLoading(true);
                await loadUserProfileData();
                setLoading(false);
            }
        };
        fetchData();
    }, [userData, loadUserProfileData]);

    // Initialize temp data when entering edit mode
    useEffect(() => {
        if (isEdit && userData) {
            setTempData({
                name: userData.name || "",
                phone: userData.phone || "",
                address: {
                    line1: userData.address?.line1 || "",
                    line2: userData.address?.line2 || "",
                },
                gender: userData.gender || "male",
                dob: userData.dob || "",
            });
        }
    }, [isEdit, userData]);

    const updateUserProfileData = async () => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("name", tempData.name);
            formData.append("phone", tempData.phone);
            formData.append("address", JSON.stringify(tempData.address));
            formData.append("gender", tempData.gender);
            formData.append("dob", tempData.dob);

            if (image) {
                formData.append("image", image);
            }

            const { data } = await axios.post(
                backendUrl + "/api/user/update-profile",
                formData,
                {
                    headers: {
                        token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data.success) {
                toast.success("Profile updated successfully!");
                await loadUserProfileData();
                setIsEdit(false);
                setImage(null);
                setTempData({});
            } else {
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating your profile");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEdit(false);
        setImage(null);
        setTempData({});
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Not set";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading || !userData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-4 mx-6">
            <div className="max-w-8xl px-4">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        My Profile
                    </h1>
                    <p className="text-gray-600">
                        Manage your personal information and preferences
                    </p>
                </div>

                <div className="bg-white rounded-xl border overflow-hidden">
                    {/* Profile Header */}
                    <div className=" px-8 py-6 text-gray-900 border  bottom-1 bg-white rounded-t[8px] rounded-b-0 overflow-hidden mb-8">
                        <div className="flex items-center gap-6">
                            {/* Profile Image */}
                            <div className="relative mr-6 ">
                                {isEdit ? (
                                    <label
                                        htmlFor="image"
                                        className="cursor-pointer group"
                                    >
                                        <div className="relative">
                                            <img
                                                className="w-44 h- rounded-l-6 rounded-r-2 object-cover object-top group-hover:border-white transition-all duration-200"
                                                src={
                                                    image
                                                        ? URL.createObjectURL(
                                                              image
                                                          )
                                                        : userData.image ||
                                                          assets.profile_pic
                                                }
                                                alt="Profile"
                                                onError={(e) => {
                                                    e.target.src =
                                                        assets.profile_pic;
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/20 rounded-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                <svg
                                                    className="w-6 h-6 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) =>
                                                setImage(e.target.files[0])
                                            }
                                        />
                                    </label>
                                ) : (
                                    <img
                                        className="w-44 h- rounded-[16px] object-cover object-top "
                                        src={
                                            userData.image || assets.profile_pic
                                        }
                                        alt="Profile"
                                        onError={(e) => {
                                            e.target.src = assets.profile_pic;
                                        }}
                                    />
                                )}
                            </div>

                            {/* Name and Status */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    {isEdit ? (
                                        <input
                                            className="text-2xl font-bold bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                                            type="text"
                                            value={tempData.name}
                                            onChange={(e) =>
                                                setTempData((prev) => ({
                                                    ...prev,
                                                    name: e.target.value,
                                                }))
                                            }
                                            placeholder="Enter your name"
                                        />
                                    ) : (
                                        <h2 className="text-2xl font-bold">
                                            {userData.name}
                                        </h2>
                                    )}
                                </div>
                                <p className="text-gray-600">
                                    {userData.email}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                {isEdit ? (
                                    <>
                                        <button
                                            onClick={updateUserProfileData}
                                            disabled={loading}
                                            className="px-6 py-2 bg-white border border-1 border-primary text-primary rounded-lg font-medium hover:bg-green-50 transition-colors disabled:opacity-50"
                                        >
                                            {loading
                                                ? "Saving..."
                                                : "Save Changes"}
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="px-6 py-2 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEdit(true)}
                                        className="px-6 py-2 border border-1 border-primary bg-white text-primary rounded-lg font-medium hover:bg-green-50 transition-colors"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Contact Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Contact Information
                                </h3>

                                <div className="space-y-4">
                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                            <svg
                                                className="w-4 h-4 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                                />
                                            </svg>
                                            <span className="text-gray-900">
                                                {userData.email}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        {isEdit ? (
                                            <input
                                                type="tel"
                                                value={tempData.phone}
                                                onChange={(e) =>
                                                    setTempData((prev) => ({
                                                        ...prev,
                                                        phone: e.target.value,
                                                    }))
                                                }
                                                placeholder="Enter your phone number"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                                <svg
                                                    className="w-4 h-4 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                                <span className="text-gray-900">
                                                    {userData.phone ||
                                                        "Not provided"}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Address
                                        </label>
                                        {isEdit ? (
                                            <div className="space-y-2">
                                                <input
                                                    type="text"
                                                    value={
                                                        tempData.address
                                                            ?.line1 || ""
                                                    }
                                                    onChange={(e) =>
                                                        setTempData((prev) => ({
                                                            ...prev,
                                                            address: {
                                                                ...prev.address,
                                                                line1: e.target
                                                                    .value,
                                                            },
                                                        }))
                                                    }
                                                    placeholder="Address Line 1"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                />
                                                <input
                                                    type="text"
                                                    value={
                                                        tempData.address
                                                            ?.line2 || ""
                                                    }
                                                    onChange={(e) =>
                                                        setTempData((prev) => ({
                                                            ...prev,
                                                            address: {
                                                                ...prev.address,
                                                                line2: e.target
                                                                    .value,
                                                            },
                                                        }))
                                                    }
                                                    placeholder="Address Line 2 (Optional)"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                                                <svg
                                                    className="w-4 h-4 text-gray-400 mt-0.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                <div className="text-gray-900">
                                                    {userData.address?.line1 ? (
                                                        <>
                                                            <div>
                                                                {
                                                                    userData
                                                                        .address
                                                                        .line1
                                                                }
                                                            </div>
                                                            {userData.address
                                                                .line2 && (
                                                                <div>
                                                                    {
                                                                        userData
                                                                            .address
                                                                            .line2
                                                                    }
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-gray-500">
                                                            No address provided
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    Personal Information
                                </h3>

                                <div className="space-y-4">
                                    {/* Gender */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Gender
                                        </label>
                                        {isEdit ? (
                                            <select
                                                value={tempData.gender}
                                                onChange={(e) =>
                                                    setTempData((prev) => ({
                                                        ...prev,
                                                        gender: e.target.value,
                                                    }))
                                                }
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            >
                                                <option value="male">
                                                    Male
                                                </option>
                                                <option value="female">
                                                    Female
                                                </option>
                                                <option value="other">
                                                    Other
                                                </option>
                                            </select>
                                        ) : (
                                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                                <svg
                                                    className="w-4 h-4 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                <span className="text-gray-900 capitalize">
                                                    {userData.gender ||
                                                        "Not specified"}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Date of Birth */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date of Birth
                                        </label>
                                        {isEdit ? (
                                            <input
                                                type="date"
                                                value={tempData.dob}
                                                onChange={(e) =>
                                                    setTempData((prev) => ({
                                                        ...prev,
                                                        dob: e.target.value,
                                                    }))
                                                }
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                                <svg
                                                    className="w-4 h-4 text-gray-400"
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
                                                <span className="text-gray-900">
                                                    {formatDate(userData.dob)}
                                                </span>
                                            </div>
                                        )}
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

export default MyProfile;
