const express = require('express');
const {
    createWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
    getWorkoutStatistics
} = require('../controllers/workoutController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes for managing workouts
router.post('/create', protect, createWorkout);
router.get('/get', protect, getWorkouts);
router.get('/:id', protect, getWorkoutById);
router.put('/:id', protect, updateWorkout);
router.delete('/:id', protect, deleteWorkout);
router.post('/statistics', protect, getWorkoutStatistics);

module.exports = router;
