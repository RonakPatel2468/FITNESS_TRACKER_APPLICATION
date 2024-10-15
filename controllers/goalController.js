const Goal = require('../models/goalModel');
const Workout = require('../models/workoutModel');

// Create Goal
exports.createGoal = async (req, res) => {
    try {
        const goal = new Goal({ ...req.body, user: req.user._id });
        await goal.save();
        res.status(201).json(goal);
    } catch (error) {
        res.status(500).json({ error: "Goal creation failed" });
    }
};

// Get All Goals
exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch goals" });
    }
};

exports.getGoalById = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal || goal.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "Goal not found" });
        }
        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch goal", error: error.message });
    }
};

// Update Goal Achievement Status
exports.updateGoalStatus = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({ error: "Goal not found" });
        }

        // Calculate goal achievement based on workout logs
        const workouts = await Workout.find({ user: req.user._id, date: { $gte: goal.date } });
        const totalWorkouts = workouts.length;
        
        goal.achieved = totalWorkouts >= goal.target;
        await goal.save();

        res.json(goal);
    } catch (error) {
        res.status(500).json({ error: "Failed to update goal status" });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);

        if (!goal || goal.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: "Goal not found" });
        }

        await goal.remove();
        res.status(200).json({ message: "Goal deleted" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete goal", error: error.message });
    }
};
// Get Goal Statistics (Track Goal Achievement)
exports.getGoalStatistics = async (req, res) => {
    try {
        const goals = await Goal.aggregate([
            { $match: { user: req.user._id } },
            { 
                $group: { 
                    _id: "$achieved", 
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(goals);
    } catch (error) {
        res.status(500).json({ error: "Failed to generate goal statistics" });
    }
};




