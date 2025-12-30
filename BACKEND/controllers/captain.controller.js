const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');  
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');


    module.exports.registerCaptain = async (req, res,next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
        
            const { fullName, email, password, vehicle } = req.body;
            const isCaptainExists = await captainModel.findOne({ email });
            if (isCaptainExists) {
                return res.status(400).json({ error: 'Captain with this email already exists' });
            }

            const hashedPassword = await captainModel.hashPassword(password);
            
            const captain = await captainService.createCaptain({firstName: fullName.firstName, lastName: fullName.lastName, email, password: hashedPassword,color: vehicle.color,plate: vehicle.plate,capacity: vehicle.capacity,vehicleType: vehicle.vehicleType});

            const token = captain.generateAuthToken();

            res.status(201).json({ message: 'Captain registered successfully', captain, token });


        } catch (error) {
            res.status(400).json({ error: error.message });
        } 
    }

    
module.exports.loginCaptain = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
     const isMatch = await captain.comparePassword(password);
     if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token )

    res.status(200).json({ captain, token });
};

module.exports.getCaptainProfile = async (req, res, next) => {
res.status(200).json({ captain: req.captain });

};

module.exports.logoutCaptain = async (req, res, next) => {

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
    
        await blacklistTokenModel.create({ token });
             res.clearCookie('token');
    
        res.status(200).json({ message: 'Logged out successfully' });
}