const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Generate JWT Token
const generateToken = (userId, role) => {
    return jwt.sign(
        { userId, role},
        process.env.JWT_SECRET,
        { expiresIn: '7d'}//Token expires in 7 days
    );
};

// Register User {only Admin can register new users}
const registerUser = async (req, res) => {
    try{
        const {name, email, password, role, department, position, salary } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: 'Email already registered' });
        }

        //Create new user
        const user = await User.create({
            name,
            email,
            password,//will be hased automatically by User model
            role,
            department,
            position,
            salary,
        });

        //Generate token
        const token = generateToken(user._id, user.role);

        //Send response
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                position: user.position,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error:error.message});
    }
};

//Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        //Compare password
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid password'});
        }

        //Generate token
        const token = generateToken(User._id, user.role);

        //send response
        res.status(200).json({
            message: 'Login successful',
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                position: user.position,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message});
    }
};

module.exports = {
    registerUser,
    loginUser,
};