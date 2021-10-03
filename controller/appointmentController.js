const {removeAppointment} = require("../services/appointmentService");

module.exports = {
    removeAppointment: async (req, res) => {
        const id = req.params.id;
        if (!id) {
            res.status(401).send({message: "Id is not valid"});
            return;
        }
        try {
            await removeAppointment(id);
            res.status(201).send({success: 1, message: "appointment removed"})

        } catch (error) {
            res.status(error.status || 401).send({message: error.message});
        }
    }
}

// thi sis comment
// thi sis comment
// new one
