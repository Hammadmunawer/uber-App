const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res,next) => {
 const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullName  , email, password } = req.body;
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
        return res.status(400).json({ error: 'User with this email already exists' });
    }
    
    const hashedPassword = await userModel.hashPassword(password);

     const user = await userService.createUser({firstName:fullName.firstName, lastName:fullName.lastName, email, password:hashedPassword});

     const token = user.generateAuthToken();    
     res.status(201).json({ user, token });
   
}  ;

module.exports.loginUser = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
     const isMatch = await user.comparePassword(password);
     if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token )

    res.status(200).json({ user, token });
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({ user: req.user });
}

module.exports.logoutUser = async (req, res, next) => {

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

    await BlacklistTokenModel.create({ token });
  
    
        res.clearCookie('token');

    res.status(200).json({ message: 'Logged out successfully' });

}