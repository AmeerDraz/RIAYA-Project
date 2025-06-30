import express from "express";
import {
    addDoctor,
    allDoctor,
    appointmentsAdmin,
    loginAdmin,
    adminDashboard,
    changeAvailapility,
    cancelAppointment,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/all-doctors", authAdmin, allDoctor);
adminRouter.post("/change-availapility", authAdmin, changeAvailablity);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, cancelAppointment);
adminRouter.get("/dashboard", authAdmin, adminDashboard);
adminRouter.post("/change-availability", authAdmin, changeAvailapility);

export default adminRouter;
