const systemConfig = require('../configs/systemConfig.json');

function generateExpriedTime(time) {
    return time.setHours(time.getHours() + 1, 0, 0, 0);
}


const rateLimiter = async (req, res, next) => {
    console.log("inside rate limiter");
    const currentTime = new Date();
    try {
        console.log("current time ", Number(currentTime));
        console.log("expired time ", req.player.gamePlayRecord.expiredTime);
        if (!!req.player.gamePlayRecord && (req.player.gamePlayRecord.expiredTime > Number(currentTime))) {
            // in current phase check counter
            console.log('in if condition');
            if (req.player.gamePlayRecord.gamePlayCounter < 1) {
                throw new Error();
            }
            req.player.gamePlayRecord.gamePlayCounter -= 1;
            // await req.player.save();
            next();
            return;
        }
        // insert new doc and call next
        req.player.gamePlayRecord = {
            expiredTime: generateExpriedTime(currentTime),
            gamePlayCounter: systemConfig.gamePlayMaxCount
        }
        // await req.player.save();
        next();
    } catch (error) {
        console.log(error);
        res.status(429).send({ errMsg: 'You have exceeded the limit of gamePlay in 1 hour' });
    }
}

module.exports = rateLimiter;

// timestamp & count