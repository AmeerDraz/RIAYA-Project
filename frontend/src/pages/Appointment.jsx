// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import RelatedDoctors from "../components/RelatedDoctors";
// import { toast } from "react-toastify";
// import axios from "axios";

// const Appointment = () => {
//     const { docId } = useParams();
//     const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
//         useContext(AppContext);

//     const daysOfWeek = ["SUN", "MON", "TUE", "WES", "THU", "FRI", "SAT"];

//     const navigate = useNavigate();

//     const [docInfo, setDocInfo] = useState(null);
//     const [docSlots, setDocSlots] = useState([]);
//     const [slotIndex, setSlotIndex] = useState(0);
//     const [slotTime, setSlotTime] = useState("");

//     const fetchDocInfo = async () => {
//         const docInfo = doctors.find((doc) => doc._id === docId);
//         setDocInfo(docInfo);
//     };

//     const getAvailableSlots = async () => {
//         setDocSlots([]);

//         // getting current date
//         let today = new Date();

//         for (let i = 0; i < 7; i++) {
//             // getting date with index
//             let currentDate = new Date(today);
//             currentDate.setDate(today.getDate() + i);

//             // setting end time of the date with index
//             let endTime = new Date();
//             endTime.setDate(today.getDate() + i);
//             endTime.setHours(21, 0, 0, 0);

//             // setting hours
//             if (today.getDate() === currentDate.getDate()) {
//                 currentDate.setHours(
//                     currentDate.getHours() > 10
//                         ? currentDate.getHours() + 1
//                         : 10
//                 );
//                 currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
//             } else {
//                 currentDate.setHours(10);
//                 currentDate.setMinutes(0);
//             }

//             let timeSlots = [];

//             while (currentDate < endTime) {
//                 let formattedTime = currentDate.toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                 });

//                 // وظيفتهن لعند الشرط معهن لحتى الموعد المحجوز لا يظهر للمستخدم

//                 let day = currentDate.getDate();
//                 let month = currentDate.getMonth() + 1;
//                 let year = currentDate.getFullYear();

//                 const slotDate = day + "_" + month + "_" + year;

//                 const slotTime = formattedTime;

//                 const isSlotAvailable =
//                     docInfo.slots_booked[slotDate] &&
//                     docInfo.slots_booked[slotDate].includes(slotTime)
//                         ? false
//                         : true;

//                 if (isSlotAvailable) {
//                     // add Slot to array
//                     timeSlots.push({
//                         datetime: new Date(currentDate),
//                         time: formattedTime,
//                     });
//                 }

//                 // Increment current time by 30 minutes

//                 currentDate.setMinutes(currentDate.getMinutes() + 30);
//             }

//             setDocSlots((prev) => [...prev, timeSlots]);
//         }
//     };

//     const bookAppointment = async () => {
//         if (!token) {
//             toast.warn("Login to book appointment");
//             return navigate("/login");
//         }

//         try {
//             const date = docSlots[slotIndex][0].datetime;

//             let day = date.getDate();
//             let month = date.getMonth() + 1;
//             let year = date.getFullYear();

//             const slotDate = day + "_" + month + "_" + year;

//             // console.log(slotDate);

//             const { data } = await axios.post(
//                 backendUrl + "/api/user/book-appointment",
//                 { docId, slotDate, slotTime },
//                 { headers: { token } }
//             );

//             if (data.success) {
//                 toast.success(data.message);
//                 getDoctorsData();
//                 navigate("/my-appointments");
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message);
//         }
//     };

//     useEffect(() => {
//         fetchDocInfo();
//     }, [doctors, docId]);

//     useEffect(() => {
//         getAvailableSlots();
//     }, [docInfo]);

//     useEffect(() => {
//         console.log(docSlots);
//     }, [docSlots]);

//     return (
//         docInfo && (
//             <div>
//                 {/* ----------------- Doctor Details ------------------------- */}
//                 <div className="flex flex-col sm:flex-row gap-4">
//                     <div>
//                         <img
//                             className="bg-primary w-full sm:max-w-72 rounded-lg"
//                             src={docInfo.image}
//                             alt=""
//                         />
//                     </div>

//                     <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//                         {/* --------------- Doc Info : name, degree experience --------------- */}

