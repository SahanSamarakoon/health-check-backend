const express = require("express");
const router = express.Router();

router.use("/patient", require("./patientRoutes"));
router.use("/doctor",require("./doctorRoutes"));
router.use("/appointment",require("./appointmentRoutes"))

module.exports = router;
