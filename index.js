const express =  require("express");
const landingRouter = require("./routes/landingsRoutes");
const neasRouter = require("./routes/neasRoutes");
const usersRouter = require("./routes/usersRoutes");
const app = express();
const port = 3000;
const cors = require('cors');


app.use(express.urlencoded({extended:true}));//Estas dos son para los métodos put y post, para que el servidor pueda leer la información nueva que le mandamos
app.use(express.json());
app.use(cors());

app.use("/api",landingRouter);
app.use("/api/astronomy",neasRouter);
app.use("/api/astronomy",usersRouter);



app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
});