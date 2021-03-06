const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const config = require("../configs/config");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { v4: uuidv4 } = require('uuid');
const regex = require("../utils/regex");
require("../configs/auth");
require('dotenv').config();

const getAllUsers = async(req,res) =>{
    try {
        const response = await usersModel.getAllUsers();
        res.status(200).json(response); 
    } catch (error) {
        console.log(error);
    }
}

const createUser = async(req,res) =>{
    const {name, password, pass2, email} = req.body;
    console.log(req.body);
    if (req.body) {
        if (regex.validateEmail(email)) {
            if (regex.validatePassword(password)) {
                    if (password===pass2) {
                        const hashPassword = await bcrypt.hash(password, 10);
                            try {
                                await usersModel.createUser(name,hashPassword,email);
                                res.status(200).json("User created succesfully");
                            } catch (error) {
                                res.status(400).json({ message: error });
                            }       
                    } else{
                        res.status(403).json('Passwords dont match');
                    }           
                } else{
                    res.status(403).json("Password too weak");
                }
        } else {
            res.status(403).json("Email too weak");
        } 
    } else {
        res.status(400).json('Data not provided' );
    }       
}

const loginUser = async(req, res) =>{
    const email = req.body.email;
    const pass = req.body.password;
    console.log(email,pass);
    try {
        const users = await usersModel.getAllUsers();
        const user = users.find(u => { return u.email === email });
        if (user) {
            const match = await bcrypt.compare(pass, user.password);
            if (match) {
                const payload = {
                    email: user.email,
                    check: true
                };
                const token = jwt.sign(payload, config.key, {
                    expiresIn: "20s"
                });
                res.cookie("access-token", token, {
                    httpOnly: true,
                    sameSite: "strict",
                }).status(200).json({message:"Correct credentials", message2: token});
            } else{
                res.json("pass doesnt match")
            }
        } else {
            res.json("user not found")
        }
    } catch (error) {
        res.status(403).json("Incorrect credentials")
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

const googleAuth = passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" });
const googleCallBack = passport.authenticate('google', { failureRedirect: '/auth/failure' });
const googleToken = async (req,res)=>{
    const users = await usersModel.getAllUsers();
    console.log(req.user);
    const user = users.find(u => { return req.user.emails[0].value === u.email });
    if (user) {
        const name = req.user.name.givenName;
        const img = req.user.photos[0].value;
        res.status(200).redirect("http://localhost:3001");
    }
    else {
        const passRandom = "A$"+uuidv4();
        await usersModel.createUser(req.user.name.givenName,passRandom,req.user.emails[0].value);
        res.status(201).json({message:"user created with google"});
    }
}

const usersObj = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    googleAuth,
    googleCallBack,
    googleToken
}

module.exports = usersObj;