//                         <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//                             {docInfo.name}
//                             <img
//                                 className="w-5"
//                                 src={assets.verified_icon}
//                                 alt=""
//                             />
//                         </p>
//                         <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
//                             <p>
//                                 {docInfo.degree} - {docInfo.speciality}
//                             </p>
//                             <button className="py-0.5 px-2 border text-xs rounded-[6px]">
//                                 {docInfo.experience}
//                             </button>
//                         </div>

//                         {/* -------- Doctor About ------------ */}

//                         <div>
//                             <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
//                                 About <img src={assets.info_icon} alt="" />
//                             </p>
//                             <p className="text-sm text-gray-500 max-w-[700px] mt-1">
//                                 {docInfo.about}
//                             </p>
//                         </div>
//                         <p className="text-gray-500 font-medium mt-4">
//                             Appointment fee:
//                             <span className="text-gray-600">
//                                 {currencySymbol}
//                                 {docInfo.fees}
//                             </span>
//                         </p>
//                     </div>
//                 </div>

//                 {/* ------------ Booking Slots ------------ */}

//                 <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
//                     <p>Booking slots</p>
//                     <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//                         {docSlots.length &&
//                             docSlots.map((item, index) => (
//                                 <div
//                                     onClick={() => setSlotIndex(index)}
//                                     className={`text-center py-6 min-w-16 rounded-[6px] cursor-pointer ${
//                                         slotIndex === index
//                                             ? "bg-primary text-white"
//                                             : "border border-gray-200"
//                                     }`}
//                                     key={index}
//                                 >
//                                     <p>
//                                         {item[0] &&
//                                             daysOfWeek[
//                                                 item[0].datetime.getDay()
//                                             ]}
//                                     </p>
//                                     <p>
//                                         {item[0] && item[0].datetime.getDate()}
//                                     </p>
//                                 </div>
//                             ))}
//                     </div>

//                     <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
//                         {docSlots.length &&
//                             docSlots[slotIndex].map((item, index) => (
//                                 <p
//                                     onClick={() => setSlotTime(item.time)}
//                                     className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-[6px] cursor-pointer ${
//                                         item.time === slotTime
//                                             ? "bg-primary text-white"
//                                             : "text-gray-400 border border-gray-300"
//                                     }`}
//                                     key={index}
//                                 >
//                                     {item.time.toLowerCase()}
//                                 </p>
//                             ))}
//                     </div>

//                     <button
//                         onClick={bookAppointment}
//                         className="bg-primary text-white text-sm font-light px-14 py-3 rounded-[6px] my-6"
//                     >
//                         Confirm
//                     </button>
//                 </div>

//                 {/* Listing Related Doctors */}
//                 <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
//             </div>
//         )
//     );
// };

// export default Appointment;

// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import RelatedDoctors from "../components/RelatedDoctors";
// import { toast } from "react-toastify";
// import axios from "axios";
// import Loader from "../components/Loader";

// const Appointment = () => {
//     const { docId } = useParams();
//     const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
//         useContext(AppContext);

//     const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//     const navigate = useNavigate();

//     const [docInfo, setDocInfo] = useState(null);
//     const [docSlots, setDocSlots] = useState([]);
//     const [slotIndex, setSlotIndex] = useState(null); // null by default, no selection
//     const [slotTime, setSlotTime] = useState("");
//     const [loading, setLoading] = useState(false); // Loader for fetch/book

//     // Fetch doctor info from context doctors list
//     const fetchDocInfo = () => {
//         const doc = doctors.find((doc) => doc._id === docId);
//         setDocInfo(doc || null);
//     };

//     // Generate available slots excluding booked ones

//     // const getAvailableSlots = () => {
//     //     if (!docInfo) return;

//     //     setDocSlots([]);
//     //     let today = new Date();

//     //     let newSlots = [];

//     //     for (let i = 0; i < 7; i++) {
//     //         let currentDate = new Date(today);
//     //         currentDate.setDate(today.getDate() + i);

//     //         let endTime = new Date(today);
//     //         endTime.setDate(today.getDate() + i);
//     //         endTime.setHours(21, 0, 0, 0);

//     //         if (today.getDate() === currentDate.getDate()) {
//     //             currentDate.setHours(
//     //                 currentDate.getHours() > 10
//     //                     ? currentDate.getHours() + 1
//     //                     : 10
//     //             );
//     //             currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
//     //         } else {
//     //             currentDate.setHours(10);
//     //             currentDate.setMinutes(0);
//     //         }

