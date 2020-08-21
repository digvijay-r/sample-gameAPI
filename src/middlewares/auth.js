const jwt = require('jsonwebtoken');
const systemConfig = require('../configs/systemConfig.json');
const Player = require('../models/player');


const auth = async (req, res, next) => {
    console.log('Auth middleware');
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const secretKey = process.env.JWT_SECRET_KEY || systemConfig.jwtSecretKey;
        const decoded = jwt.verify(token, secretKey);
        const playerData = await Player.findOne({ name: decoded.name });
        if (!playerData) {
            throw new Error();
        }
        req.token = token;
        req.player = playerData;
        next();
    } catch (error) {
        res.status(401).send({ errorMsg: 'Authentication failed.' });
    }
}

module.exports = auth;