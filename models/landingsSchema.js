const mongoose = require("../utils/mongoAtlas");


const landingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nametype: {
        type: String,
        required: true
    },
    recclass: {
        type: String,
        required: true
    },
    mass: {
        type: Number,
        required: true
    },
    fall: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    reclat: {
        type: Number,
        required: true
    },
    reclong:{
        type: Number,
        required:true
    },
    geolocation: {
        latitude: {
            type: Number,
            required:true
        },
        longitude:{
            type: Number,
            required:true
        }
    }
});

const landingModel = mongoose.model("Landing", landingSchema, "Landings");

module.exports = landingModel;