//     //         let timeSlots = [];

//     //         while (currentDate < endTime) {
//     //             let formattedTime = currentDate.toLocaleTimeString([], {
//     //                 hour: "2-digit",
//     //                 minute: "2-digit",
//     //             });

//     //             let day = currentDate.getDate();
//     //             let month = currentDate.getMonth() + 1;
//     //             let year = currentDate.getFullYear();

//     //             const slotDate = day + "_" + month + "_" + year;
//     //             const slotTimeCheck = formattedTime;

//     //             const isSlotAvailable =
//     //                 docInfo.slots_booked &&
//     //                 docInfo.slots_booked[slotDate] &&
//     //                 docInfo.slots_booked[slotDate].includes(slotTimeCheck)
//     //                     ? false
//     //                     : true;

//     //             if (isSlotAvailable) {
//     //                 timeSlots.push({
//     //                     datetime: new Date(currentDate),
//     //                     time: formattedTime,
//     //                 });
//     //             }

//     //             currentDate.setMinutes(currentDate.getMinutes() + 30);
//     //         }

//     //         newSlots.push(timeSlots);
//     //     }

//     //     setDocSlots(newSlots);
//     //     // Reset selection on slots reload
//     //     setSlotIndex(null);
//     //     setSlotTime("");
//     // };

//     //***************************** */
//     const getAvailableSlots = () => {
//         if (!docInfo) return;

//         setDocSlots([]);

//         const daysOfWeekFull = [
//             "Sunday",
//             "Monday",
//             "Tuesday",
//             "Wednesday",
//             "Thursday",
//             "Friday",
//             "Saturday",
//         ];

//         let today = new Date();

//         let newSlots = [];

//         const startTimeStr = docInfo.workingHours?.startTime || "10:00";
//         const endTimeStr = docInfo.workingHours?.endTime || "21:00";
//         const availableDays =
//             docInfo.workingHours?.availableDays || daysOfWeekFull;
//         const slotDuration = docInfo.slotDuration || 30;

//         const [startHour, startMinute] = startTimeStr.split(":").map(Number);
//         const [endHour, endMinute] = endTimeStr.split(":").map(Number);

//         for (let i = 0; i < 7; i++) {
//             let currentDate = new Date(today);
//             currentDate.setDate(today.getDate() + i);

//             let dayName = daysOfWeekFull[currentDate.getDay()];

//             if (!availableDays.includes(dayName)) {
//                 newSlots.push([]);
//                 continue;
//             }

//             let slotTimeDate = new Date(currentDate);
//             slotTimeDate.setHours(startHour, startMinute, 0, 0);

//             let endTimeDate = new Date(currentDate);
//             endTimeDate.setHours(endHour, endMinute, 0, 0);

//             // يوم العمل الحالي، لا تُظهر مواعيد قبل الآن + 30 دقيقة
//             if (i === 0) {
//                 const now = new Date();
//                 if (slotTimeDate < now) {
//                     slotTimeDate = new Date(now.getTime() + 30 * 60000);
//                 }
//             }

//             let timeSlots = [];

//             while (slotTimeDate < endTimeDate) {
//                 let formattedTime = slotTimeDate.toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                 });

//                 let day = slotTimeDate.getDate();
//                 let month = slotTimeDate.getMonth() + 1;
//                 let year = slotTimeDate.getFullYear();

//                 const slotDate = `${day}_${month}_${year}`;

//                 const isSlotAvailable = !(
//                     docInfo.slots_booked &&
//                     docInfo.slots_booked[slotDate] &&
//                     docInfo.slots_booked[slotDate].includes(formattedTime)
//                 );

//                 if (isSlotAvailable) {
//                     timeSlots.push({
//                         datetime: new Date(slotTimeDate),
//                         time: formattedTime,
//                     });
//                 }

//                 slotTimeDate = new Date(
//                     slotTimeDate.getTime() + slotDuration * 60000
//                 );
//             }

//             newSlots.push(timeSlots);
//         }

//         setDocSlots(newSlots);
//         setSlotIndex(null);
//         setSlotTime("");
//     };

//     /******************************* */

//     // Book appointment, requires day and time selected
//     const bookAppointment = async () => {
//         if (!token) {
//             toast.warn("Please login to book an appointment.");
//             return navigate("/login");
//         }

