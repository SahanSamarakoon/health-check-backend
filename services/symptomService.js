const Symptoms = require("../schemas/symptom.schema");
module.exports = {
    getSymptoms:async ()=>{
      const result = await Symptoms.find();
      return result;
    },
    addSymptom:async(body)=>{
        await Symptoms.create(body);
    },
    getDisease:async(symptoms)=>{
        const result = await Symptoms.find({_id:{$in:symptoms}});
        const map = new Map();
        if(result.length>0){
            result.forEach((disease)=>{
                if(!map.get(disease.disease)){
                    map.set(disease.disease,[])
                    map.get(disease.disease).push(disease.symptom);
                }
                else{
                    map.get(disease.disease).push(disease.symptom);
                }
            });
        }
        map.forEach((disease,key)=>{
            console.log(key,disease);
            if(disease.length>=2){
                return {

                }
            }
        })
        return result;
    }
}