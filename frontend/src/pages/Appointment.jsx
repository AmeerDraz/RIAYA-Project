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
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
        useContext(AppContext);

    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const navigate = useNavigate();

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(null); // null by default, no selection
    const [slotTime, setSlotTime] = useState("");
    const [loading, setLoading] = useState(false); // Loader for fetch/book

    // Fetch doctor info from context doctors list
    const fetchDocInfo = () => {
        const doc = doctors.find((doc) => doc._id === docId);
        setDocInfo(doc || null);
    };

    // Generate available slots excluding booked ones

    const getAvailableSlots = () => {
        if (!docInfo) return;

        setDocSlots([]);
        let today = new Date();

        let newSlots = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date(today);
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(
                    currentDate.getHours() > 10
                        ? currentDate.getHours() + 1
                        : 10
                );
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;
                const slotTimeCheck = formattedTime;

                const isSlotAvailable =
                    docInfo.slots_booked &&
                    docInfo.slots_booked[slotDate] &&
                    docInfo.slots_booked[slotDate].includes(slotTimeCheck)
                        ? false
                        : true;

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime,
                    });
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            newSlots.push(timeSlots);
        }

        setDocSlots(newSlots);
        // Reset selection on slots reload
        setSlotIndex(null);
        setSlotTime("");
    };

    //***************************** */


    // const getAvailableSlots = () => {
    //     if (!docInfo) return;

    //     setDocSlots([]);
    //     let today = new Date();

    //     let newSlots = [];

    //     // إعدادات دوام الطبيب
    //     const [startHour, startMinute] = docInfo.startTime
    //         ? docInfo.startTime.split(":").map(Number)
    //         : [10, 0];
    //     const [endHour, endMinute] = docInfo.endTime
    //         ? docInfo.endTime.split(":").map(Number)
    //         : [21, 0];
    //     const slotDuration = docInfo.slotDuration
    //         ? parseInt(docInfo.slotDuration)
    //         : 30;

    //     for (let i = 0; i < 7; i++) {
    //         let currentDate = new Date(today);
    //         currentDate.setDate(today.getDate() + i);

    //         let dayName = daysOfWeek[currentDate.getDay()];

    //         // تحقق إذا الطبيب متوفر في هذا اليوم
    //         if (
    //             !docInfo.availableDays ||
    //             !docInfo.availableDays.includes(dayName)
    //         ) {
    //             // إذا غير متوفر، اضف قائمة فارغة (لا يوجد مواعيد)
    //             newSlots.push([]);
    //             continue;
    //         }

    //         // بداية الوقت في هذا اليوم
    //         let slotTimeDate = new Date(currentDate);
    //         slotTimeDate.setHours(startHour, startMinute, 0, 0);

    //         // وقت النهاية في هذا اليوم
    //         let endTimeDate = new Date(currentDate);
    //         endTimeDate.setHours(endHour, endMinute, 0, 0);

    //         // إذا اليوم هو اليوم الحالي، ضف شرط لتجاهل الوقت الذي مضى
    //         if (i === 0) {
    //             const now = new Date();
    //             if (slotTimeDate < now) {
    //                 slotTimeDate = new Date(now.getTime() + 30 * 60000); // بعد نصف ساعة من الآن
    //             }
    //         }

    //         let timeSlots = [];

    //         while (slotTimeDate < endTimeDate) {
    //             let formattedTime = slotTimeDate.toLocaleTimeString([], {
    //                 hour: "2-digit",
    //                 minute: "2-digit",
    //             });

    //             let day = slotTimeDate.getDate();
    //             let month = slotTimeDate.getMonth() + 1;
    //             let year = slotTimeDate.getFullYear();

    //             const slotDate = `${day}_${month}_${year}`;

    //             const isSlotAvailable = !(
    //                 docInfo.slots_booked &&
    //                 docInfo.slots_booked[slotDate] &&
    //                 docInfo.slots_booked[slotDate].includes(formattedTime)
    //             );

    //             if (isSlotAvailable) {
    //                 timeSlots.push({
    //                     datetime: new Date(slotTimeDate),
    //                     time: formattedTime,
    //                 });
    //             }

    //             slotTimeDate = new Date(
    //                 slotTimeDate.getTime() + slotDuration * 60000
    //             );
    //         }

    //         newSlots.push(timeSlots);
    //     }

    //     setDocSlots(newSlots);
    //     setSlotIndex(null);
    //     setSlotTime("");
    // };

    
    
    /******************************* */
    
    // Book appointment, requires day and time selected
    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Please login to book an appointment.");
            return navigate("/login");
        }

        if (slotIndex === null) {
            toast.error("Please select a day for the appointment.");
            return;
        }

        if (!slotTime) {
            toast.error("Please select a time for the appointment.");
            return;
        }

        setLoading(true);

        try {
            const date = docSlots[slotIndex][0].datetime;

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = day + "_" + month + "_" + year;

            const { data } = await axios.post(
                backendUrl + "/api/user/book-appointment",
                { docId, slotDate, slotTime },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                await getDoctorsData(); // Await refresh doctors data
                fetchDocInfo(); // Refresh current docInfo
                getAvailableSlots(); // Refresh slots based on updated bookings
                setSlotIndex(null);
                setSlotTime("");
                navigate("/my-appointments");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to book appointment.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocInfo();
    }, [doctors, docId]);

    useEffect(() => {
        if (docInfo) getAvailableSlots();
    }, [docInfo]);

    return (
        <>
            {loading && <Loader />}
            {docInfo ? (
                <div>
                    {/* Doctor Details */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div>
                            <img
                                className="bg-primary w-full sm:max-w-72 rounded-lg md:min-h-52 md:max-h-80"
                                src={docInfo.image}
                                alt={docInfo.name}
                            />
                        </div>

                        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                                {docInfo.name}
                                <img
                                    className="w-5"
                                    src={assets.verified_icon}
                                    alt="Verified icon"
                                />
                            </p>
                            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                                <p>
                                    {docInfo.degree} - {docInfo.speciality}
                                </p>
                                <button className="py-0.5 px-2 border text-xs rounded-[6px]">
                                    {docInfo.experience}
                                </button>
                            </div>

                            <div>
                                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                                    About{" "}
                                    <img
                                        src={assets.info_icon}
                                        alt="Info icon"
                                    />
                                </p>
                                <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                                    {docInfo.about}
                                </p>
                            </div>
                            <p className="text-gray-500 font-medium mt-4">
                                Appointment fee:{" "}
                                <span className="text-gray-600">
                                    {currencySymbol}
                                    {docInfo.fees}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Booking Slots */}
                    <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
                        <p>Booking slots</p>
                        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
                            {docSlots.length > 0 &&
                                docSlots.map((daySlots, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSlotIndex(index)}
                                        className={`text-center py-6 min-w-16 rounded-[6px] cursor-pointer ${
                                            slotIndex === index
                                                ? "bg-primary text-white"
                                                : "border border-gray-200"
                                        }`}
                                    >
                                        <p>
                                            {daySlots[0] &&
                                                daysOfWeek[
                                                    daySlots[0].datetime.getDay()
                                                ]}
                                        </p>
                                        <p>
                                            {daySlots[0] &&
                                                daySlots[0].datetime.getDate()}
                                        </p>
                                    </div>
                                ))}
                        </div>

                        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
                            {slotIndex !== null &&
                                docSlots[slotIndex]?.map((item, index) => (
                                    <p
                                        key={index}
                                        onClick={() => setSlotTime(item.time)}
                                        className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-[6px] cursor-pointer ${
                                            item.time === slotTime
                                                ? "bg-primary text-white"
                                                : "text-gray-400 border border-gray-300"
                                        }`}
                                    >
                                        {item.time.toLowerCase()}
                                    </p>
                                ))}
                        </div>

                        <button
                            onClick={bookAppointment}
                            disabled={loading}
                            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-[6px] my-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Confirm
                        </button>
                    </div>

                    {/* Related Doctors */}
                    <RelatedDoctors
                        docId={docId}
                        speciality={docInfo.speciality}
                    />
                </div>
            ) : (
                <p>Loading doctor information...</p>
            )}
        </>
    );
};

export default Appointment;
