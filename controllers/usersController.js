const usersModel = require("../models/usersModel");

const getAllUsers = async(req,res) =>{
    try {
        const response = await usersModel.getAllUsers();
        res.status(200).json(response); 
    } catch (error) {
        console.log(error);
    }
}

const createUser = async(req,res) =>{
    if (req.body) {
        try {
            await usersModel.createUser(req.body);
            res.status(200).json("User created succesfully");
        } catch (error) {
            res.status(400).json({ message: error });
        }       
    } else{
        res.status(400).json({ message: 'Data not provided' });
    }
}

const updateUser = async(req,res) =>{
    try {
        const userBody = {
            name: req.params.name,
            body: req.body
        }
        await usersModel.updateUser(userBody);
        res.status(200).json("User updated");
    } catch (error) {
        res.status(400).json({message: "an error ocurred"})
    }
}

const deleteUser = async(req,res)=>{
    try {
        await usersModel.deleteUser(req.params.email);
        res.status(200).json("User deleted");
    } catch (error) {
        res.status(400).json({message: "an error ocurred"})
    }
}

const usersObj = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}

module.exports = usersObj;