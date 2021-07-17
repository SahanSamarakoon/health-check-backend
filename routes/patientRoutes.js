const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controller/patientController");
const auth = require("../middlewares/auth");


//patient login and register routes
patientRouter.post("/register", patientController.registerUser);
patientRouter.post("/login", patientController.loginUser);

//make an appointment
patientRouter.post("/appointment", auth.checkToken, patientController.addAppointment);

//get appointments
patientRouter.get("/me/appointment", auth.checkToken, patientController.getAppointments);


module.exports = patientRouter;
