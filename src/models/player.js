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
    }
}, {
    timestamps: true
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;