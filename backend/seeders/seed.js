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

        // Name lists
        const firstNames = ['Jake','Alice','Bob','Charlie','Diana','Edward','Fiona','George','Hannah','Ian','Julia','Kevin','Lisa','Mike','Nina','Oscar','Paula','Quinn','Rachel','Steve','Emma','David','Sarah','Michael','Jennifer'];
        const lastNames = ['Williamson','Johnson','Smith','Brown','Prince','Norton','Green','Wilson','Davis','Thompson','Roberts','Hart','Anderson','Miller','Patel','Martinez','White','Taylor','Connor','Rogers','Garcia','Lee','Clark','Lewis','Walker'];

        const users = [];
        const usedIds = new Set();

        // Create 30 users
        for (let i = 0; i < 30; i++) {
            let userId;
            do {
                userId = Math.floor(Math.random() * 10000).toString();
            } while (usedIds.has(userId));
            usedIds.add(userId);

            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

            users.push({
                userId,
                fullName: `${firstName} ${lastName}`,
                totalPoints: 0
            });
        }

        const activities = [];
        const today = new Date();

        // Pick 7-8 users to guarantee today’s activities
        const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
        const todayUsers = shuffledUsers.slice(0, 8);

        for (const u of users) {
            let userTotalPoints = 0;

            for (let day = 0; day < 30; day++) {
                let dailyActivities = 0;

                // Guarantee today’s activities for selected users
                if (day === 0 && todayUsers.includes(u)) {
                    dailyActivities = Math.floor(Math.random() * 5) + 1; // 1-5
                } else {
                    dailyActivities = Math.floor(Math.random() * 4); // 0-3 activities other days
                }

                for (let i = 0; i < dailyActivities; i++) {
                    const randomHours = Math.floor(Math.random() * 24);
                    const randomMinutes = Math.floor(Math.random() * 60);
                    const randomSeconds = Math.floor(Math.random() * 60);

                    const activityDate = new Date(
                        today.getTime() - day * 86400000 - randomHours * 3600000 - randomMinutes * 60000 - randomSeconds * 1000
                    );

                    activities.push({
                        userId: u.userId,
                        points: 20,
                        date: activityDate
                    });

                    userTotalPoints += 20;
                }
            }

            // Ensure todayUsers always have at least one activity today
            if (todayUsers.includes(u) && !activities.some(a => a.userId === u.userId && a.date.toDateString() === today.toDateString())) {
                const activityDate = new Date(today.getTime() - Math.floor(Math.random() * 3600000)); // random time today
                activities.push({ userId: u.userId, points: 20, date: activityDate });
                userTotalPoints += 20;
            }

            u.totalPoints = userTotalPoints;
        }

        // Insert users and activities
        await User.insertMany(users);
        await Activity.insertMany(activities);

        // Calculate ranks
        await calculateRanks();

        console.log('Database seeded: 30 users, multiple activities per day, guaranteed today\'s records for 7-8 users.');
        process.exit(0);

    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seedData();
