const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    target: { type: Number, required: true }, // E.g., 10 workouts/week
    achieved: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', goalSchema);

