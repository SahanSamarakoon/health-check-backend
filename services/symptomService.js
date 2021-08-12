const Symptoms = require("../schemas/symptom.schema");
module.exports = {
    getSymptoms:async ()=>{
      const result = await Symptoms.find().sort({["symptom"]:1});
      return result;
    },
    addSymptom:async(body)=>{
        await Symptoms.create(body);
    },
    getDisease:async(symptoms)=>{
        const docs = await Symptoms.find({_id:{$in:symptoms}});
        const map = new Map();
        if(docs.length>0){
            docs.forEach((disease)=>{
                if(!map.get(disease.disease)){
                    map.set(disease.disease,[])
                    map.get(disease.disease).push(disease.symptom);
                }
                else{
                    map.get(disease.disease).push(disease.symptom);
                }
            });
        }
        let result;
        const updatedSymptoms = [];
        const updatedResult =[];
        const removeSymptoms = [];
         map.forEach((symptom,key)=>{
            if(symptom.length>=2){
                result =  {
                    shouldCheck:false,
                    disease:key
                }
            }else{
                map.forEach((symptom,key)=>{
                    if (!updatedSymptoms.includes(key)){
                        updatedSymptoms.push(key);
                        removeSymptoms.push(symptom[0]);
                    }
                })
            }
        })
        await Promise.all(
            updatedSymptoms.map(async(disease)=>{
                    const allSymptoms = await Symptoms.find({disease}).select(["symptom","disease"]);
                    allSymptoms.forEach((symp)=>{
                        if(!removeSymptoms.includes(symp.symptom)){
                            updatedResult.push(symp);
                        }
                    });
            })
        );
         result = {shouldCheck:true,symptoms:updatedResult}
        return result;
    }
}