require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Activity = require('../models/Activity');
const { calculateRanks } = require('../utils/rankCalculator');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/leaderboardDB';

async function seedData() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');

        // Clear existing data
        await User.deleteMany({});
        await Activity.deleteMany({});

        // Generate random users
        const firstNames = ['Jake', 'Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia', 'Kevin', 'Lisa', 'Mike', 'Nina', 'Oscar', 'Paula', 'Quinn', 'Rachel', 'Steve', 'Emma', 'David', 'Sarah', 'Michael', 'Jennifer'];
        const lastNames = ['Williamson', 'Johnson', 'Smith', 'Brown', 'Prince', 'Norton', 'Green', 'Wilson', 'Davis', 'Thompson', 'Roberts', 'Hart', 'Anderson', 'Miller', 'Patel', 'Martinez', 'White', 'Taylor', 'Connor', 'Rogers', 'Garcia', 'Lee', 'Clark', 'Lewis', 'Walker'];
        
        const users = [];
        const usedIds = new Set();
        for (let i = 0; i < 30; i++) {
            let userId;
            do {
                userId = Math.floor(Math.random() * 10000).toString();
            } while (usedIds.has(userId));
            usedIds.add(userId);
            
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            users.push({ userId, fullName: `${firstName} ${lastName}` });
        }

        await User.insertMany(users);

        // Generate activities (always 20 points each)
        const activities = [];
        const today = new Date();
        
        for (const u of users) {
            for (let day = 0; day < 30; day++) {
                const dailyActivities = Math.floor(Math.random() * 8); // 0-7 activities per day
                for (let i = 0; i < dailyActivities; i++) {
                    const randomHours = Math.floor(Math.random() * 24);
                    const randomMinutes = Math.floor(Math.random() * 60);
                    const randomSeconds = Math.floor(Math.random() * 60);
                    activities.push({ 
                        userId: u.userId, 
                        points: 20,
                        date: new Date(today.getTime() - day * 86400000 - randomHours * 3600000 - randomMinutes * 60000 - randomSeconds * 1000)
                    });
                }
            }
        }

        await Activity.insertMany(activities);

        // Calculate and store total points and ranks
        await calculateRanks();

        console.log('30 users with dummy data seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seedData();