const User = require('../Models/User');
const bcrypt = require('bcrypt');

const signup = async(req,res) => {
    try{
        if(!req?.body?.username || !req?.body?.password) return res.status(400).json({"message":"Please provide username and password"});
        // We Hash the password
        const hashedpwd = await bcrypt.hash(req.body.password,10) // Salt = 10
        const user = await User.create({
            user_name: req.body.username,
            password: hashedpwd
        });
        /* We will use Express Sessions so that we can tie up the notes to their owners
           Here we create a session object and a parameter userid which holds
           the unique _id given by MongoDB */
        req.session.userid = user._id;    
        console.log(req.session.userid);
        res.status(201).json({"message":"User registered successfully"});
    }catch(err){
        console.error(err);
    }
}

module.exports = signup;