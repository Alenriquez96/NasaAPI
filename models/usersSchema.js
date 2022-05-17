const mongoose = require("../utils/mongoAtlas");


const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    }
});

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;