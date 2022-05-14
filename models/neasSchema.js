const { Double } = require("mongodb");
const mongoose = require("../utils/mongoAtlas");


const neasSchema = new mongoose.Schema({
    designation: {
        type: String,
        unique:true
    },
    discovery_date: {
        type: String,
    },
    h_mag: {
        type: String    ,
    },
    moid_au: {
        type: String,     
    },
    q_au_1: {
        type: String,    
    },
    q_au_2: {
        type: String,      
    },
    period_yr: {
        type: String,     
    },
    i_deg: {
        type: String,    
    },
    pha:{
        type: String,     
    },
    orbit_class: {
        type: String,
    }
});

const neasModel = mongoose.model("neas", neasSchema);

module.exports = neasModel;