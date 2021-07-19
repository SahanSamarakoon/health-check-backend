const {removeAppointment} = require("../services/appointmentService");

///Joi is used for do the validation
///this is where all the request and responses handling happens.


module.exports = {

    //common function for patient and doctor to remove appointment
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
