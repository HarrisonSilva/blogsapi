const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const jwtSecret = process.env.JWT_SECRET;
const tokenConfig = { expiresIn: '7d' };

const userlogin = async (req, res) => {
    const { email, password } = req.body;
    
    const results = await loginService.userDb(email);

    if (!results || results.password !== password) {
        return res.status(409).json({ message: 'Invalid fields' });
    }
    
    const token = jwt.sign({ email, userId: results.id }, jwtSecret, tokenConfig);
    res.status(201).json({ token });
};

module.exports = {
userlogin,
};
