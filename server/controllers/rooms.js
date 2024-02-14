import jwt from "jsonwebtoken"
import { db } from "../connect.js"

export const createRoom = (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 3) return res.status(403).json({ message: "You do not have permission to do this" });
        const q = "INSERT INTO rooms (`roomname`) VALUES (?)";
        db.query(q, [req.body.roomName], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json({ message: "Room created successfully" });
        })
    })
}

export const getRooms = (req, res) => {
    const q = "SELECT * FROM rooms";
    db.query(q, (err, data ) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const createShelve = (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 3) return res.status(403).json({ message: "You do not have permission to do this" });
        const q = "INSERT INTO shelvingunits (`roomid`, `shelvename`, `width`, `height`, `x`, `y`) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(q, [req.body.roomid, req.body.shelfname, req.body.width, req.body.height, req.body.x, req.body.y], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json({ message: "Shelf created successfully" });
        })
    })
}

export const getShelves = (req, res) => {
    const q = "SELECT * FROM shelvingunits WHERE roomid = ?";
    db.query(q, [req.params.roomid], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}