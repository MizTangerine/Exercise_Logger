const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/exercise', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

router.get('/stats', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html.html'));
});

module.exports = router;