// import doctorModel from "../models/doctorModel.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import appointmentModel from "../models/appointmentModel.js";

// const changeAvailablity = async (req, res) => {
//     try {
//         const { docId } = req.body;

//         const docData = await doctorModel.findById(docId);
//         await doctorModel.findByIdAndUpdate(docId, {
//             available: !docData.available,
//         });
//         res.json({
//             success: true,
//             message: "Doctor's availability changed successfully",
//         });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };
// const doctorList = async (req, res) => {
//     try {
//         const doctors = await doctorModel
//             .find({})
//             .select(["-password", "-email"]);
//         res.json({ success: true, doctors });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //API for doctor login
// const loginDoctor = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const doctor = await doctorModel.findOne({ email });
//         if (!doctor) {
//             return res.json({
//                 success: false,
//                 message: "Invalid email or password",
//             });
//         }
//         const isMatch = await bcrypt.compare(password, doctor.password);
//         if (isMatch) {
//             const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
//             res.json({ success: true, token });
//         } else {
//             res.json({ success: false, message: "Invalid email or password" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //API to get doctor appointment for doctor panel
// const appointmentDoctor = async (req, res) => {
//     try {
//         const { docId } = req.body;
//         const appointments = await appointmentModel.find({ docId });
//         res.json({ success: true, appointments });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //API to mark appointment completed for doctor panel
// const appointmentComplete = async (req, res) => {
//     try {
//         const { docId, appointmentId } = req.body;
//         const appointmentData = await appointmentModel.findById(appointmentId);
//         if (appointmentData && appointmentData.docId === docId) {
//             await appointmentModel.findByIdAndUpdate(appointmentId, {
//                 isCompleted: true,
//             });
//             return res.json({
//                 success: true,
//                 message: "appointment completed",
//             });
//         } else {
//             return res.json({ success: false, message: "Mark faild" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //API to cancel appointment completed for doctor panel
// const appointmentCancel = async (req, res) => {
//     try {
//         const { docId, appointmentId } = req.body;
//         const appointmentData = await appointmentModel.findById(appointmentId);
//         if (appointmentData && appointmentData.docId === docId) {
//             await appointmentModel.findByIdAndUpdate(appointmentId, {
//                 cancelled: true,
//             });
//             return res.json({
//                 success: true,
//                 message: "appointment cancelled",
//             });
//         } else {
//             return res.json({ success: false, message: "cancelled faild" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //API to get dashboard data for doctor panel

// const getDashData = async (req, res) => {
//     try {
//         const { docId } = req.body;
//         // const { docId } = req.query;
//         const appointments = await appointmentModel.find({ docId });
//         let earnings = 0;
//         appointments.map((item) => {
//             if (item.isCompleted || item.payment) {
//                 earnings += item.amount;
//             }
//         });
//         let patients = [];
//         appointments.map((item) => {
//             if (!patients.includes(item.userId)) {
//                 patients.push(item.userId);
//             }
//         });

//         const dashData = {
//             earnings,
//             appointments: appointments.length,
//             patients: patients.length,
//             latestAppointments: appointments.reverse().slice(0, 5),
//         };
//         res.json({ success: true, dashData });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //API to get doctor profile for doctor panal

// const doctorProfile = async (req, res) => {
//     try {
//         const { docId } = req.body;
//         const profileData = await doctorModel
//             .findById(docId)
//             .select("-password");
//         res.json({ success: true, profileData });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };
// //API to update doctor profile for doctor panal
// const updateDoctorProfile = async (req, res) => {
//     try {
//         const { docId, fees, address, available } = req.body;
//         await doctorModel.findByIdAndUpdate(docId, {
//             fees,
//             address,
//             available,
//         });
//         res.json({ success: true, message: "profile updated" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };



// // controllers/doctorController.js


// // Helper لتوليد أيام الأسبوع
// const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// // API: الحصول على المواعيد المتاحة
// const getAvailableSlots = async (req, res) => {
//     try {
//         const doctorId = req.params.doctorId;
//         const doctor = await doctorModel.findById(doctorId);

//         if (!doctor) {
//             return res.status(404).json({ success: false, message: "Doctor not found" });
//         }

//         const startHour = doctor.startTime ? parseInt(doctor.startTime.split(":")[0]) : 10;
//         const startMinute = doctor.startTime ? parseInt(doctor.startTime.split(":")[1]) : 0;
//         const endHour = doctor.endTime ? parseInt(doctor.endTime.split(":")[0]) : 21;
//         const endMinute = doctor.endTime ? parseInt(doctor.endTime.split(":")[1]) : 0;
//         const slotDuration = doctor.slotDuration ? parseInt(doctor.slotDuration) : 30;

//         let today = new Date();
//         let newSlots = [];

//         for (let i = 0; i < 7; i++) {
//             let currentDate = new Date(today);
//             currentDate.setDate(today.getDate() + i);

//             let dayName = daysOfWeek[currentDate.getDay()];

//             if (!doctor.availableDays || !doctor.availableDays.includes(dayName)) {
//                 newSlots.push([]);
//                 continue;
//             }

//             let slotTimeDate = new Date(currentDate);
//             slotTimeDate.setHours(startHour, startMinute, 0, 0);

