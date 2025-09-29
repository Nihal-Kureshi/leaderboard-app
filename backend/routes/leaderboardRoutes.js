// routes/leaderboardRoutes.js
const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

// Leaderboard
router.get('/leaderboard', leaderboardController.getLeaderboard);

// Recalculate ranks
router.post('/recalculate', leaderboardController.recalculateRanks);

// Add activity
router.post('/activity', leaderboardController.addActivity);



module.exports = router;
