const landingsRoutes = require("../controllers/landingsControllers");
const routes = require("express").Router();

routes.get("/astronomy/landings",landingsRoutes.getLandings);
routes.get("/astronomy/landings/:id", landingsRoutes.getById);
routes.get("/astronomy/landings/mass/:mass?",landingsRoutes.getMass);
routes.get("/astronomy/landings/class/:class?",landingsRoutes.getClass);
routes.post("/astronomy/landings/create", landingsRoutes.createLanding);
routes.put("/astronomy/landings/edit/:id", landingsRoutes.updateLanding);
routes.delete("/astronomy/landings/delete/:id", landingsRoutes.deleteLanding);

module.exports = routes;