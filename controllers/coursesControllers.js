const pool = require('../config/database');
const jwt = require('jsonwebtoken');

const createCourse = async (req, res) => {
    const { course_code, course_name, user_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO courses (course_code, course_name, user_id) VALUES (?, ?, ?)', [course_code, course_name, user_id]);
        res.status(201).json({ id: result.insertId, course_code, course_name, user_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};


const getAllCourse= async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT course_id, course_code, course_name, user_id, created_at, updated_at FROM courses');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT course_id, course_code, coures_name, user_id, created_at, updated_at FROM courses WHERE course_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User cannot be found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { course_code, course_name, user_id } = req.body;

    try {
        const [result] = await pool.query('UPDATE courses SET course_code = ?, course_name = ?, user_id = ? WHERE course_id = ?', [course_code, course_name, user_id, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User cannot be found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM courses WHERE course_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User cannot be found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllCourse, getCourseById, createCourse, updateCourse, deleteCourse };