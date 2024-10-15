const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const adminRoutes = require('./routes/adminRoutes');
const goalRoutes = require('./routes/goalRoutes');


app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/goals', goalRoutes);


module.exports = app;