// import mongoose from "mongoose";

// const doctorSchema = new mongoose.Schema({
//     name:{type:String , required:true},
//     email:{type:String , required:true , unique:true},
//     password:{type:String , required:true},
//     image:{type:String , required:true},
//     speciality:{type:String , required:true},
//     degree:{type:String , required:true},
//     experience:{type:String , required:true},
//     about:{type:String , required:true},
//     available:{type:Boolean , required:true},
//     fees:{type:Number , required:true},
//     address:{type:Object , required:true},
//     date:{type:Number , required:true},
//     slots_booked:{type:Object , default:{}},
// }, {minimize:false})

// const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)

// export default doctorModel



import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String, required: true },
        speciality: { type: String, required: true },
        degree: { type: String, required: true },
        experience: { type: String, required: true },
        about: { type: String, required: true },
        available: { type: Boolean, required: true },
        fees: { type: Number, required: true },
        address: { type: Object, required: true },
        date: { type: Number, required: true },
        slots_booked: { type: Object, default: {} },
        workingHours: { 
            type: Object, 
            default: {},
            // Ensure it's a proper object structure
            validate: {
                validator: function(v) {
                    return typeof v === 'object' && v !== null;
                },
                message: 'Working hours must be an object'
            }
        },
        slotDuration: { 
            type: Number, 
            default: 30,
            min: 15,
            max: 120
        },
    },
    { minimize: false }
);

const doctorModel =
    mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
