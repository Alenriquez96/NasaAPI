const schema = require("./neasSchema");

const getOrbitClass = async (orbit_class)=>{
    try {
        const getOC = await schema.find({orbit_class: orbit_class},"designation period_yr -_id")
        return getOC;
    } catch (error) {
        console.log(error);
    }
}

const getAllNeas = async ()=>{
    try {
        const getAll = await schema.find({}, "-_id");
        return getAll;
    } catch (error) {
        console.log(error);
    }
}

const getNeasYears = async(years)=>{
    try {
        console.log(years);
        const neasYears = await schema.find({discovery_date:{$gte: years.from, $lt: years.to}}, "designation discovery_date period_yr -_id");
        return neasYears; 
    } catch (error) {
        console.log(error);
    }
}

const getNeasYearsFrom = async(years)=>{
    try {
        console.log(years.from);
        const neasYears = await schema.find({discovery_date:{$gte: years.from}}, "designation discovery_date period_yr -_id");
        return neasYears; 
    } catch (error) {
        console.log(error);
    }
}

const getNeasYearsTo = async(years)=>{
    try {
        console.log(years.to);
        const neasYears = await schema.find({discovery_date:{$lt: years.to}}, "designation discovery_date period_yr -_id");
        return neasYears; 
    } catch (error) {
        console.log(error);
    }
}

const createNea = async (nea) => {
    console.log(nea);
    try {
        const newNea = new schema(nea);
        await schema.create(newNea);
    } catch (error) {
        throw error;
    }
}

const updateNea = async (neas)=>{
    try {
        console.log(neas);
        const newNea = schema(neas.body)
        const oldNea = await schema.findOne({ id: neas.designation });
        oldNea.overwrite(newNea);
        await oldNea.save();
    } catch (error) {
        console.log(error);
    }
}

const deleteNea = async (designation)=>{
    try {
        console.log(designation);
        await schema.deleteOne({designation: designation});
    } catch (error) {
        console.log(error);
    }
}

const exp = {
    getOrbitClass,
    getAllNeas,
    getNeasYears,
    getNeasYearsFrom,
    getNeasYearsTo,
    createNea,
    updateNea,
    deleteNea
}

module.exports = exp;
