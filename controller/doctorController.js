const Joi = require("joi");
const { loginDoctor} = require("../services/doctorService")

module.exports = {
    loginDoctor: async (req, res) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(25).required()
        });
        const validation = schema.validate(req.body);
        if (validation.error) {
            res.status(401).send({message: validation.error.message});
            return;
        }
        const body = validation.value;
        try {

            const {user, token} = await loginDoctor(body);

            return res.status(200).json({
                sucess: 1,
                message: "login Sucess",
                token, user
            });

        } catch (error) {
            res.status(error.code||401).send({message: error.message});
        }
    },
}