const express = require("express");
require("dotenv").config()
const { UserModel } = require("../models/User.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await UserModel.findOne({ email })
        if (user) {
            res.status(400).json({ "error": "User already exists" })
        }else{
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {  
                console.log(err)
                res.status(500).json({"msg":"Something went wrong"})
            }
                const user = new UserModel({ name, email, password: hash })
                await user.save()
                res.status(200).send({ "msg": "Registered successfully" })
        })
    }
    } catch (error) {
        res.status(400).send({ "msg": "Registration failed", "error": error })
    }
})


userRoute.post("/login", async(req, res)=>{
try{
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    if(!user) return res.status(404).send({"error": "User not found"})
        else{
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({userID: user._id, userName: user.name}, process.env.jwtKey)
                    res.send({"msg": "Login success", "token": token})
                }else{
                    res.status(400).send({"error": "Wrong credentials"})
                }
            })
        }
}  catch(error){
    res.send({"msg": "Login failed", "error": error})
}  
})

module.exports = { userRoute }