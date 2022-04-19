const landingsRoutes = require("../controllers/landingsControllers");
const routes = require("express").Router();

routes.get("/astronomy/landings/:minimum_mass?",landingsRoutes.getLandings);
routes.get("/astronomy/landings/mass/:mass?",landingsRoutes.getMass);
routes.get("/astronomy/landings/class/:class?",landingsRoutes.getClass);
routes.get("/astronomy/landings?from=1960&to=1990",landingsRoutes.getLandingsByYears);

module.exports = routes;