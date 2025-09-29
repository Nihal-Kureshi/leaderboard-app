const User = require('../models/User');
const Activity = require('../models/Activity');

exports.calculateRanks = async () => {
    // Recalculate total points for all users
    const users = await User.find();
    
    for (const user of users) {
        const activities = await Activity.find({ userId: user.userId });
        const totalPoints = activities.reduce((sum, act) => sum + act.points, 0);
        user.totalPoints = totalPoints;
        await user.save();
    }

    // Get all users sorted by totalPoints desc and assign ranks
    const sortedUsers = await User.find().sort({ totalPoints: -1 });
    let currentRank = 1;
    
    for (let i = 0; i < sortedUsers.length; i++) {
        if (i > 0 && sortedUsers[i].totalPoints < sortedUsers[i-1].totalPoints) {
            currentRank = i + 1;
        }
        sortedUsers[i].rank = currentRank;
        await sortedUsers[i].save();
    }
};

exports.calculateFilteredRanks = (users) => {
    users.sort((a, b) => b.totalPoints - a.totalPoints);
    let currentRank = 1;
    
    for (let i = 0; i < users.length; i++) {
        if (i > 0 && users[i].totalPoints < users[i-1].totalPoints) {
            currentRank = i + 1;
        }
        users[i].rank = currentRank;
    }
    
    return users;
};