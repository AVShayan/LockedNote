const User = require('./../Models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const login = async (req,res) => {
    try{
        if(!req?.body?.username || !req?.body?.password) return res.status(400).json({"message":"Please provide the Username and Password"});
        const user = await User.findOne({user_name:req.body.username}).exec();
        if(!user) return res.status(401).json({"message":"No User Found!"});
        const match = await bcrypt.compare(req.body.password,user.password);
        if(!match) {
            return res.status(401).json({"message":"Password is invalid"});
        }
        /* The value of userid will be the unique id of the user that logged in
           */
        req.session.userid = user._id;
        /*req.session.save(err =>{
            console.log("Session saved",req.session);
            res.status(201).json({"message":"Login Success"})  
        })  */
        res.status(201).json({"message":"Login Success"})  

        console.log(`${req.session.userid}`)
    }catch(err){
        console.error(err);
    }
}

const logout = async (req,res) => {
    req.session.destroy((err) => {
        if(err){
             console.error("Error Logging Out");
             return res.status(500).json({"Message":"Error Logging Out"});
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({"Message":"User Logged Out!"})
        })
    }

module.exports = { login , logout };