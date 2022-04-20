const neasController = require("../controllers/neasControllers");
const routes = require("express").Router();

routes.get("/neas", neasController.getNeas);
routes.post("/neas/create", neasController.createNea);
routes.put("/neas/edit/:designation", neasController.updateNea);
routes.delete("/neas/delete/:designation", neasController.deleteNeas);

module.exports=routes;