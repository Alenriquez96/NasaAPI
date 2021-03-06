const usersController = require("../controllers/usersController");
const routes = require("express").Router();

routes.get("/users", usersController.getAllUsers);
routes.post("/users/login", usersController.loginUser);
routes.post("/users/create",usersController.createUser);
routes.put("/users/edit/:name", usersController.updateUser);
routes.delete("/users/delete/:email", usersController.deleteUser);
routes.get('/auth/google', usersController.googleAuth);
routes.get('/google/callBack', usersController.googleCallBack, usersController.googleToken);
routes.get('/auth/failure', (req, res) => {
    res.send('Something went wrong..')  
});

module.exports=routes;
