
const mysql = require('mysql2/promise');  // Import the 'mysql2/promise' package to handle MySQL connections using promises.
const dotenv = require('dotenv');     // Import the 'dotenv' package to load environment variables from a .env file.


dotenv.config(); // Load environment variables from the .env file into process.env


// Create a connection pool to manage multiple MySQL database connections.
// Using 'process.env' allows sensitive data (host, user, password, etc.) to be stored securely in environment variables.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

module.exports = pool;