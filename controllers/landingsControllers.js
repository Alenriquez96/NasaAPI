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

const landingController = {
    getLandings,
    getMass,
    getClass
}

module.exports = landingController

