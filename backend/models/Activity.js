const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    points: { type: Number, default: 20 },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
