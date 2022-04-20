const { Double } = require("mongodb");
const mongoose = require("../utils/mongoAtlas");


const neasSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: true,
    },
    discovery_date: {
        type: String,
        required: true,
    },
    h_mag: {
        type: Number    ,
        required: true
    },
    moid_au: {
        type: Number,
        required: true
    },
    q_au_1: {
        type: Number,
        required: true
    },
    q_au_2: {
        type: Number,
        required: true
    },
    period_yr: {
        type: Number,
        required: true
    },
    i_deg: {
        type: Number,
        required: true
    },
    pha:{
        type: String,
        required:true
    },
    orbit_class: {
        type: String,
        required:true
    }
});

const neasModel = mongoose.model("neas", neasSchema);

module.exports = neasModel;