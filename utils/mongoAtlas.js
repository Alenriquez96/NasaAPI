const mongoose = require("mongoose");
require('dotenv').config();
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@nasaapi.uub2i.mongodb.net/NasaApi?retryWrites=true&w=majority`;


const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true
}

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

module.exports = mongoose;