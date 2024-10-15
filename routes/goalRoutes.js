const express = require('express');
const { createGoal, getGoals, getGoalById, updateGoalStatus, deleteGoal, getGoalStatistics } = require('../controllers/goalController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, createGoal);
router.get('/get/all', protect, getGoals); 
router.get('/:id', protect, getGoalById);
router.put('/:id', protect, updateGoalStatus);
router.delete('/delete', protect, deleteGoal);
router.get('/statistics', protect, getGoalStatistics);


module.exports = router;
