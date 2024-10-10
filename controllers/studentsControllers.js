const pool = require('../config/database');
const jwt = require('jsonwebtoken');


const createStudent = async (req, res) => {
    const { fname, mname, lname, user_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO students (fname, mname, lname, user_id) VALUES (?, ?, ?, ?)', [fname, mname, lname, user_id]);
        res.status(201).json({ id: result.insertId, fname, mname, lname, user_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}; 

const getAllStudent= async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT student_id, fname, mname,lname, user_id, created_at, updated_at FROM students');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT student_id, fname, mname,lname,  user_id, created_at, updated_at FROM students WHERE student_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'student cannot be found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { fname, mname, lname, user_id } = req.body;

    try {
        const [result] = await pool.query('UPDATE students SET fname = ?, mname = ?, lname = ?, user_id = ? WHERE student_id = ?', [fname, mname, lname, user_id, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student cannot be found' });
        }

        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student cannot be found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllStudent, getStudentById, createStudent, updateStudent, deleteStudent };