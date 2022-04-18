const landingSchema = require("./landingsSchema");
require("mongoose");
require("mongodb");

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
        const landingByMass = await landingSchema.find({mass: {$gt:parseInt(minimum_mass)}});
        return landingByMass
    }
    catch(err){
        console.error(err);
    }
}

const getMass = async (masa) =>{
    try{
        console.log(masa);
        const landingMass = await landingSchema.find({mass: masa});
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

const getLandingsByYears = async (years) =>{
    try {
        if (years.year1 && years.year2) {
            console.log(years.year1);
            const landingYear = await landingSchema.find({id:{"$gte": years.year1, "$lt": years.year2}});
            return landingYear; 
        }
        else if(years.year1 && !years.year2){
            const landingYear = await landingSchema.find({id:{$gte:year1}})
        }
    } catch (error) {
        console.log(error);
    }
}


const landingDB = {
    getAllLandings,
    getLandingByMass,
    getMass,
    getClass,
    getLandingsByYears
}

module.exports = landingDB;