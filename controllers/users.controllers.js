require ('dotenv').config();
const db = require ("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {where} = require("sequelize")


exports.Signup = async (req, res) => {
    const { name, email, password } = req.body;

    try{
        const existingUser = await User.findOne({
            where: {
                name: {
                    [Op.like]: name
                }
            }
        });

        if (existingUser) {
            return res.status(400).send({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: newUser.id, name: newUser.name }, process.env.JWT_SECRET, {
            expiresIn: 86400 
        });    
        res.status(201).send({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            accessToken: token
        });
    }catch (err) {
        res.status(500).send({
            message: err.message || "Error occurred while signing up."
        });
    }
};

exports.Login = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                name: {
                    [Op.like]: name
                }
            }
        });
        if (!user) {
            return res.status(401).send({ message: "User not found" });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password); 
        
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24hrs
        });

        // Sending token in the response as a cookie
        res.cookie('accessToken', token, {
            httpOnly: true,  // Bocking client-side JavaScript cookie access
            secure: process.env.NODE_ENV === 'production',  
            maxAge: 86400 * 1000  
        });

        res.status(200).send({
            id: user.id,
            username: user.name,
            message: 'Login successful'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while logging in."
        });
    }
};


exports.Logout = (req, res) => {
    try {
        //clearing the JWT in cookie
        res.clearCookie('accessToken');  //'accessToken(cookie name)'
        
        res.status(200).send({
            message: 'Logged out successfully!'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Error occurred while logging out.'
        });
    }
};


exports.GetUsers = (req, res) => {
    User.findAll()
    .then(data => {
        res.send({
            status: "success",
            status_code: 200,
            message: "Users retrieved success",
            result: data
        });
    })
    .catch(err => {
        res.send({
            status: "Error",
            status_code: 201,
            message: err.message || "Failed to retrieve users"
        });
    });
}


exports.DeleteUser = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
    .then(result => {
        if (result === 0) {
            return res.status(404).send("User not found");
        }
        res.status(200).send("User deleted successfully");
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            status_code: 500,
            message: err.message || "Error deleting user"
        });
    });
}
