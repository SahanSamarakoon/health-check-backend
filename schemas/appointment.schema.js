const mongoose = require("mongoose");
const dbUtill = require("../dbUtill/utills");

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: dbUtill.DOCTOR,
    },
    patientId: {
        type: mongoose.Types.ObjectId,
        ref: dbUtill.PATIENT,
    },
    timeslotId: {
        type: mongoose.Types.ObjectId,
        ref: dbUtill.TIMESLOT,
    },
    state:{
        type:String,
        default:"booked",
        required:true,
    },

},{timestamps:true});

module.exports = mongoose.model(dbUtill.PATIENT, appointmentSchema);
