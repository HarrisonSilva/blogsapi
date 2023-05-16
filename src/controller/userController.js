const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const jwtSecret = process.env.JWT_SECRET;
const tokenConfig = { expiresIn: '7d' };

const createUser = async (req, res) => {
    const user = await loginService.createUser(req.body);
    if (!user) {
       return res.status(200).json({ message: 'User already registered',
});
    }
    const token = jwt.sign({ email: req.body.email }, jwtSecret, tokenConfig);
   res.status(200).json({ token });
};

module.exports = {
    createUser,
};