import express from 'express';
import cors from 'cors';
import { getDatas, getGuest, checkStudentExists, checkGuestUserExists, insertUser, verifyUser } from './database.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/datas', async (req, res) => {
    try {
        const datas = await getDatas();
        res.json(datas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/guest', async (req, res) => {
    try {
        const datas = await getGuest();
        res.json(datas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/checkStudent', async (req, res) => {
    try {
        const { reg_id, board_name } = req.body;
        if (!reg_id) return res.status(400).json({ error: "Registration ID is required." });

        const exists = await checkStudentExists(reg_id, board_name);
        res.json({ exists });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/checkGuest', async (req, res) => {
    try {
        const { reg_id, board_name, email } = req.body; // Added email

        if (!reg_id) return res.status(400).json({ error: "Registration ID is required." });
        if (!email) return res.status(400).json({ error: "Email is required." });

        const exists = await checkGuestUserExists(reg_id, board_name, email);
        res.json({ exists });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/signup', async (req, res) => {
    try {
        const { reg_id, board_name, email, password } = req.body;

        const exists = await checkStudentExists(reg_id, board_name);
        if (!exists) return res.status(400).json({ error: "Student not found in government database." });

        const userExists = await checkGuestUserExists(reg_id, board_name, email);
        if (userExists) return res.status(400).json({ error: "User already registered!" });

        const userInfo = await insertUser({ reg_id, board_name, email, password });
        res.json({ success: true, userInfo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        console.log("Received login request:", req.body);
        const { reg_id, board_name, email, password } = req.body;
        const isValidUser = await verifyUser(reg_id, board_name, email, password);

        if (!isValidUser) return res.status(400).json({ error: "Invalid credentials!" });

        res.json({ success: true, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(3600, () => console.log('Server running on port 3600'));
