const { ObjectId } = require("mongodb");
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
        if(minimum_mass){
        console.log(typeof parseInt(minimum_mass));
        // const toNumber = async() => { 
        //     await landingSchema.updateMany(
        //          { 'id' : { $type: 2 }}, 
        //         [{ $set: { 'id': { $toDouble: '$id' } } }] 
        //         ) 
        // } 
        // toNumber() 
        const landingByMass = await landingSchema.find({mass: {$gt:minimum_mass}},"name mass -_id");
        return landingByMass
        }
    }
    catch(err){
        console.error(err);
    }
}

const getMass = async (masa) =>{
    try{
        console.log(masa);
        const landingMass = await landingSchema.find({mass: masa}, "name mass -_id");
        return landingMass;            
    }
    catch(error){
        console.log(error);
    }
}

const getClass = async (clase) => {
    try{
        console.log(clase);
        const landingClass = await landingSchema.find({recclass: clase}, "name recclass -_id");
        return landingClass;
    } 
    catch (error) {
        console.log(error);
    }
}

const getLandingsByYearsFrom = async (years) =>{
    try {
        console.log(years.from);
        const landingYear = await landingSchema.find({year:{$gte: years.from}}, "name year mass -_id");
        return landingYear; 
    } catch (error) {
        console.log(error);
    }
}

const getLandingsByYearsTo = async (years) =>{
    try {
        console.log(years.to);
        const landingYear = await landingSchema.find({year:{$lt: years.to}}, "name year mass -_id");
        return landingYear; 
    } catch (error) {
        console.log(error);
    }
}

const getLandingsByYears = async (years) =>{
    try {
        console.log(years);
        const landingYear = await landingSchema.find({year:{$gte: years.from, $lt: years.to}}, "name year mass -_id");
        return landingYear; 
    } catch (error) {
        console.log(error);
    }
}


const createLanding =  async (landing)=>{
    console.log(landing);
    try {
        const newLanding = new landingSchema(landing);
        await landingSchema.create(newLanding)
    } catch (error) {
        console.log(error);
    }
}

const updateLanding = async (landing)=>{
    try {
        const newLanding = landingSchema(landing.body)
        const oldLanding = await landingSchema.findOne({ id: landing.id });
        oldLanding.overwrite(newLanding);
        await oldLanding.save();
    } catch (error) {
        console.log(error);
    }
}

const deleteLanding = async (id)=>{
    try {
        console.log(id);
        await landingSchema.deleteOne({id: id});
    } catch (error) {
        console.log(error);
    }
}



const landingDB = {
    getAllLandings,
    getLandingByMass,
    getMass,
    getClass,
    getLandingsByYearsFrom,
    getLandingsByYearsTo,
    getLandingsByYears,
    createLanding,
    updateLanding,
    deleteLanding
}

module.exports = landingDB;