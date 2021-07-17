const express = require("express");
const doctorRouter = express.Router();
const doctorController = require("../controller/doctorController");
const auth = require("../middlewares/auth");


//doctor login route
doctorRouter.post("/login",doctorController.loginDoctor);

//add timeslot
doctorRouter.post("/:id/timeslot",doctorController.addTimeslot);



module.exports = doctorRouter;
