const landingsModel = require("../models/landingModel");

const getLandings = async (req,res)=>{
    try{
        if (req.params.minimum_mass) {
            const landingByMass = await landingsModel.getLandingByMass(req.params.minimum_mass);
            res.status(200).json(landingByMass);
        }
        else{
            const landings = await landingsModel.getAllLandings();
            res.status(200).json(landings);
        }
    }
    catch(err){
        console.error(err);
    }
}

const getMass = async (req,res)=>{
    try{
        const landingMass = await landingsModel.getMass(req.params.mass);
        res.status(200).json(landingMass);          
    }
    catch(err){
        console.log(err);
    }
}

const getClass = async (req,res) =>{
    try {
        if(req.params.class){
        const landingClass = await landingsModel.getClass(req.params.class);
        res.status(200).json(landingClass);
        }
        else{
            res.json({message: "Introduce un nombre de clase"})
        }
    } catch (error) {
        console.error(error);
    }
}

const getLandingsByYears = async (req,res)=>{
    try {
        const year1 =  req.params.year1;
        const year2 = req.params.year2;
        const years = {
            year1:year1,
            year2:year2} 
        const landingYears = await landingsModel.getLandingsByYears(years);
        res.status(200).json(landingYears);
    } catch (error) {
        console.log(error);
    }
}

const landingController = {
    getLandings,
    getMass,
    getClass,
    getLandingsByYears
}

module.exports = landingController

