const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    points: {
        type: Number,
        default: 0
    },
    gamePlayRecord: {
        expiredTime: Date,
        gamePlayCounter: Number
    },
    bonusInfo: {
        claimedTime: {
            type: Date,
            default: Date.now
        },
        claimedAmt: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

playerSchema.index({ points: -1 });

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;