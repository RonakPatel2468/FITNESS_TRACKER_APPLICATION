const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', workoutSchema);