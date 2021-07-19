const Appointment = require("../schemas/appointment.schema");
const Timeslot = require("../schemas/timeslot.schema");

//Everything related to the logic of appointment route is here.

module.exports = {
    removeAppointment: async (id) => {
        const result = await Appointment.findByIdAndUpdate(id, {state: "cancelled"});
        await Timeslot.findByIdAndUpdate(result.timeslotId, {availability: true});
    }
}