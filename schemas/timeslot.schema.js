const mongoose = require("mongoose");
const dbUtill = require("../dbUtill/utills");

const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: dbUtill.DOCTOR,
    },
    time: {
        type: Date,
        required:true
    },
    date: {
        type: Date,
        required:true
    },
    availability:{
        type:Boolean,
        default:true,
        required:true,
    },

},{timestamps:true});

module.exports = mongoose.model(dbUtill.PATIENT, appointmentSchema);
