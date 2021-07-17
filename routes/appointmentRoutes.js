const express = require("express");
const appointmentRouter = express.Router();
const appointmentController = require("../controller/appointmentController");
const auth = require("../middlewares/auth");


appointmentRouter.delete("/:id", appointmentController.removeAppointment);


module.exports = appointmentRouter;