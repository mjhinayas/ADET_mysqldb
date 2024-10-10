const pool = require('../config/database');
const jwt = require('jsonwebtoken');



const createDept = async (req, res) => {
    const { dept_code, dept_name, user_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO departments (dept_code, dept_name, user_id) VALUES (?, ?, ?)', [dept_code, dept_name, user_id]);
        res.status(201).json({ id: result.insertId, dept_code, dept_name, user_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

};



const getAllDept= async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT dept_id, dept_code, dept_name, user_id, created_at, updated_at FROM dept');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getDeptById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT dept_id, dept_code, dept_name, user_id, created_at, updated_at FROM users WHERE user_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User cannot be found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const updateDept = async (req, res) => {
    const { id } = req.params;
    const { dept_code, dept_name, user_id } = req.body;

    try {
        const [result] = await pool.query('UPDATE department SET dept_code = ?, dept_name = ?, user_id = ? WHERE dept_id = ?', [dept_code, dept_name, user_id, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User cannot be found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteDept = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM department WHERE dept_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User cannot be found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllDept, getDeptById, createDept, updateDept, deleteDept };