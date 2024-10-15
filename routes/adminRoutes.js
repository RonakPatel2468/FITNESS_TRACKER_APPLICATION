const express = require('express');
const { getAllUsers, deleteUser } = require('../controllers/adminController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/users', protect, restrictTo('admin'), getAllUsers);
router.delete('/users/:id', protect, restrictTo('admin'), deleteUser);

module.exports = router;
