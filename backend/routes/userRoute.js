import express from 'express'
import {registerUser,loginUser, getProfile ,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay, verifyRazorpay, getDoctorAvailableSlots, testDoctors} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// Public endpoint to get available slots for a doctor
userRouter.get('/doctor/:doctorId/available-slots', getDoctorAvailableSlots)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-Appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.delete('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

// Test endpoint
userRouter.get('/test-doctors', testDoctors)

export default userRouter