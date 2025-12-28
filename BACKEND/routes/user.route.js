const express = require('express');
const router = express.Router();
const {body} = require('express-validator')


const userController = require('../controllers/user.controller');



router.post('/register', 
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    body('fullName.firstName').isLength({min:6}).withMessage('First name is required'),
    
    userController.registerUser);



module.exports = router;