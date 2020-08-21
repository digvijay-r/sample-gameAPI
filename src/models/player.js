const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type : String,
        unique: true,
        required: true,
        trim: true
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;