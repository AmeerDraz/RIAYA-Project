import validator from "validator";
import bcrypt from "bcrypt";
import { userModel, UserStatus } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";
import Stripe from "stripe";

// تسجيل المستخدم
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password too short" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// تسجيل دخول المستخدم
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// الحصول على بيانات ملف المستخدم
const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findById(userId).select("-password");
        res.json({ success: true, userData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// تحديث ملف المستخدم
const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        var isValidData = false;
        if (
            !name ||
            typeof name !== "string" ||
            name.trim() === "" ||
            !phone ||
            typeof phone !== "string" ||
            !/^\+?[0-9]{7,15}$/.test(phone) ||
            !address ||
            typeof address !== "string" ||
            address.trim() === "" ||
            !dob ||
            isNaN(Date.parse(dob)) ||
            !gender ||
            !["male", "female", "unselected"].includes(gender.toLowerCase())
        ) {
            // todo: nothing
        } else {
            isValidData = true;
        }
        console.log(req.body);
        console.log(isValidData);

        if (!name || !phone || !dob || !gender || !address) {
            return res.json({ success: false, message: "Missing data" });
        }

        const updatedData = {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender,
            status: isValidData ? UserStatus.ACTIVE : UserStatus.ONBORDING,
        };

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(
                imageFile.path,
                {
                    resource_type: "image",
                }
            );
            updatedData.image = imageUpload.secure_url;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updatedData,
            { new: true }
        );
        res.json({ success: true, message: "Profile updated", updatedUser });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// حجز موعد
const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId; // من التوكن
        const { docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select("-password");
        if (!docData || !docData.available) {
            return res.json({
                success: false,
                message: "Doctor not available",
            });
        }

        let slots_booked = docData.slots_booked || {};

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({
                    success: false,
                    message: "Slot not available",
                });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel.findById(userId).select("-password");

        if (userData.status !== UserStatus.ACTIVE) {
            return res.json({
                success: false,
                message:
                    "You are not allowed to book an appointment, please fill you profile data",
            });
        }

        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment booked" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// عرض جميع مواعيد المستخدم
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const appointments = await appointmentModel.find({ userId });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// إلغاء موعد
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const userId = req.userId;

        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.json({
                success: false,
                message: "Appointment not found",
            });
        }
        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {
            cancelled: true,
        });

        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(
            (e) => e !== slotTime
        );
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment cancelled" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// إعداد Razorpay
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// تهيئة الدفع عبر Razorpay
const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({
                success: false,
                message: "Appointment cancelled or not found",
            });
        }

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY || "USD",
            receipt: appointmentId,
        };

        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// التحقق من الدفع Razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(
            razorpay_order_id
        );

        if (orderInfo.status === "paid") {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
                payment: true,
            });
            res.json({ success: true, message: "Payment successful" });
        } else {
            res.json({ success: false, message: "Payment not successful" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Stripe***********************/

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentStripe = async (req, res) => {
    try {
        console.log("-- user id: ", req.userId);
        const { appointmentId } = req.body;

        console.log("appointmentId: ", appointmentId);

        // جلب الموعد مع بيانات الطبيب
        const appointment = await appointmentModel
            .findById(appointmentId)
            .populate("docId"); // تأكد من صحة الاسم هنا حسب السكيما

        console.log("Appointment data:", appointment);
        console.log(
            "Appointment fees:",
            appointment ? appointment.docData.fees : "No appointment"
        );
        console.log(
            "Doctor name:",
            appointment && appointment.docData._id
                ? appointment.docData.name
                : "No doctor"
        );

        if (!appointment) {
            return res
                .status(404)
                .json({ success: false, message: "Appointment not found" });
        }

        if (appointment.payment) {
            return res
                .status(400)
                .json({ success: false, message: "Already paid" });
        }

        console.log("Creating Stripe session...");
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Appointment with Dr. ${appointment.docData.name}`,
                        },
                        unit_amount: Math.round(appointment.docData.fees * 100), // بالسنت
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `https://www.google.com/`, //اعمل واجهة نجاح عملية الدفع و اربطها هون لحتى يحول المستخدم عليها عند نجاح الدفع  ويلي تحتها واجهة فشل الدفع -- يعني ممكن  تعملها لوجيك
            cancel_url: `https://www.google.com/`,
            metadata: {
                appointmentId: appointment._id.toString(),
                userId: req.userId?.toString(), // استخدام req.user._id كما في middleware المعدل
            },
        });

        res.json({ success: true, sessionUrl: session.url });
    } catch (error) {
        console.error("Stripe payment error:", error);
        console.error(error.stack);
        res.status(500).json({ success: false, message: error.message });
    }
};

const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const appointmentId =
                session.success_url.split("appointmentId=")[1];

            await appointmentModel.findByIdAndUpdate(appointmentId, {
                payment: true,
            });

            console.log(
                "✅ Payment successful for appointment:",
                appointmentId
            );
        }

        res.json({ received: true });
    } catch (err) {
        console.error("❌ Stripe Webhook Error:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};

// Get available slots for a specific doctor (public endpoint)
// const getDoctorAvailableSlots = async (req, res) => {
//     try {
//         const { doctorId } = req.params;

//         const doctor = await doctorModel.findById(doctorId);

//         if (!doctor) {
//             return res
//                 .status(404)
//                 .json({ success: false, message: "Doctor not found" });
//         }

//         const { workingHours, slotDuration } = doctor;

//         console.log('=== Get Doctor Available Slots Debug ===');
//         console.log('Doctor ID:', doctorId);
//         console.log('Doctor found:', !!doctor);
//         console.log('Working Hours:', workingHours);
//         console.log('Slot Duration:', slotDuration);
//         console.log('Doctor data:', {
//             name: doctor.name,
//             speciality: doctor.speciality,
//             image: doctor.image,
//             about: doctor.about,
//             available: doctor.available
//         });

//         // If no working hours set, return basic info with empty slots
//         if (!workingHours || Object.keys(workingHours).length === 0) {
//             console.log('No working hours set for doctor');
//             return res.json({
//                 success: true,
//                 slots: Array(7).fill([]),
//                 workingHours: {},
//                 slotDuration: 30,
//                 doctorInfo: {
//                     _id: doctor._id,
//                     name: doctor.name,
//                     speciality: doctor.speciality,
//                     degree: doctor.degree,
//                     experience: doctor.experience,
//                     fees: doctor.fees,
//                     available: doctor.available,
//                     image: doctor.image,
//                     about: doctor.about
//                 }
//             });
//         }

//         if (!slotDuration) {
//             return res
//                 .status(400)
//                 .json({
//                     success: false,
//                     message: "Slot duration not set",
//                 });
//         }

//         // Convert time string to minutes
//         const toMinutes = (timeStr) => {
//             const [hours, minutes] = timeStr.split(":").map(Number);
//             return hours * 60 + minutes;
//         };

//         // Convert minutes to time string
//         const toTimeString = (minutes) => {
//             const hours = Math.floor(minutes / 60);
//             const mins = minutes % 60;
//             return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//         };

//         // Get current date and generate slots for next 7 days
//         const today = new Date();
//         const slots = [];

//         for (let i = 0; i < 7; i++) {
//             const currentDate = new Date(today);
//             currentDate.setDate(today.getDate() + i);

//             const dayOfWeek = currentDate.getDay();
//             const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//             const dayKey = dayNames[dayOfWeek];

//             const daySchedule = workingHours[dayKey];

//             if (!daySchedule || (daySchedule.enabled !== undefined && !daySchedule.enabled)) {
//                 slots.push([]);
//                 continue;
//             }

//             const startMinutes = toMinutes(daySchedule.from);
//             const endMinutes = toMinutes(daySchedule.to);

//             let daySlots = [];

//             // Generate slots for this day
//             for (let time = startMinutes; time + slotDuration <= endMinutes; time += slotDuration) {
//                 const slotTime = toTimeString(time);

//                 // Check if this slot is booked
//                 const day = currentDate.getDate();
//                 const month = currentDate.getMonth() + 1;
//                 const year = currentDate.getFullYear();
//                 const slotDate = `${day}_${month}_${year}`;

//                 const isSlotBooked = doctor.slots_booked &&
//                     doctor.slots_booked[slotDate] &&
//                     doctor.slots_booked[slotDate].includes(slotTime);

//                 if (!isSlotBooked) {
//                     daySlots.push({
//                         time: slotTime,
//                         date: new Date(currentDate),
//                         dayName: dayKey
//                     });
//                 }
//             }

//             // For today, filter out past slots
//             if (i === 0) {
//                 const now = new Date();
//                 const currentTime = now.getHours() * 60 + now.getMinutes();
//                 daySlots = daySlots.filter(slot => {
//                     const slotMinutes = toMinutes(slot.time);
//                     return slotMinutes > currentTime + 30; // 30 minutes buffer
//                 });
//             }

//             slots.push(daySlots);
//         }

//         console.log('Generated slots:', slots.map((day, i) => `${i}: ${day.length} slots`));

//         res.json({
//             success: true,
//             slots,
//             workingHours,
//             slotDuration,
//             doctorInfo: {
//                 _id: doctor._id,
//                 name: doctor.name,
//                 speciality: doctor.speciality,
//                 degree: doctor.degree,
//                 experience: doctor.experience,
//                 fees: doctor.fees,
//                 available: doctor.available,
//                 image: doctor.image,
//                 about: doctor.about
//             }
//         });
//     } catch (error) {
//         console.error('Error in getDoctorAvailableSlots:', error);
//         res.status(500).json({ success: false, message: "Server error" });
//     }
// };

// Get available slots for a specific doctor (public endpoint)
const getDoctorAvailableSlots = async (req, res) => {
    try {
        const { docId } = req.params;

        const doctor = await doctorModel.findById(docId);

        if (!doctor) {
            return res
                .status(404)
                .json({ success: false, message: "Doctor not found" });
        }

        const { workingHours, slotDuration } = doctor;

        console.log("=== Get Doctor Available Slots Debug ===");
        console.log("Doctor ID:", docId);
        console.log("Doctor found:", !!doctor);
        console.log("Working Hours:", workingHours);
        console.log("Slot Duration:", slotDuration);
        console.log("Doctor data:", {
            name: doctor.name,
            speciality: doctor.speciality,
            image: doctor.image,
            about: doctor.about,
            address: doctor.address,
        });

        // If no working hours set, return basic info with empty slots
        if (!workingHours || Object.keys(workingHours).length === 0) {
            console.log("No working hours set for doctor");
            return res.json({
                success: true,
                slots: Array(7).fill([]),
                workingHours: {},
                slotDuration: 30,
                doctorInfo: {
                    _id: doctor._id,
                    name: doctor.name,
                    speciality: doctor.speciality,
                    degree: doctor.degree,
                    experience: doctor.experience,
                    fees: doctor.fees,
                    available: doctor.available,
                    image: doctor.image,
                    about: doctor.about,
                    address: doctor.address, // ✅ تم إضافته هنا
                },
            });
        }

        if (!slotDuration) {
            return res.status(400).json({
                success: false,
                message: "Slot duration not set",
            });
        }

        const toMinutes = (timeStr) => {
            const [hours, minutes] = timeStr.split(":").map(Number);
            return hours * 60 + minutes;
        };

        const toTimeString = (minutes) => {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${hours.toString().padStart(2, "0")}:${mins
                .toString()
                .padStart(2, "0")}`;
        };

        const today = new Date();
        const slots = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            const dayOfWeek = currentDate.getDay();
            const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            const dayKey = dayNames[dayOfWeek];

            const daySchedule = workingHours[dayKey];

            if (
                !daySchedule ||
                (daySchedule.enabled !== undefined && !daySchedule.enabled)
            ) {
                slots.push([]);
                continue;
            }

            const startMinutes = toMinutes(daySchedule.from);
            const endMinutes = toMinutes(daySchedule.to);

            let daySlots = [];

            for (
                let time = startMinutes;
                time + slotDuration <= endMinutes;
                time += slotDuration
            ) {
                const slotTime = toTimeString(time);
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                const slotDate = `${day}_${month}_${year}`;

                const isSlotBooked =
                    doctor.slots_booked &&
                    doctor.slots_booked[slotDate] &&
                    doctor.slots_booked[slotDate].includes(slotTime);

                if (!isSlotBooked) {
                    daySlots.push({
                        time: slotTime,
                        date: new Date(currentDate),
                        dayName: dayKey,
                    });
                }
            }

            if (i === 0) {
                const now = new Date();
                const currentTime = now.getHours() * 60 + now.getMinutes();
                daySlots = daySlots.filter((slot) => {
                    const slotMinutes = toMinutes(slot.time);
                    return slotMinutes > currentTime + 30;
                });
            }

            slots.push(daySlots);
        }

        console.log(
            "Generated slots:",
            slots.map((day, i) => `${i}: ${day.length} slots`)
        );

        res.json({
            success: true,
            slots,
            workingHours,
            slotDuration,
            doctorInfo: {
                _id: doctor._id,
                name: doctor.name,
                speciality: doctor.speciality,
                degree: doctor.degree,
                experience: doctor.experience,
                fees: doctor.fees,
                available: doctor.available,
                image: doctor.image,
                about: doctor.about,
                address: doctor.address, // ✅ هنا أيضاً للتأكد من إرساله
            },
        });
    } catch (error) {
        console.error("Error in getDoctorAvailableSlots:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Test endpoint to check all doctors and their working hours
const testDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});

        const doctorsInfo = doctors.map((doctor) => ({
            _id: doctor._id,
            name: doctor.name,
            speciality: doctor.speciality,
            hasWorkingHours: !!(
                doctor.workingHours &&
                Object.keys(doctor.workingHours).length > 0
            ),
            hasSlotDuration: !!doctor.slotDuration,
            workingHours: doctor.workingHours,
            slotDuration: doctor.slotDuration,
            available: doctor.available,
        }));

        res.json({
            success: true,
            totalDoctors: doctors.length,
            doctors: doctorsInfo,
        });
    } catch (error) {
        console.error("Error in testDoctors:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay,
    getDoctorAvailableSlots,
    testDoctors,
    paymentStripe,
};
