const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controller/patientController");
const auth = require("../middlewares/auth");


//patient login and register routes
patientRouter.post("/register",patientController.registerUser);
patientRouter.post("/login",patientController.loginUser);



module.exports = patientRouter;
