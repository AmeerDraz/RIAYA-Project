// import validator from "validator";
// import bcrypt from "bcrypt";
// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken";
// import { v2 as cloudinary } from "cloudinary";
// import doctorModel from "../models/doctorModel.js";
// import appointmentModel from "../models/appointmentModel.js";
// import razorpay from "razorpay";

// //API to register user

// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         if (!name || !password || !email) {
//             return res.json({ success: false, message: "Missing Details" });
//         }

//         if (!validator.isEmail(email)) {
//             return res.json({
//                 success: false,
//                 message: " Enter a valid email",
//             });
//         }

//         if (password.length < 8) {
//             return res.json({
//                 success: false,
//                 message: "Enter a strong Password",
//             });
//         }

//         //hasing user password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const userData = {
//             name,
//             email,
//             password: hashedPassword,
//         };
//         //saving user data to database
//         const newUser = new userModel(userData);
//         const user = await newUser.save();
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//         res.json({ success: true, token });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // API FOR USER LOGIN
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.json({ success: false, message: "user not exist" });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (isMatch) {
//             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//             res.json({ success: true, token });
//         } else {
//             res.json({ success: false, message: "Invalid email or password" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //API for get user profile data

// const getProfile = async (req, res) => {
//     try {
//         // const {userId} = req.body
//         const userId = req.userId;
//         const userData = await userModel.findById(userId).select("-password");
//         res.json({ success: true, userData });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //update user profile
// const updateProfile = async (req, res) => {
//     try {
//         const { userId, name, phone, address, dob, gender } = req.body;
//         const imageFile = req.file;

//         if (!name || !phone || !dob || !gender) {
//             return res.json({ success: false, message: "DATA MISING" });
//         }
//         await userModel.findByIdAndUpdate(userId, {
//             name,
//             phone,
//             address: JSON.parse(address),
//             dob,
//             gender,
//         });

//         if (imageFile) {
//             //uploade imge clodinary
//             const imageUpload = await cloudinary.uploader.upload(
//                 imageFile.path,
//                 { resource_type: "image" }
//             );
//             const imageUrl = imageUpload.secure_url;

//             await userModel.findByIdAndUpdate(userId, { image: imageUrl });
//         }

//         res.json({ success: true, message: "Profile Updated" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //API to book appointment

// const bookAppointment = async (req, res) => {
//     try {
//         const { userId, docId, slotData, slotTime } = req.body;

//         const docData = await doctorModel.findById(docId).select("-password");

//         if (!docData.available) {
//             return res.json({
//                 success: false,
//                 message: "doctor not available",
//             });
//         }
//         let slots_booked = docData.slots_booked;

//         // checking for slot availablity
//         if (slots_booked[slotData]) {
//             if (slots_booked[slotData].includes(slotTime)) {
//                 return res.json({
//                     success: false,
//                     message: "slot not availabile",
//                 });
//             } else {
//                 slots_booked[slotData].push(slotTime);
//             }
//         } else {
//             slots_booked[slotData] = [];
//             slots_booked[slotData].push(slotTime);
//         }

//         const userData = await userModel.findById(userId).select("-password");
//         delete docData.slots_booked;

//         const appointmentData = {
//             userId,
//             docId,
//             userData,
//             docData,
//             amount: docData,
//             fees,
//             slotTime,
//             slotData,
//             date: Date.now(),
//         };

//         const newAppointment = new appointmentModel(appointmentData);
//         await newAppointment.save();

//         //save new slot data in docData

//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });

//         res.json({ success: true, message: "appointment booked" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // API for get user appointment for frontend my-appointment page

// const listAppointment = async (req, res) => {
//     try {
//         const { userId } = res.body;
//         const appointments = await appointmentModel.find({ userId });
//         res.json({ success: true, appointments });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //API to cancel Appointment
// const cancelAppointment = async (req, res) => {
//     try {
//         const { userId, appointmentId } = req.body;
//         const appointmentData = await appointmentModel.findById(appointmentId);
//         //vairyfie appointment user
//         if (appointmentData.userId !== userId) {
//             return res.json({ success: false, message: "unautherize action" });
//         }
//         await appointmentModel.findByIdAndUpdate(appointmentId, {
//             cancelled: true,
//         });
//         const { docId, slotData, slotTime } = appointmentData;
//         const doctorDate = await doctorModel.findById(docId);
//         let slots_booked = doctorDate.slots_booked;
//         slots_booked[slotData] = slots_booked[slotData].filter(
//             (e) => e !== slotTime
//         );
//         await doctorModel.findByIdAndUpdate(docId, { slots_booked });
//         res.json({ success: true, message: "appointment cancelld" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
// // online payment

// const paymentRazorpay = async (req, res) => {
//     try {
//         const { appointmentId } = req.body;
//         const appointmentData = await appointmentModel.findById(appointmentId);
//         if (!appointmentData || appointmentData.cancelled) {
//             res.json({
//                 success: false,
//                 message: "appointment cancelled or not found",
//             });
//         }

//         //create option payment

//         const options = {
//             amount: appointmentData.amount * 100,
//             currency: process.env.CURRENCY,
//             receipt: appointmentId,
//         };

//         //creation an order
//         const order = await razorpayInstance.orders.create(options);
//         res.json({ success: true, order });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// //API to verify payment of razorpay
// const verifyRazorpay = async (req, res) => {
//     try {
//         const { razorpay_order_id } = req.body;
//         const orderInfo = await razorpayInstance.orders.fetch(
//             razorpay_order_id
//         );
//         if (orderInfo.status === "paid") {
//             await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
//                 payment: true,
//             });
//             res.json({ success: true, message: "payment successful" });
//         } else {
//             res.json({ success: false, message: "payment failed" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// export {
//     registerUser,
//     loginUser,
//     getProfile,
//     updateProfile,
//     bookAppointment,
//     listAppointment,
//     cancelAppointment,
//     paymentRazorpay,
//     verifyRazorpay,
// };




import validator from "validator";
import bcrypt from "bcrypt";
import {userModel, UserStatus} from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

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
            !name || typeof name !== "string" || name.trim() === "" ||
            !phone || typeof phone !== "string" || !/^\+?[0-9]{7,15}$/.test(phone) ||
            !address || typeof address !== "string" || address.trim() === "" ||
            !dob || isNaN(Date.parse(dob)) ||
            !gender || !["male", "female", "unselected"].includes(gender.toLowerCase())
        ) {
            // todo: nothing
        }else {
            isValidData = true;
        }
        console.log(req.body)
        console.log(isValidData)

        if (!name || !phone || !dob || !gender || !address) {
            return res.json({ success: false, message: "Missing data" });
        }

        const updatedData = {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender,
            status: isValidData ? UserStatus.ACTIVE : UserStatus.ONBORDING
        };

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
            });
            updatedData.image = imageUpload.secure_url;
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });
        res.json({ success: true, message: "Profile updated", updatedUser });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// حجز موعد
const bookAppointment = async (req, res) => {
    try {
        const userId = req.userId;  // من التوكن
        const { docId, slotDate, slotTime } = req.body;

        const docData = await doctorModel.findById(docId).select("-password");
        if (!docData || !docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }

        let slots_booked = docData.slots_booked || {};

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel.findById(userId).select("-password");

        if(userData.status !== UserStatus.ACTIVE){
            res.json({ success: false, message: "You are not allowed to book an appointment, please fill you profile data" });
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
            return res.json({ success: false, message: "Appointment not found" });
        }
        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: "Unauthorized action" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
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
            return res.json({ success: false, message: "Appointment cancelled or not found" });
        }

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY || "INR",
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
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === "paid") {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            res.json({ success: true, message: "Payment successful" });
        } else {
            res.json({ success: false, message: "Payment not successful" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
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
};
