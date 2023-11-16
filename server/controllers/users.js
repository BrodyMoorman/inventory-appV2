import jwt from 'jsonwebtoken';
import { db } from '../connect.js';

export const getUser = async (req, res) => {
    
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