//         if (slotIndex === null) {
//             toast.error("Please select a day for the appointment.");
//             return;
//         }

//         if (!slotTime) {
//             toast.error("Please select a time for the appointment.");
//             return;
//         }

//         setLoading(true);

//         try {
//             const date = docSlots[slotIndex][0].datetime;

//             let day = date.getDate();
//             let month = date.getMonth() + 1;
//             let year = date.getFullYear();

//             const slotDate = day + "_" + month + "_" + year;

//             const { data } = await axios.post(
//                 backendUrl + "/api/user/book-appointment",
//                 { docId, slotDate, slotTime },
//                 { headers: { token } }
//             );

//             if (data.success) {
//                 toast.success(data.message);
//                 await getDoctorsData(); // Await refresh doctors data
//                 fetchDocInfo(); // Refresh current docInfo
//                 getAvailableSlots(); // Refresh slots based on updated bookings
//                 setSlotIndex(null);
//                 setSlotTime("");
//                 navigate("/my-appointments");
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error(error.message || "Failed to book appointment.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchDocInfo();
//     }, [doctors, docId]);

//     useEffect(() => {
//         if (docInfo) getAvailableSlots();
//     }, [docInfo]);

//     return (
//         <>
//             {loading && <Loader />}
//             {docInfo ? (
//                 <div>
//                     {/* Doctor Details */}
//                     <div className="flex flex-col sm:flex-row gap-4">
//                         <div>
//                             <img
//                                 className="bg-primary w-full sm:max-w-72 rounded-lg md:min-h-52 md:max-h-80"
//                                 src={docInfo.image}
//                                 alt={docInfo.name}
//                             />
//                         </div>

//                         <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
//                             <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
//                                 {docInfo.name}
//                                 <img
//                                     className="w-5"
//                                     src={assets.verified_icon}
//                                     alt="Verified icon"
//                                 />
//                             </p>
//                             <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
//                                 <p>
//                                     {docInfo.degree} - {docInfo.speciality}
//                                 </p>
//                                 <button className="py-0.5 px-2 border text-xs rounded-[6px]">
//                                     {docInfo.experience}
//                                 </button>
//                             </div>

//                             <div>
//                                 <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
//                                     About{" "}
//                                     <img
//                                         src={assets.info_icon}
//                                         alt="Info icon"
//                                     />
//                                 </p>
//                                 <p className="text-sm text-gray-500 max-w-[700px] mt-1">
//                                     {docInfo.about}
//                                 </p>
//                             </div>
//                             <p className="text-gray-500 font-medium mt-4">
//                                 Appointment fee:{" "}
//                                 <span className="text-gray-600">
//                                     {currencySymbol}
//                                     {docInfo.fees}
//                                 </span>
//                             </p>
//                         </div>
//                     </div>

//                     {/* Booking Slots */}
//                     <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
//                         <p>Booking slots</p>
//                         <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
//                             {docSlots.length > 0 &&
//                                 docSlots.map((daySlots, index) => (
//                                     <div
//                                         key={index}
//                                         onClick={() => setSlotIndex(index)}
//                                         className={`text-center py-6 min-w-16 rounded-[6px] cursor-pointer ${
//                                             slotIndex === index
//                                                 ? "bg-primary text-white"
//                                                 : "border border-gray-200"
//                                         }`}
//                                     >
//                                         <p>
//                                             {daySlots[0] &&
//                                                 daysOfWeek[
//                                                     daySlots[0].datetime.getDay()
//                                                 ]}
//                                         </p>
//                                         <p>
//                                             {daySlots[0] &&
//                                                 daySlots[0].datetime.getDate()}
//                                         </p>
//                                     </div>
//                                 ))}
//                         </div>

//                         <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
//                             {slotIndex !== null &&
//                                 docSlots[slotIndex]?.map((item, index) => (
//                                     <p
//                                         key={index}
//                                         onClick={() => setSlotTime(item.time)}
//                                         className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-[6px] cursor-pointer ${
//                                             item.time === slotTime
//                                                 ? "bg-primary text-white"
//                                                 : "text-gray-400 border border-gray-300"
//                                         }`}
//                                     >
//                                         {item.time.toLowerCase()}
//                                     </p>
//                                 ))}
//                         </div>

//                         <button
//                             onClick={bookAppointment}
//                             disabled={loading}
//                             className="bg-primary text-white text-sm font-light px-14 py-3 rounded-[6px] my-6 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             Confirm
//                         </button>
//                     </div>

//                     {/* Related Doctors */}
//                     <RelatedDoctors
//                         docId={docId}
//                         speciality={docInfo.speciality}
//                     />
//                 </div>
//             ) : (
//                 <p>Loading doctor information...</p>
//             )}
//         </>
//     );
// };

// export default Appointment;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/Loader";

const Appointment = () => {
    const { docId } = useParams();
    const { currencySymbol, backendUrl, token, getDoctorsData } =
        useContext(AppContext);
    const navigate = useNavigate();

    const [docInfo, setDocInfo] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [error, setError] = useState(null);

    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // Fetch doctor info and available slots
    const fetchDoctorData = async () => {
        try {
            setLoadingSlots(true);
            setError(null);

            if (!docId) {
                setError("No doctor ID provided");
                return;
            }

            const response = await axios.get(
                `${backendUrl}/api/user/doctor/${docId}/available-slots`
            );

            const { data } = response;

            if (data.success) {
                setDocInfo(data.doctorInfo);
                setAvailableSlots(data.slots);
                console.log("Doctor Info:", data.doctorInfo);
            } else {
                setError(data.message);
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching doctor data:", error);
            setError(
                error.response?.data?.message ||
                    "Failed to load doctor information"
            );
            toast.error("Failed to load doctor information");
        } finally {
            setLoadingSlots(false);
        }
    };

    // Book appointment
    // const bookAppointment = async () => {
    //     if (!token) {
    //         toast.warn("Please login to book an appointment.");
    //         return navigate("/login");
    //     }

    //     if (selectedDay === null) {
    //         toast.error("Please select a day for the appointment.");
    //         return;
    //     }

    //     if (!selectedTime) {
    //         toast.error("Please select a time for the appointment.");
    //         return;
    //     }

    //     setLoading(true);

    //     try {
    //         const selectedSlot = availableSlots[selectedDay].find(
    //             (slot) => slot.time === selectedTime
    //         );
    //         if (!selectedSlot) {
    //             toast.error("Selected slot is no longer available.");
    //             return;
    //         }

    //         const date = selectedSlot.date;

    //         // Ensure date is a Date object
    //         const dateObj = date instanceof Date ? date : new Date(date);

    //         // Check if date is valid
    //         if (isNaN(dateObj.getTime())) {
    //             toast.error("Invalid date selected.");
    //             return;
    //         }

    //         let day = dateObj.getDate();
    //         let month = dateObj.getMonth() + 1;
    //         let year = dateObj.getFullYear();
    //         const slotDate = `${day}_${month}_${year}`;

    //         const { data } = await axios.post(
    //             `${backendUrl}/api/user/book-Appointment`,
    //             { docId, slotDate, slotTime: selectedTime },
    //             { headers: { token } }
    //         );

    //         if (data.success) {
    //             toast.success(data.message);
    //             await getDoctorsData(); // Refresh doctors data
    //             navigate("/my-appointments");
    //         } else {
    //             toast.error(data.message);
    //         }
    //     } catch (error) {
    //         console.error("Error booking appointment:", error);
    //         toast.error(
    //             error.response?.data?.message || "Failed to book appointment."
    //         );
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Please login to book an appointment.");
            return navigate("/login");
        }

        if (selectedDay === null) {
            toast.error("Please select a day for the appointment.");
            return;
        }

        if (!selectedTime) {
            toast.error("Please select a time for the appointment.");
            return;
        }

        setLoading(true);

        try {
            const selectedSlot = availableSlots[selectedDay].find(
                (slot) => slot.time === selectedTime
            );
            if (!selectedSlot) {
                toast.error("Selected slot is no longer available.");
                return;
            }

            const date = selectedSlot.date;
            const dateObj = date instanceof Date ? date : new Date(date);

            if (isNaN(dateObj.getTime())) {
                toast.error("Invalid date selected.");
                return;
            }

            let day = dateObj.getDate();
            let month = dateObj.getMonth() + 1;
            let year = dateObj.getFullYear();
            const slotDate = `${day}_${month}_${year}`;

      
            const { data } = await axios.post(
                            `${backendUrl}/api/user/book-Appointment`,
                            { docId, slotDate, slotTime: selectedTime },
                            { headers: { token } }
                        );
            

            if (data.success) {
                toast.success(data.message);
                await getDoctorsData();
                navigate("/my-appointments");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
            toast.error(
                error.response?.data?.message || "Failed to book appointment."
            );
        } finally {
            setLoading(false);
        }
    };
    



    // Get day name from date
    const getDayName = (date) => {
        // Ensure date is a Date object
        const dateObj = date instanceof Date ? date : new Date(date);

        // Check if date is valid
        if (isNaN(dateObj.getTime())) {
            return "Invalid Date";
        }

        return dayNames[dateObj.getDay()];
    };

    // Format date for display
    const formatDate = (date) => {
        // Ensure date is a Date object
        const dateObj = date instanceof Date ? date : new Date(date);

        // Check if date is valid
        if (isNaN(dateObj.getTime())) {
            return "Invalid Date";
        }

        return new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        }).format(dateObj);
    };

    useEffect(() => {
        fetchDoctorData();
    }, [docId]);

    if (loadingSlots) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Error Loading Doctor
                    </h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <div className="space-y-2">
                        <button
                            onClick={() => navigate("/doctors")}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mr-2"
                        >
                            Back to Doctors
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!docInfo) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Doctor Not Found
                    </h2>
                    <p className="text-gray-600 mb-4">
                        The doctor you're looking for doesn't exist.
                    </p>
                    <button
                        onClick={() => navigate("/doctors")}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-85"
                    >
                        Back to Doctors
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {loading && <Loader />}
            <div className="min-h-screen py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Doctor Details
                    <div className="bg-white max-h-96 rounded-lg shadow-lg overflow-hidden mb-8">
                        <div className="md:flex">
                            <div className="md:w-1/3">
                                <img
                                    className="w-full h-64 md:h-full object-cover"
                                    src={
                                        docInfo.image &&
                                        docInfo.image.trim() !== ""
                                            ? docInfo.image
                                            : assets.doctor_icon
                                    }
                                    alt={docInfo.name}
                                    onError={(e) => {
                                        e.target.src = assets.doctor_icon;
                                    }}
                                />
                            </div>
                            <div className="md:w-2/3 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {docInfo.name}
                                    </h1>
                                    <img
                                        className="w-6 h-6"
                                        src={assets.verified_icon}
                                        alt="Verified"
                                    />
                                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <p className="text-lg text-gray-600">
                                        {docInfo.degree} - {docInfo.speciality}
                                    </p>
                                    <span className="bg-green-100 text-green-500 text-sm px-3 py-1 rounded-full">
                                        {docInfo.experience} Years Experience
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        About
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {docInfo.about ||
                                            "No information available about this doctor."}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Appointment Fee
                                        </p>
                                        <p className="text-2xl font-bold text-primary">
                                            {currencySymbol} {docInfo.fees}
                                        </p>
                                    </div>
                                    <div
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${
                                            docInfo.available
                                                ? "bg-green-100 text-green-500"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {docInfo.available
                                            ? "Available"
                                            : "Not Available"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Doctor Details */}
                    <div className="bg-white border border-1 rounded-lg  overflow-hidden mb-8 max-w-full px-6 py-6">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3">
                                <img
                                    className="w-full h-96 md:min-h-96 max-h-96 md:h-full object-cover object-top rounded-l-[8px] rounded-r-[4px]"
                                    src={
                                        docInfo.image &&
                                        docInfo.image.trim() !== ""
                                            ? docInfo.image
                                            : assets.doctor_icon
                                    }
                                    alt={docInfo.name}
                                    onError={(e) => {
                                        e.target.src = assets.doctor_icon;
                                    }}
                                />
                            </div>
                            <div className="w-full ml-2 md:w-2/3 p-4 md:p-6">
                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {docInfo.name}
                                    </h1>
                                    <img
                                        className="w-6 h-6"
                                        src={assets.verified_icon}
                                        alt="Verified"
                                    />
                                </div>

                                <div className="flex items-center gap-3 mb-4 flex-wrap">
                                    <p className="text-lg text-gray-600">
                                        {docInfo.degree} - {docInfo.speciality}
                                    </p>
                                    <span className="bg-green-100 text-green-500 text-sm px-3 py-1 rounded-full whitespace-nowrap">
                                        {docInfo.experience} Years Experience
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        About
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {docInfo.about ||
                                            "No information available about this doctor."}
                                    </p>
                                </div>

                                {/*  Address section */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Address
                                    </h3>
                                    {docInfo.address &&
                                    docInfo.address.line1 ? (
                                        <p className="text-gray-600 leading-relaxed">
                                            {docInfo.address.line1}
                                            {docInfo.address.line2
                                                ? `, ${docInfo.address.line2}`
                                                : ""}
                                        </p>
                                    ) : (
                                        <p className="text-gray-600 leading-relaxed">
                                            Address not available.
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Appointment Fee
                                        </p>
                                        <p className="text-2xl font-bold text-primary">
                                            {currencySymbol} {docInfo.fees}
                                        </p>
                                    </div>
                                    <div
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                                            docInfo.available
                                                ? "bg-green-100 text-green-500"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {docInfo.available
                                            ? "Available"
                                            : "Not Available"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Book Appointment
                        </h2>

                        {availableSlots.every((day) => day.length === 0) ? (
                            <div className="text-center py-8">
                                <div className="text-gray-500 mb-4">
                                    <svg
                                        className="w-16 h-16 mx-auto mb-4"
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
                                    No Available Slots
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    This doctor doesn't have any available
                                    appointment slots at the moment.
                                </p>
                                <p className="text-sm text-gray-500">
                                    Please check back later or contact the
                                    doctor directly.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Day Selection */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 ">
                                        Select Date
                                    </h3>
                                    <div className="gap-3 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4 sm:text-xs">
                                        {availableSlots.map(
                                            (daySlots, index) => {
                                                if (daySlots.length === 0)
                                                    return null;

                                                const firstSlot = daySlots[0];
                                                const date = firstSlot.date;

                                                // Ensure date is a Date object
                                                const dateObj =
                                                    date instanceof Date
                                                        ? date
                                                        : new Date(date);

                                                // Check if date is valid
                                                if (isNaN(dateObj.getTime())) {
                                                    return null;
                                                }

                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            setSelectedDay(
                                                                index
                                                            );
                                                            setSelectedTime("");
                                                        }}
                                                        className={`p-2 rounded-lg border-2 transition-all ${
                                                            selectedDay ===
                                                            index
                                                                ? "border-primary bg-green-50 text-primary "
                                                                : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                    >
                                                        <div className="text-center">
                                                            <p className="text-xs  font-medium text-gray-600">
                                                                {getDayName(
                                                                    dateObj
                                                                )}
                                                            </p>
                                                            <p className="text-lg font-bold">
                                                                {dateObj.getDate()}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {
                                                                    daySlots.length
                                                                }{" "}
                                                                slots
                                                            </p>
                                                        </div>
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>

                                {/* Time Selection */}
                                {selectedDay !== null &&
                                    availableSlots[selectedDay]?.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Select Time
                                            </h3>
                                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                                                {availableSlots[
                                                    selectedDay
                                                ].map((slot, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() =>
                                                            setSelectedTime(
                                                                slot.time
                                                            )
                                                        }
                                                        className={`p-3 rounded-lg border-2 transition-all ${
                                                            selectedTime ===
                                                            slot.time
                                                                ? "border-primary bg-primary text-white"
                                                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                                        }`}
                                                    >
                                                        <span className="text-sm font-medium">
                                                            {slot.time}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                {/* Booking Button */}
                                {selectedDay !== null && selectedTime && (
                                    <div className="border-t pt-6">
                                        <div className="bg-green-50 rounded-lg p-4 mb-4">
                                            <h4 className="font-semibold text-primary mb-2">
                                                Appointment Summary
                                            </h4>
                                            <div className="text-sm text-primary">
                                                <p>
                                                    <strong>Date:</strong>{" "}
                                                    {formatDate(
                                                        availableSlots[
                                                            selectedDay
                                                        ][0].date
                                                    )}
                                                </p>
                                                <p>
                                                    <strong>Time:</strong>{" "}
                                                    {selectedTime}
                                                </p>
                                                <p>
                                                    <strong>Fee:</strong>
                                                    {currencySymbol}
                                                    {docInfo.fees}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={bookAppointment}
                                            disabled={loading}
                                            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:opacity-85 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading
                                                ? "Booking..."
                                                : "Confirm Appointment"}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Related Doctors */}
                    <RelatedDoctors
                        docId={docId}
                        speciality={docInfo.speciality}
                    />
                </div>
            </div>
        </>
    );
};

export default Appointment;
