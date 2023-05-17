const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            message: 'Token not found',
          });
    }
    try {
        const token = jwt.verify(authorization, jwtSecret);
        console.log(token);
        req.token = token;
   } catch (error) {
       return res.status(401).json({
           message: 'Expired or invalid token',
         });
   }
    next();
};

module.exports = {
    validateToken,
};
