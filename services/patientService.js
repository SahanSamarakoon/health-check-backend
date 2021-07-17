const {genSaltSync, hashSync, compareSync} = require("bcrypt");
const {sign} = require("jsonwebtoken");
const Patient = require("../schemas/patient.schema");
const moment = require("moment");


module.exports = {
    saveUser: async (data) => {
        const salt = genSaltSync(10);
        const dob = moment(data.dob);
        const updatedDob = dob.set("hour", 3);
        data.dob = updatedDob;
        data.password = hashSync(data.password, salt);
        const user = new Patient(data);
        const isExist = await Patient.findOne({email: data.email});
        if (isExist) {
            throw new Error("Email already exist");
            return;
        }
        const result = await user.save();
        return result;
    },
    loginPatient: async (data) => {
        const user = await Patient.findOne({email: data.email});
        if (user) {
            const result = compareSync(
                data.password,
                user.password
            );
            if (result) {
                const jsontoken = sign({result: user}, "secret", {
                    expiresIn: "1day",
                });
                const {_id, name, email, dob, history} = user
                const loggedUser = {
                    token: jsontoken,
                    user: {_id, name, email, dob, history,type:"patient"}
                };
                return loggedUser;

            } else {
                throw new Error("Invalid password");
            }
        } else {
            throw new Error("Invalid email");
        }

    },

}