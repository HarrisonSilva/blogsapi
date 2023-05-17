const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const jwtSecret = process.env.JWT_SECRET;
const tokenConfig = { expiresIn: '7d' };

const createUser = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        await loginService.createUser({ displayName, email, password, image });
           const token = jwt.sign({ email: req.body.email }, jwtSecret, tokenConfig);
          res.status(201).json({ token });
    } catch (error) {
        return res.status(409).json({ message: 'User already registered',
    });
    }
};

const getUsers = async (req, res) => {
   const users = await loginService.getUsers();
    return res.status(200).json(users);
};

module.exports = {
    createUser,
    getUsers,
};