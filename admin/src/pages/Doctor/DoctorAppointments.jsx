import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
    const {
        dToken,
        appointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
    } = useContext(DoctorContext);

    const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, [dToken]);

    return (
        <div className="w-full max-w-6xl m-5">
            <p className="mb-3 text-lg font-medium">All Appointments</p>

            <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
                <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Contact</p>
                    <p>Actoin</p>
                </div>

                {appointments.reverse.map((item, index) => (
                    <div
                        className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base grid grid-col-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                        key={index}
                    >
                        <p className="max-sm:hidden">{index + 1}</p>
                        {/* Patient */}
                        <div className="flex items-center gap-2">
                            <img
                                className="w-8 rounded-full"
                                src={item.userData.image}
                                alt=""
                            />
                            <p>{item.userData.name}</p>
                        </div>

                        {/* Payment */}
                        <div>
                            <p className="text-xs inline border border-primary px-2 rounded-[6px]">
                                {item.payment ? "Online" : "CASH"}
                            </p>
                        </div>
                        {/* Age */}
                        <p className="max-sm:hidden">
                            {calculateAge(item.userData.dob)}
                        </p>
                        <p>
                            {slotDateFormat(item.slotDate)}, {item.slotTime}
                        </p>
                        {/* Fees */}
                        <p>
                            {currency}
                            {item.amount}
                        </p>
                        {/* Contact */}
                        <div className="flex justify-start items-center h-full px-2">
                            {item.userData.phone && (
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
                            )}
                        </div>
                        {/* Actoin */}
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
                                    onClick={() => cancelAppointment(item._id)}
                                    className="
                                w-10 cursor-pointer"
                                    src={assets.cancel_icon}
                                    alt=""
                                />
                                <img
                                    onClick={() =>
                                        completeAppointment(item._id)
                                    }
                                    className="
                                w-10 cursor-pointer"
                                    src={assets.tick_icon}
                                    alt=""
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorAppointments;



// import React, { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";
// import { MessageCircle } from "lucide-react";

// const DoctorAppointments = () => {
//     const {
//         dToken,
//         appointments,
//         getAppointments,
//         completeAppointment,
//         cancelAppointment,
//     } = useContext(DoctorContext);

//     const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

//     useEffect(() => {
//         if (dToken) {
//             getAppointments();
//         }
//     }, [dToken]);

//     return (
//         <div className="w-full max-w-6xl m-5">
//             <p className="mb-3 text-lg font-medium">All Appointments</p>

//             <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
//                 <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b">
//                     <p>#</p>
//                     <p>Patient</p>
//                     <p>Payment</p>
//                     <p>Age</p>
//                     <p>Date & Time</p>
//                     <p>Fees</p>
//                     <p>Contact</p>
//                     <p>Action</p>
//                 </div>

//                 {[...appointments].reverse().map((item, index) => (
//                     <div
//                         className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base grid grid-col-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
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

//                         {/* Payment */}
//                         <div>
//                             <p className="text-xs inline border border-primary px-2 rounded-[6px]">
//                                 {item.payment ? "Online" : "CASH"}
//                             </p>
//                         </div>

//                         {/* Age */}
//                         <p className="max-sm:hidden">
//                             {calculateAge(item.userData.dob)}
//                         </p>

//                         {/* Date & Time */}
//                         <p>
//                             {slotDateFormat(item.slotDate)}, {item.slotTime}
//                         </p>

//                         {/* Fees */}
//                         <p>
//                             {currency}
//                             {item.amount}
//                         </p>

//                         {/* Contact */}
//                         <div className="flex justify-start items-center h-full px-2">
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

//                         {/* Action */}
//                         {item.cancelled ? (
//                             <p className="text-red-400 text-xs font-medium px-2">
//                                 Cancelled
//                             </p>
//                         ) : item.isCompleted ? (
//                             <p className="text-green-500 text-xs font-medium px-2">
//                                 Completed
//                             </p>
//                         ) : (
//                             <div className="flex gap-2 justify-start items-center px-1">
//                                 <img
//                                     onClick={() => cancelAppointment(item._id)}
//                                     className="w-10 cursor-pointer"
//                                     src={assets.cancel_icon}
//                                     alt="Cancel"
//                                 />
//                                 <img
//                                     onClick={() =>
//                                         completeAppointment(item._id)
//                                     }
//                                     className="w-10 cursor-pointer"
//                                     src={assets.tick_icon}
//                                     alt="Complete"
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default DoctorAppointments;
