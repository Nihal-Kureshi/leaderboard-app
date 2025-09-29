// controllers/leaderboardController.js
const User = require('../models/User');
const Activity = require('../models/Activity');
const { calculateRanks, calculateFilteredRanks } = require('../utils/rankCalculator');
const mongoose = require('mongoose');

/**
 * GET /leaderboard
 * Query params:
 *   - filter: day | month | year
 *   - search: userId
 */
exports.getLeaderboard = async (req, res) => {
    try {
        const { filter, search } = req.query;

        let users;
        
        if (filter) {
            const now = new Date();
            let startDate, endDate;
            
            if (filter === 'day') {
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
            } else if (filter === 'month') {
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            } else if (filter === 'year') {
                startDate = new Date(now.getFullYear(), 0, 1);
                endDate = new Date(now.getFullYear() + 1, 0, 1);
            }

            // Get users with filtered points
            const allUsers = await User.find().sort({ totalPoints: -1, userId: 1 });
            users = [];
            
            for (const user of allUsers) {
                const activities = await Activity.find({
                    userId: user.userId,
                    date: { $gte: startDate, $lt: endDate }
                });
                const filteredPoints = activities.reduce((sum, act) => sum + act.points, 0);
                users.push({
                    userId: user.userId,
                    fullName: user.fullName,
                    totalPoints: filteredPoints,
                    rank: 0
                });
            }
            
            // Calculate ranks for filtered data
            users = calculateFilteredRanks(users);
        } else {
            // Get all users with stored ranks
            const allUsers = await User.find().sort({ totalPoints: -1, userId: 1 });
            users = allUsers.map(user => ({
                userId: user.userId,
                fullName: user.fullName,
                totalPoints: user.totalPoints,
                rank: user.rank
            }));
        }

        // If search is provided, bring that user to top
        if (search) {
            const searchIndex = users.findIndex(u => u.userId === search);
            if (searchIndex > -1) {
                const [user] = users.splice(searchIndex, 1);
                users.unshift(user);
            }
        }

        res.json({ count: users.length, data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// POST /activity
exports.addActivity = async (req, res) => {
    try {
        const { userId } = req.body;

        // Check user exists
        let user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add activity
        const activity = new Activity({ userId });
        await activity.save();

        // Update user's total points
        user.totalPoints += 20;
        await user.save();

        res.json({ message: 'Activity added', activity });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// POST /recalculate
exports.recalculateRanks = async (req, res) => {
    try {
        await calculateRanks();
        res.json({ message: 'Ranks recalculated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



