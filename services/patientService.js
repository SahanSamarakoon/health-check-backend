const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Patient = require("../schemas/patient.schema");

module.exports={
    saveUser:async(data)=>{
            const user = new Patient(data);
            const isExist = await Patient.findOne({email:data.email});
            if (isExist){
                throw new Error("Email already exist");
                return;
            }
            const result = await user.save();
            return result;
    },
}