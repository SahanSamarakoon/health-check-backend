const Joi = require("joi");
const {saveUser, loginPatient, makeAppointment,getAppointments} = require("../services/patientService")

module.exports = {
    registerUser: async (req, res) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(25).required(),
            history: Joi.string().allow(""),
            dob: Joi.date(),
        });
        const validation = schema.validate(req.body);
        if (validation.error) {
            res.status(401).send({message: validation.error.message});
            return;
        }
        const data = validation.value;
        try {
            const result = await saveUser(data);
            result.password = undefined;
            res.status(201).send({success: 1, result});
        } catch (error) {
            res.status(error.code || 409).send({message: error.message});
        }

    },
    loginUser: async (req, res) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(25).required(),
            type: Joi.string().allow("")
        });
        const validation = schema.validate(req.body);
        if (validation.error) {
            res.status(401).send({message: validation.error.message});
            return;
        }
        const body = validation.value;
        try {

            const {user, token} = await loginPatient(body);

            return res.status(200).json({
                success: 1,
                message: "login Sucess",
                token, user
            });

        } catch (error) {
            res.status(error.code || 401).send({message: error.message});
        }
    },
    addAppointment: async (req, res) => {
        const schema = Joi.object({
            doctorId: Joi.string().required(),
            timeslotId: Joi.string().required(),
            state: Joi.string().default("booked")
        });
        const validation = schema.validate(req.body);
        if (validation.error) {
            res.status(401).send({message: validation.error.message});
            return;
        }
        const patientId = req.user._id;
        const body = validation.value;
        try {
            const result = await makeAppointment(patientId, body);
            res.status(201).send({success: 1, result});
        } catch (error) {
            res.status(error.code || 401).send({message: error.message});
        }
    },
    getAppointments: async (req, res) => {
        const id = req.user._id;
        try {
            const result = await getAppointments(id);
            res.status(201).send({success: 1, result});
        } catch (error) {
            res.status(error.status || 401).send({message: error.message});
        }
    }
}