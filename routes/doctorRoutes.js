const express = require("express");
const doctorRouter = express.Router();
const doctorController = require("../controller/doctorController");
const auth = require("../middlewares/auth");


//doctor login route
doctorRouter.post("/login",doctorController.loginDoctor);

//add timeslot
doctorRouter.post("/:id/timeslot",doctorController.addTimeslot);

//get all doctors
doctorRouter.get("/",doctorController.getAllDoctors);
doctorRouter.get("/:id",doctorController.getDoctorSlots);
doctorRouter.get("/me",auth.checkToken,doctorController.getDetails)



module.exports = doctorRouter;
