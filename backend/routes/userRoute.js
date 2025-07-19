// import express from 'express'
// import {
//     registerUser,
//     loginUser,
//     getProfile,
//     updateProfile,
//     bookAppointment,
//     listAppointment,
//     cancelAppointment,
//     getDoctorAvailableSlots,
//     testDoctors,
//     addTestimonial,
// } from "../controllers/userController.js";
// import authUser from '../middlewares/authUser.js'
// import upload from '../middlewares/multer.js'

// const userRouter = express.Router()
// userRouter.post('/register', registerUser)
// userRouter.post('/login', loginUser)

// // Public endpoint to get available slots for a doctor
// userRouter.get('/doctor/:docId/available-slots', getDoctorAvailableSlots)

// userRouter.get('/get-profile',authUser,getProfile)
// userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
// userRouter.post('/book-Appointment',authUser,bookAppointment)
// userRouter.get('/appointments',authUser,listAppointment)
// userRouter.delete('/cancel-appointment',authUser,cancelAppointment)

// // Test endpoint
// userRouter.get('/test-doctors', testDoctors)

// userRouter.post("/testimonial/add", addTestimonial); // ✅

// export default userRouter

// import express from "express";
// import {
//     registerUser,
//     loginUser,
//     getProfile,
//     updateProfile,
//     bookAppointment,
//     listAppointment,
//     cancelAppointment,
//     testDoctors,
//     addTestimonial,
// } from "../controllers/userController.js";

// import { getAvailableSlots } from "../controllers/doctorController.js"; // ✅ هذا السطر مهم

// import authUser from "../middlewares/authUser.js";
// import upload from "../middlewares/multer.js";

// const userRouter = express.Router();

// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);

// // ✅ Public endpoint to get available slots for a doctor
// userRouter.get("/doctor/:docId/available-slots", getAvailableSlots);

// userRouter.get("/get-profile", authUser, getProfile);
// userRouter.post(
//     "/update-profile",
//     upload.single("image"),
//     authUser,
//     updateProfile
// );
// userRouter.post("/book-Appointment", authUser, bookAppointment);
// userRouter.get("/appointments", authUser, listAppointment);
// userRouter.delete("/cancel-appointment", authUser, cancelAppointment);

// // Test endpoint
// userRouter.get("/test-doctors", testDoctors);

// // Add testimonial
// userRouter.post("/testimonial/add", addTestimonial);

// export default userRouter;

// import express from "express";
// import {
//     registerUser,
//     loginUser,
//     getProfile,
//     updateProfile,
//     bookAppointment,
//     listAppointment,
//     cancelAppointment,

//     getDoctorAvailableSlots,
//     testDoctors,
// } from "../controllers/"";

// import {
//     addTestimonial,
//     getTestimonials, // ✅ استيراد
// } from "../controllers/testimonialController.js";

// import authUser from "../middlewares/authUser.js";
// import upload from "../middlewares/multer.js";

// const userRouter = express.Router();

// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);
// userRouter.get("/doctor/:docId/available-slots", getDoctorAvailableSlots);
// userRouter.get("/get-profile", authUser, getProfile);
// userRouter.post(
//     "/update-profile",
//     upload.single("image"),
//     authUser,
//     updateProfile
// );
// userRouter.post("/book-Appointment", authUser, bookAppointment);
// userRouter.get("/appointments", authUser, listAppointment);
// userRouter.delete("/cancel-appointment", authUser, cancelAppointment);
// userRouter.get("/test-doctors", testDoctors);

// userRouter.post("/testimonial/add", authUser, addTestimonial);
// userRouter.get("/testimonial/list", getTestimonials);
// export default userRouter;

// import express from "express";
// import {
//     registerUser,
//     loginUser,
//     getProfile,
//     updateProfile,
//     bookAppointment,
//     listAppointment,
//     cancelAppointment,
//     getDoctorAvailableSlots,
//     testDoctors,
// } from "../controllers/userController.js";

// import {
//     addTestimonial,
//     getTestimonials, // ✅ استيراد
// } from "../controllers/testimonialController.js";

// import authUser from "../middlewares/authUser.js";
// import upload from "../middlewares/multer.js";

// const userRouter = express.Router();

// userRouter.post("/register", registerUser);
// userRouter.post("/login", loginUser);
// userRouter.get("/doctor/:docId/available-slots", getDoctorAvailableSlots);
// userRouter.get("/get-profile", authUser, getProfile);
// userRouter.post(
//     "/update-profile",
//     upload.single("image"),
//     authUser,
//     updateProfile
// );
// userRouter.post("/book-Appointment", authUser, bookAppointment);
// userRouter.get("/appointments", authUser, listAppointment);
// userRouter.delete("/cancel-appointment", authUser, cancelAppointment);
// userRouter.get("/test-doctors", testDoctors);

// userRouter.post("/testimonial/add", authUser, addTestimonial);
// userRouter.get("/testimonial/list", getTestimonials);

// export default userRouter;

import express from "express";
import {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    getDoctorAvailableSlots,
    testDoctors,
    paymentStripe,
    confirmPayment,
    forgotPassword,
    resetPassword,
} from "../controllers/userController.js";

import {
    addTestimonial,
    getTestimonials,
    updateTestimonial, // ✅ استيراد دالة التعديل
} from "../controllers/testimonialController.js";

import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/doctor/:docId/available-slots", getDoctorAvailableSlots);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
    "/update-profile",
    upload.single("image"),
    authUser,
    updateProfile
);
userRouter.post("/book-Appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.delete("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/payment-stripe", authUser, paymentStripe);
userRouter.post("/confirm-payment", authUser, confirmPayment);

userRouter.get("/test-doctors", testDoctors);

// ⭐ التقييمات
userRouter.post("/testimonial/add", authUser, addTestimonial);
userRouter.get("/testimonial/list", getTestimonials);
userRouter.put("/testimonial/update/:id", authUser, updateTestimonial); // ✅ جديد


/************************** */

userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

export default userRouter;
