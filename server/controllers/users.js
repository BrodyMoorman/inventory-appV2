import jwt from 'jsonwebtoken';
import { db } from '../connect.js';

export const getUser = async (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        const q = "SELECT name, idusers, profilepic FROM users WHERE idusers = ?";
        db.query(q, [req.params.userId], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        }) 
    })
    
}

export const getUsers = async (req, res) => {
    const query = `SELECT name, idusers, profilepic FROM users`;
    db.query(query, (err, rows) => {
        if (err) {
            console.error("Error fetching data from MySQL:", err);
            res.status(500).json({ error: "An error occurred while fetching data." });
            return;
        }
        res.status(200).json(rows);
    });
}