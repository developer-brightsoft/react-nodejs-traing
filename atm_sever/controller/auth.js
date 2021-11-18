const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


// Register
const register = async(req, res, next) => {
    const {email, password} = req.body
    try{
        const checkEmail = await User.findOne({email: email});
        const hashedPassword = await bcrypt.hash(password, 10);
        if(checkEmail){
            throw new Error("email already exists !")
        }
        const user = new User({
            email: email,
            password: hashedPassword
        })
        await user.save()

        const PRIVATE_TOKEN = jwt.sign(
            {userId: user._id},
            process.env.ACCESS_TOKEN_SECRET,
           
        );

        return res.json({
            message: 'Register successfully !',
            user: user.toJSON(),
            PRIVATE_TOKEN
        });
    }catch(err){
        res.json(err.message)
    }   
}

// Login
const login = async(req, res, next) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email: email});
        if(user && (await bcrypt.compare(password, user.password))) {

            const PRIVATE_TOKEN = jwt.sign(
                {userId: user._id},
                process.env.ACCESS_TOKEN_SECRET,
            );

            return res.json({
                message: 'Login successfully !',
                user: user.toJSON(),
                PRIVATE_TOKEN 
            });
        }
        res.json({ 
            message: 'wrong password !',
            sign: false
        });
    }catch(err){
        return res.json(err.message)
    }
}


module.exports = {
                register,
                login
                }