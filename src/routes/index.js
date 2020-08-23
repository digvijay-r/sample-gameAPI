const express = require('express');
const jwt = require('jsonwebtoken');
const Player = require('../models/player');
const systemConfig = require('../configs/systemConfig.json');
const authentication = require('../middlewares/auth.js');
const rateLimiter = require('../middlewares/rateLimiter.js');
const router = new express.Router();

router.get('/', (req, res) => {
    res.send("Server is Up");
});

// Get server time
router.get('/now', (req, res) => {
    res.send({ timestamp: Number(new Date()) });
});

// Register player
router.post('/register', async (req, res) => {
    const player = new Player(req.body);
    try {
        await player.save();
        const secretKey = process.env.JWT_SECRET_KEY || systemConfig.jwtSecretKey;
        const token = jwt.sign({ name: player.name }, secretKey);
        res.status(201).send({ token });
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

router.get('/me', authentication, async (req, res) => {
    console.log(req.player);
    res.send(req.player);
});

function generateRandomPoints(minValue, maxValue) {
    return Math.floor(Math.random() * maxValue) + minValue;
}

router.post('/game/play', authentication, rateLimiter, async (req, res) => {
    try {
        const points_added = generateRandomPoints(1, 100);
        req.player.points += points_added;
        await req.player.save();
        res.status(201).send({ points_added, points_total: req.player.points });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.post('/game/claim_bonus', authentication, async (req, res) => {
    try {
        const currentTime = Number(new Date());
        console.log("current time ", currentTime);
        console.log("expired time ", req.player.bonusInfo.claimedTime);
        const difference = currentTime - Number(req.player.bonusInfo.claimedTime);
        console.log("difference in claimed and current", difference);
        if (req.player.bonusInfo.claimedAmt >= systemConfig.maxBonusClaim) {
            return res.status(400).send({ info: "You have claimed max amount." })
        }
        if (difference < systemConfig.bonusClaimDifference) {
            return res.status(400).send({ info: "You can claim after 1 min of last claim." })
        }
        req.player.points += systemConfig.bonusPoints;
        req.player.bonusInfo.claimedTime = Date.now();
        req.player.bonusInfo.claimedAmt += systemConfig.bonusPoints;
        await req.player.save();
        res.status(201).send({ points_added: systemConfig.bonusPoints, points_total: req.player.points });
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

module.exports = router;
