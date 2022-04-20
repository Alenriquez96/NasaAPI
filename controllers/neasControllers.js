const neasModel = require("../models/neasModel");

const getNeas = async(req,res)=>{
    try {
        if (req.query.class) {
            const OC = await neasModel.getOrbitClass(req.query.class);
            res.status(200).json(OC); 
        }
        else if(req.query.from && req.query.to){
            const years = {
                from: req.query.from,
                to: req.query.to
            }
            const neasYears = await neasModel.getNeasYears(years);
            res.status(200).json(neasYears);
        }
        else if(req.query.from){
            const years={from:req.query.from}
            const neasYearsFrom = await neasModel.getNeasYearsFrom(years);
            res.status(200).json(neasYearsFrom);
        }
        else if(req.query.to){
            const years={to:req.query.to}
            const neasYearsTo = await neasModel.getNeasYearsTo(years);
            res.status(200).json(neasYearsTo);
        }
        else{
            const allNeas = await neasModel.getAllNeas();
            res.status(200).json(allNeas);
        }
    } catch (error) {
        console.log(error);
    }
}


const createNea = async (req, res) => {
    if (Object.keys(req.body).length !== 0) {
        try {
            await neasModel.createNea(req.body);
            res.status(201).json({ message: 'Nea creada correctamente' });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    } else {
        res.status(400).json({ message: 'No hay datos para crear una nea' });
    }
}

const updateNea = async (req,res)=>{
    try {
        const neaDes = req.params.designation;
        const update = await neasModel.updateNea(neaDes);
        res.send("Nea updated")
    } catch (error) {
        console.log(error);
    }
}

const deleteNeas = async (req,res)=>{
    try {
        const deleteByDes = req.params.designation;
        await neasModel.deleteNea(deleteByDes);
        res.send("Nea deleted");
    } catch (error) {
        console.log(error);
    }
}

const exp = {
    getNeas,
    createNea,
    updateNea,
    deleteNeas
}

module.exports = exp;