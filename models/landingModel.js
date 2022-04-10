const landingSchema = require("./landingsSchema");

const getAllLandings = async () => {
    try{
        const Alllandings = await landingSchema.find({},'-_id');
        return Alllandings;
    }
    catch(err){
        console.log(err);
    }
}

const getLandingByMass = async (minimum_mass) => {
    try{
        console.log(minimum_mass);
        const landingByMass = await landingSchema.find({ mass:{$gt:minimum_mass}});
        return landingByMass
    }
    catch(err){
        console.error(err);
    }
}

const getMass = async (mass) =>{
    try{
        console.log(mass);
        const landingMass = await landingSchema.find({mass: mass});
        return landingMass;            
    }
    catch{

    }
}

const getClass = async (clase) => {
    try{
        console.log(clase);
        const landingClass = await landingSchema.find({recclass: clase});
        return landingClass;
    } 
    catch (error) {
        console.log(error);
    }
}


const landingDB = {
    getAllLandings,
    getLandingByMass,
    getMass,
    getClass
}

module.exports = landingDB;