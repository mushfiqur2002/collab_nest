import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Government Database Connector
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_GOV_DB
}).promise();

// Collab Neast Database Connector
const pool1 = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_COLLAB_NEAST_DB
}).promise();

export async function getDatas() {
    try {
        const [datas] = await pool.query("SELECT * FROM student_information");
        return datas;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getGuest() {
    try {
        const [datas] = await pool1.query("SELECT * FROM guest_user_information");
        return datas;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Check Guest User In student_information Table government_db Database
export async function checkStudentExists(reg_id, board_name) {
    try {
        const [rows] = await pool.query("SELECT * FROM student_information WHERE reg_id = ? AND board_name = ?", [reg_id, board_name]);
        return rows.length > 0;
    } catch (error) {
        console.error('Error checking student:', error);
        throw error;
    }
}

// Check Guest User In guest_user_information Table collabNeast Database
export async function checkGuestUserExists(reg_id, board_name, email,password) {
    try {
        const [rows] = await pool1.query(
            "SELECT * FROM guest_user_information WHERE reg_id = ? AND board_name = ? AND email = ? AND password = ?", 
            [reg_id, board_name, email,password]
        );
        return rows.length > 0;
    } catch (error) {
        console.error('Error checking guest user:', error);
        throw error;
    }
}


// Add Data In guest_user_information Table collabNeast Database
export async function insertUser({ reg_id, board_name, email, password }) {
    try {
        const [result] = await pool1.query("INSERT INTO guest_user_information (reg_id, board_name, email, password) VALUES (?, ?, ?, ?)", 
            [reg_id, board_name, email, password]);
        return result.insertId;
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}

// Verify Login Credentials
export async function verifyUser(reg_id, board_name, email, password) {
    try {
        const [rows] = await pool1.query(
            "SELECT * FROM guest_user_information WHERE reg_id = ? AND board_name = ? AND email = ? AND password = ?",
            [reg_id, board_name, email, password]
        );
        console.log('verify :',rows);
        return rows.length > 0;
    } catch (error) {
        console.error('Error verifying user:', error);
        throw error;
    }
}


