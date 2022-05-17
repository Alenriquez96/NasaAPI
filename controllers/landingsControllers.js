const landingsModel = require("../models/landingModel");

const getLandings = async (req,res)=>{
    try{    
        if (req.query.minimum_mass) {
            const landingByMass = await landingsModel.getLandingByMass(req.query.minimum_mass);
            res.status(200).json(landingByMass);
        }
        else if(req.query.from && req.query.to){
            const years = {
                from: req.query.from,
                to: req.query.to
            }
            const landingYears = await landingsModel.getLandingsByYears(years);
            res.status(200).json(landingYears);
        }
        else if(req.query.from){
            const years={from:req.query.from}
            const landingYearsFrom = await landingsModel.getLandingsByYearsFrom(years);
            res.status(200).json(landingYearsFrom);
        }       
        else if(req.query.to){
            const years={to:req.query.to}
            const landingYearsTo = await landingsModel.getLandingsByYearsTo(years);
            res.status(200).json(landingYearsTo);
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

const getById = async (req,res) => {
    try {
        const landingId = await landingsModel.getLandingById(req.params.id);
        res.status(200).json(landingId);
    } catch (error) {
        console.log(error);
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

const getByName = async (req,res)=>{
    try{
        const landingName = await landingsModel.getByName(req.params.name);
        res.status(200).json(landingName);          
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

const createLanding = async (req,res) =>{
    try {
        const create= await landingsModel.createLanding(req.body);  
        res.send("Landing created");
    } catch (error) {
        console.log(error);
    }
}

const updateLanding = async (req,res)=>{
    try {
        const reqs = {
            body:req.body,
            id:req.params.id
        }
        await landingsModel.updateLanding(reqs);
        res.send("Landing updated");
    } catch (error) {
        console.log(error);
    }
}

const deleteLanding = async (req,res)=>{
    try {
        const deleteById = req.params.id;
        await landingsModel.deleteLanding(deleteById);
        res.send("Landing deleted");
    } catch (error) {
        console.log(error);
    }
}


const landingController = {
    getLandings,
    getMass,
    getById,
    getByName,
    getClass,
    createLanding,
    updateLanding,
    deleteLanding
}

module.exports = landingController

