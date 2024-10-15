const Workout = require('../models/workoutModel');

// Create a new workout
exports.createWorkout = async (req, res) => {
    try {
        const workout = new Workout({ ...req.body, user: req.user._id });
        await workout.save();
        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ error: "Workout creation failed" });
    }
};

// Get all workouts for the logged-in user
exports.getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user._id });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch workouts" });
    }
};

// Get a specific workout by ID
exports.getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findOne({ _id: req.params.id, user: req.user._id });
        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }
        res.json(workout);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch workout" });
    }
};

// Update a workout by ID
exports.updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }
        res.json(workout);
    } catch (error) {
        res.status(500).json({ error: "Workout update failed" });
    }
};

// Delete a workout by ID
exports.deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!workout) {
            return res.status(404).json({ error: "Workout not found" });
        }
        res.json({ message: "Workout deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Workout deletion failed" });
    }
};

exports.getWorkoutStatistics = async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
        const workouts = await Workout.aggregate([
            { $match: { user: req.user._id, date: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
            { 
                $group: { 
                    _id: "$description", 
                    totalDuration: { $sum: "$duration" }, 
                    totalCaloriesBurned: { $sum: "$caloriesBurned" }, 
                    count: { $sum: 1 } 
                }
            },
            { 
                $sort: { totalCaloriesBurned: -1 } 
            }
        ]);

        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: "Failed to generate statistics" });
    }
};