//             let endTimeDate = new Date(currentDate);
//             endTimeDate.setHours(endHour, endMinute, 0, 0);

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
//                     doctor.slots_booked &&
//                     doctor.slots_booked[slotDate] &&
//                     doctor.slots_booked[slotDate].includes(formattedTime)
//                 );

//                 if (isSlotAvailable) {
//                     timeSlots.push({
//                         datetime: slotTimeDate,
//                         time: formattedTime,
//                     });
//                 }

//                 slotTimeDate = new Date(slotTimeDate.getTime() + slotDuration * 60000);
//             }

//             newSlots.push(timeSlots);
//         }

//         res.status(200).json({ success: true, slots: newSlots });
//     } catch (error) {
//         console.error("Error getting available slots:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };


// export {
//     changeAvailablity,
//     doctorList,
//     loginDoctor,
//     appointmentDoctor,
//     appointmentComplete,
//     appointmentCancel,
//     getDashData,
//     doctorProfile,
//     updateDoctorProfile,
//     getAvailableSlots,
// };


import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import appointmentModel from "../models/appointmentModel.js";

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.json({
                success: false,
                message: "Not authorized, Login Again",
            });
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.docId = token_decode.id; // احفظ الـ docId هنا في req
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// controllers

const changeAvailablity = async (req, res) => {
    try {
        const docId = req.docId;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, {
            available: !docData.available,
        });
        res.json({
            success: true,
            message: "Doctor's availability changed successfully",
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel
            .find({})
            .select(["-password", "-email"]);
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const appointmentDoctor = async (req, res) => {
    try {
        const docId = req.docId;
        const appointments = await appointmentModel.find({ docId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const appointmentComplete = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId == docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                isCompleted: true,
            });
            return res.json({
                success: true,
                message: "Appointment completed",
            });
        } else {
            return res.json({ success: false, message: "Mark failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const appointmentCancel = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);
        if (appointmentData && appointmentData.docId == docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {
                cancelled: true,
            });
            return res.json({
                success: true,
                message: "Appointment cancelled",
            });
        } else {
            return res.json({ success: false, message: "Cancel failed" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const getDashData = async (req, res) => {
    try {
        const docId = req.docId;
        const appointments = await appointmentModel.find({ docId });
        let earnings = 0;
        appointments.forEach((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount;
            }
        });
        let patients = [];
        appointments.forEach((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId);
            }
        });

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5),
        };
        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const profileData = await doctorModel
            .findById(docId)
            .select("-password");
        res.json({ success: true, profileData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const { fees, address, available } = req.body;
        await doctorModel.findByIdAndUpdate(docId, {
            fees,
            address,
            available,
        });
        res.json({ success: true, message: "Profile updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const getAvailableSlots = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const doctor = await doctorModel.findById(doctorId);

        if (!doctor) {
            return res
                .status(404)
                .json({ success: false, message: "Doctor not found" });
        }

        const startHour = doctor.startTime
            ? parseInt(doctor.startTime.split(":")[0])
            : 10;
        const startMinute = doctor.startTime
            ? parseInt(doctor.startTime.split(":")[1])
            : 0;
        const endHour = doctor.endTime
            ? parseInt(doctor.endTime.split(":")[0])
            : 21;
        const endMinute = doctor.endTime
            ? parseInt(doctor.endTime.split(":")[1])
            : 0;
        const slotDuration = doctor.slotDuration
            ? parseInt(doctor.slotDuration)
            : 30;

        let today = new Date();
        let newSlots = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let dayName = daysOfWeek[currentDate.getDay()];

            if (
                !doctor.availableDays ||
                !doctor.availableDays.includes(dayName)
            ) {
                newSlots.push([]);
                continue;
            }

            let slotTimeDate = new Date(currentDate);
            slotTimeDate.setHours(startHour, startMinute, 0, 0);

            let endTimeDate = new Date(currentDate);
            endTimeDate.setHours(endHour, endMinute, 0, 0);

            if (i === 0) {
                const now = new Date();
                if (slotTimeDate < now) {
                    slotTimeDate = new Date(now.getTime() + 30 * 60000);
                }
            }

            let timeSlots = [];

            while (slotTimeDate < endTimeDate) {
                let formattedTime = slotTimeDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                let day = slotTimeDate.getDate();
                let month = slotTimeDate.getMonth() + 1;
                let year = slotTimeDate.getFullYear();
                const slotDate = `${day}_${month}_${year}`;

                const isSlotAvailable = !(
                    doctor.slots_booked &&
                    doctor.slots_booked[slotDate] &&
                    doctor.slots_booked[slotDate].includes(formattedTime)
                );

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: slotTimeDate,
                        time: formattedTime,
                    });
                }

                slotTimeDate = new Date(
                    slotTimeDate.getTime() + slotDuration * 60000
                );
            }

            newSlots.push(timeSlots);
        }

        res.status(200).json({ success: true, slots: newSlots });
    } catch (error) {
        console.error("Error getting available slots:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



// Export all
export {
    authDoctor,
    changeAvailablity,
    doctorList,
    loginDoctor,
    appointmentDoctor,
    appointmentComplete,
    appointmentCancel,
    getDashData,
    doctorProfile,
    updateDoctorProfile,
    getAvailableSlots,
};
