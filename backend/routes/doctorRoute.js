// import express from 'express'
// import {
//     appointmentCancel,
//     appointmentComplete,
//     appointmentDoctor,
//     doctorDashboard,
//     doctorList,
//     doctorProfile,
//     loginDoctor,
//     updateDoctorProfile,
//     getAvailableSlots,
// } from "../controllers/doctorController.js";
// import authDoctor from '../middlewares/authDoctor.js'

// const doctorRouter = express.Router()

// doctorRouter.get('/list',doctorList)
// doctorRouter.post('/login',loginDoctor)
// doctorRouter.get('/appointments',authDoctor,appointmentDoctor)
// doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete)
// doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel)
// doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
// doctorRouter.get('/profile',authDoctor,doctorProfile)
// doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
// // API: احضار المواعيد المتاحة لطبيب معين
// router.get("/available-slots/:doctorId", getAvailableSlots);

// export default doctorRouter

// import express from "express";
// import {
//     appointmentCancel,
//     appointmentComplete,
//     appointmentDoctor,
//     getDashData,
//     doctorList,
//     doctorProfile,
//     loginDoctor,
//     updateDoctorProfile,
//     updateSlotsSettings,
//     // getAvailableSlots,
// } from "../controllers/doctorController.js";
// import authDoctor from "../middlewares/authDoctor.js";

// const doctorRouter = express.Router();

// doctorRouter.get("/list", doctorList);
// doctorRouter.post("/login", loginDoctor);
// doctorRouter.get("/appointments", authDoctor, appointmentDoctor);
// doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
// doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
// doctorRouter.get("/dashboard", authDoctor, getDashData);
// doctorRouter.get("/profile", authDoctor, doctorProfile);
// doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

// // API: احضار المواعيد المتاحة لطبيب معين
// // doctorRouter.get("/available-slots/:doctorId", getAvailableSlots);

// doctorRouter.post("/update-slots-settings", authDoctor, updateSlotsSettings);

// export default doctorRouter;

import express from "express";
import {
    appointmentCancel,
    appointmentComplete,
    appointmentDoctor,
    getDashData,
    doctorList,
    doctorProfile,
    loginDoctor,
    updateDoctorProfile,
    updateSlotsSettings,
    getAvailableSlots, // <-- استورد الدالة الجديدة
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentDoctor);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/dashboard", authDoctor, getDashData);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);
doctorRouter.post("/update-slots-settings", authDoctor, updateSlotsSettings);

doctorRouter.get("/available-slots/:docId", authDoctor, getAvailableSlots);
export default doctorRouter;
