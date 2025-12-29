const userModel = require('../models/user.model');
const bycrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');


module.exports.authUser = async (req, res, next) => {
    let token;
    if (req.cookies?.token) {
        token = req.cookies.token;
    } 
   

    else if (req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.toLowerCase().startsWith('bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
        
        const user = await userModel.findById(decoded._id);
       
        

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
