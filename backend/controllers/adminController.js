// import validator from 'validator'
// import bcrypt  from 'bcrypt'
// import { v2 as cloudinary } from 'cloudinary'
// import doctorModel from '../models/doctorModel.js'
// import jwt from 'jsonwebtoken'
// import appointmentModel from '../models/appointmentModel.js'
// import userModel from '../models/userModel.js'

// //api for adding doctor

// const addDoctor = async (req,res) => {

//     try{

//         const {name , email,password,speciality,degree,experience,about,available,fees,address } = req.body

//         const imageFile = req.file

//         if(!name || !email || !password || !speciality  || !degree || !experience || !about || !available || !fees || !address)
//         {
//             return res.json({success:false,message:"Missing Details"})
//         }

//         //  validate email formate
//         if(!validator.isEmail(email)){
//             return res.json({success:false,message:"please enter a valid email"})
//         }

//         //  validate password power
//         if(password.length<8){
//             return res.json({success:false,message:"please enter a power password"})
//         }

//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword =await bcrypt.hash(password,salt)

//         //uploade image cloudeinary

//         const imageUpload =await cloudinary.uploader.upload(imageFile.path , {resource_type:"image"})
//         const imageUrl = imageUpload.secure_url

//         const doctorData = {
//             name,
//             email,
//             image:imageUrl,
//             password:hashedPassword,
//             speciality,
//             degree,
//             experience,
//             about,
//             fees,
//             address:JSON.parse(address),
//             date:Date.now()
//         }

//         const newDoctor = new doctorModel(doctorData)
//         await newDoctor.save()
//         res.json({success:true , message:"Doctor Added"})
//     }
//     catch(error){
//         console.log(error)
//         res.json({success:false , message:error.message})
//     }

// }
// //api admin login
// const loginAdmin = async (req,res)=>{
//     try{

//         const {email,password} =req.body

//         if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){

//                 const token= jwt.sign(email+password ,process.env.JWT_SECRET)
//                 res.json({success:true,token})
//         }else{
//             res.json({success:false,message:"Invalid Email or Password"})
//         }

//     }catch(error)
//     {
//         console.log(error)
//         res.json({success:false , message:error.message})
//     }

// }

// //api for all doctor
// const allDoctor = async (req,res)=>{

//     try{
//         const doctor = await doctorModel.find({}).select('-password')
//         res.json({success:true ,doctor})
//         }catch(error){

//             console.log(error)
//             res.json({success:false , message:error.message})
//     }

// }

// // API to et all appointment list

// const appointmentsAdmin = async(req,res)=>{
//     try{
//         const appointments = await appointmentModel.find({})
//         res.json({success:true ,appointments})
//     }catch(error){

//             console.log(error)
//             res.json({success:false , message:error.message})
//     }
// }

// //API for cancelled appointment
// const appointmentCancel = async (req,res) =>{
//     try{
//         const {appointmentId}=req.body
//         const appointmentData = await appointmentModel.findById(appointmentId)

//         await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
//         const {docId,slotData,slotTime}=appointmentData
//         const doctorDate = await doctorModel.findById(docId)
//         let slots_booked=doctorDate.slots_booked
//         slots_booked [slotData]=slots_booked[slotData].filter(e => e !==slotTime)
//         await doctorModel.findByIdAndUpdate(docId,{slots_booked})
//         res.json({success:true , message:'appointment cancelld'})

//     }catch(error){
//             console.log(error)
//             res.json({success:false , message:error.message})
//     }
// }

// //API to get Dashboard data for admin panel

// const adminDashboard = async(req,res)=>{
//     try{
//             const doctors = await doctorModel.find({})
//             const users = await userModel.find({})
//             const appointments = await appointmentModel.find({})

//             const dashData ={
//                 doctors:doctors.length,
//                 appointments:appointments.length,
//                 patient:users.length,
//                 latestAppointments:appointments.reverse().slice(0,5)
//             }
//             res.json({success:true,dashData})
//     }catch(error){
//             console.log(error)
//             res.json({success:false , message:error.message})
//     }
// }

// export {addDoctor,loginAdmin,allDoctor,appointmentsAdmin,appointmentCancel,adminDashboard}

import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import {userModel} from "../models/userModel.js";

// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            available,
            fees,
            address,
        } = req.body;
        const imageFile = req.file;

        // Validation for missing fields
        if (
            !name ||
            !email ||
            !password ||
            !speciality ||
            !degree ||
            !experience ||
            !about ||
            available === undefined ||
            !fees ||
            !address
        ) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email",
            });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password (min 8 characters)",
            });
        }

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });
        const imageUrl = imageUpload.secure_url;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Parse address JSON
        const parsedAddress = JSON.parse(address);

        // Create doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            available: available === "true" || available === true, // To handle both boolean and string "true"
            fees,
            address: parsedAddress,
            date: Date.now(),
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: "Doctor Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            email === process.env.ADMIN_EMAIL &&
            password === process.env.ADMIN_PASSWORD
        ) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Email or Password" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all doctors
const allDoctor = async (req, res) => {
    try {
        const doctor = await doctorModel.find({}).select("-password");
        res.json({ success: true, doctor });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all appointments
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to cancel appointment
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

        await appointmentModel.findByIdAndUpdate(appointmentId, {
            cancelled: true,
        });

        const { docId, slotData, slotTime } = appointmentData;
        const doctorDate = await doctorModel.findById(docId);
        let slots_booked = doctorDate.slots_booked;

        slots_booked[slotData] = slots_booked[slotData].filter(
            (e) => e !== slotTime
        );

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment cancelled" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for Admin Dashboard Data
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patient: users.length,
            latestAppointments: appointments.reverse().slice(0, 5),
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    addDoctor,
    loginAdmin,
    allDoctor,
    appointmentsAdmin,
    appointmentCancel,
    adminDashboard,
};
