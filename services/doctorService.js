const { compareSync} = require("bcrypt");
const {sign} = require("jsonwebtoken");
const Doctor = require("../schemas/doctor.schema");


module.exports = {
    loginDoctor: async (data) => {
        const user = await Doctor.findOne({email: data.email});
        if (user) {
            const result = compareSync(
                data.password,
                user.password
            );
            if (result) {
                const jsontoken = sign({result: user}, "secret", {
                    expiresIn: "1day",
                });
                const {_id, name, email, dob, field} = user
                const loggedUser = {
                    token: jsontoken,
                    user: {_id, name, email, dob, field,type:"doctor"}
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