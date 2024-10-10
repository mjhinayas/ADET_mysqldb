const express = require('express');
const { getAllStudent, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/studentsControllers');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, getAllStudent);
router.get('/:id', authenticateToken, getStudentById);
router.post('/', authenticateToken, createStudent);
router.put('/:id', authenticateToken, updateStudent);
router.delete('/:id', authenticateToken, deleteStudent);

module.exports = router;
