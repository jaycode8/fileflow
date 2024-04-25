const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltrounds = 10;
const secretkey = process.env.secretkey;
const jwt = require("jsonwebtoken");

const {usersSchema} = require("../models/users.model");
const usersModel = mongoose.model("users", usersSchema);

const signForms = (req, res) => {
    res.render("forms");
};

const addUser = async (req, res) => {
    try {
        const usernameTaken = await usersModel.find({username: req.body.username});
        if (usernameTaken == "") {
            const emailExists = await usersModel.find({email: req.body.email});
            if (emailExists == "") {
                const user = new usersModel(req.body);
                user.password = await bcrypt.hash(user.password, saltrounds);
                await user.save();
                res.json({msg: "successfully regesterd", success: "true"});
            } else {
                res.json({msg: "Email address already exists", success: "false"});
            }
        } else {
            res.json({msg: "An account with similar username already exist", success: "false"});
        }
    } catch (err) {
        res.json({msg: "Internal server error", success: "false"});
    }
};

const logInUser = async (req, res) => {
    try {
        const foundUser = await usersModel.find({username: req.body.uname});
        if (foundUser != "") {
            const passCheck = await bcrypt.compare(req.body.passw, foundUser[0].password);
            if (passCheck) {
                let token = await jwt.sign({user: foundUser[0]._id}, secretkey);
                res.json({msg: "Success", token: token, success: "true"});
            } else {
                res.json({msg: "Invalid password", success: "false"});
            }
        } else {
            res.json({msg: "Account with that username not found", success: "false"});
        }
    } catch (err) {
        res.json({msg: "Internal server error", success: "false"});
    }
};

const fetchUser = async (req, res) => {
    try {
        const userData = await usersModel.findOne({_id: req.id.user});
        res.json({msg: "User fetched", user: userData, success: "true"});
    } catch (err) {
        res.json({msg: "Internal server error", success: "false"});
    }
};

const profile = (req, res) => {
    res.render("profile", {
        title: "User Profile"
    });
};

const updateUser = async (req, res) => {
    try {
        req.body.profile_pic = req.file.path;
        req.body.file_size = req.file.size;
        req.body.public_ID = req.file.filename;
        await usersModel.findByIdAndUpdate(req.id.user, req.body);
        res.json({success: "true"});
    } catch (err) {
        res.json({success: "false"});
        console.log(err);
    }
};

module.exports = {
    signForms,
    addUser,
    logInUser,
    fetchUser,
    profile,
    updateUser,
    usersModel
};
