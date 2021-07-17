const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.use("/patient", require("./patientRoutes"));
router.use("/doctor", require("./doctorRoutes"));
router.use("/appointment", require("./appointmentRoutes"))
router.get("/me", auth.checkToken, (req, res) => res.status(201).send({success: 1, result: req.user}))

module.exports = router;
