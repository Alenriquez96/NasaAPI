const { Double } = require("mongodb");
const mongoose = require("../utils/mongoAtlas");


const landingSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    id: {
        type: Number,
        unique: true
    },
    nametype: {
        type: String,
    },
    recclass: {
        type: String,

    },
    mass: {
        type: Number,
    },
    fall: {
        type: String,
    },
    year: {
        type: String,
    },
    reclat: {
        type: Number,
    },
    reclong:{
        type: Number,
    },
    geolocation: {
        latitude: {
            type: Number,
        },
        longitude:{
            type: Number,
        }
    }
});

const landingModel = mongoose.model("landings", landingSchema);

module.exports = landingModel;