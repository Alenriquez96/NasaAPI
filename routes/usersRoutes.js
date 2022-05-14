const usersController = require("../controllers/usersController");
const routes = require("express").Router();

routes.get("/users", usersController.getAllUsers);
routes.post("/users/create",usersController.createUser);
routes.put("/users/edit/:name", usersController.updateUser);
routes.delete("/users/delete/:email", usersController.deleteUser);

module.exports=routes;
