const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
    res.send("Server is Up");
});

// Get server time
router.get('/now', (req, res) => {
    res.send({ timestamp: Number(new Date()) });
});



module.exports = router;
