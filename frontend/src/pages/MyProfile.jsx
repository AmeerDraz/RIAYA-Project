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

import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
    const { userData, setUserData, token, backendUrl, loadUserProfileData } =
        useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append("name", userData.name);
            formData.append("phone", userData.phone);
            formData.append("address", JSON.stringify(userData.address));
            formData.append("gender", userData.gender);
            formData.append("dob", userData.dob);

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
                toast.success(data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء تحديث البيانات");
        }
    };

    if (loading || !userData) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="max-w-lg flex flex-col gap-2 text-sm">
            {/* صورة المستخدم */}
            {isEdit ? (
                <label
                    htmlFor="image"
                    className="inline-block relative cursor-pointer"
                >
                    <img
                        className="w-36 rounded opacity-75"
                        src={
                            image ? URL.createObjectURL(image) : userData.image
                        }
                        alt="profile"
                    />
                    <img
                        className="w-10 absolute bottom-12 right-12"
                        src={image ? "" : assets.upload_icon}
                        alt=""
                    />
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>
            ) : (
                <img
                    className="w-36 rounded"
                    src={userData.image}
                    alt="profile"
                />
            )}

            {/* الاسم */}
            {isEdit ? (
                <input
                    className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />
            ) : (
                <p className="font-medium text-3xl text-neutral-800 mt-4">
                    {userData.name}
                </p>
            )}

            <hr className="bg-zinc-400 h-[1px] border-none" />

            {/* بيانات التواصل */}
            <div>
                <p className="text-neutral-500 underline mt-3">
                    CONTACT INFORMATION
                </p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium">Email id:</p>
                    <p className="text-green-500">{userData.email}</p>

                    <p className="font-medium">Phone:</p>
                    {isEdit ? (
                        <input
                            className="bg-gray-100 max-w-52"
                            type="text"
                            placeholder="Enter WhatsApp Number"
                            value={userData.phone}
                            onChange={(e) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                }))
                            }
                        />
                    ) : (
                        <p className="text-green-400">{userData.phone}</p>
                    )}

                    <p className="font-medium">Address:</p>
                    {isEdit ? (
                        <div>
                            <input
                                className="bg-gray-50 w-full mb-1"
                                type="text"
                                placeholder="Address Line 1"
                                value={userData.address?.line1 || ""}
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        address: {
                                            ...prev.address,
                                            line1: e.target.value,
                                        },
                                    }))
                                }
                            />
                            <input
                                className="bg-gray-50 w-full"
                                type="text"
                                placeholder="Address Line 2"
                                value={userData.address?.line2 || ""}
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        address: {
                                            ...prev.address,
                                            line2: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            {userData.address?.line1}
                            <br />
                            {userData.address?.line2}
                        </p>
                    )}
                </div>
            </div>

            {/* معلومات اساسية */}
            <div>
                <p className="text-neutral-500 underline mt-3">
                    BASIC INFORMATION
                </p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className="font-medium">Gender:</p>
                    {isEdit ? (
                        <select
                            className="max-w-20 bg-gray-100"
                            value={userData.gender}
                            onChange={(e) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    gender: e.target.value,
                                }))
                            }
                        >
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                    ) : (
                        <p className="text-gray-400">{userData.gender}</p>
                    )}

                    <p className="font-medium">Birthday:</p>
                    {isEdit ? (
                        <input
                            className="max-w-28 bg-gray-100"
                            type="date"
                            value={userData.dob}
                            onChange={(e) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    dob: e.target.value,
                                }))
                            }
                        />
                    ) : (
                        <p className="text-gray-400">{userData.dob}</p>
                    )}
                </div>
            </div>

            {/* أزرار الحفظ والتعديل */}
            <div className="mt-10">
                {isEdit ? (
                    <button
                        className="border border-primary px-8 py-2 rounded-[6px] hover:bg-primary hover:text-white transition-all duration-300"
                        onClick={updateUserProfileData}
                    >
                        Save information
                    </button>
                ) : (
                    <button
                        className="border border-primary px-8 py-2 rounded-[6px] hover:bg-primary hover:text-white transition-all duration-300"
                        onClick={() => setIsEdit(true)}
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
