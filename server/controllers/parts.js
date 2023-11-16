import jwt from 'jsonwebtoken';
import { db } from '../connect.js';

export const getParts = (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 2) return res.status(403).json({ message: "You are not authorized, please submit an authorization request." });
        const q = "SELECT * FROM parts";
        db.query(q, (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        }
    )})

}

export const getPart = (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 2) return res.status(403).json({ message: "You are not authorized, please submit an authorization request." });
        const q = "SELECT * FROM parts WHERE idparts = ?";
        db.query(q, [req.params.partID], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        }
    )})

}

export const createPart = (req, res) => {
   
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 3) return res.status(403).json({ message: "You do not have permission to do this" });
        const q = "INSERT INTO parts (`partname`,`count`,`cost`,`vendor`,`vendorpartno`,`location`,`restocklink`) VALUES (?)";
        const location = req.body.room + ", " + req.body.bay
        const values = [req.body.partName, req.body.startingStock, req.body.cost, req.body.vendorName, req.body.mfgNo, location, req.body.restockLink];
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json({ message: "Part created successfully" });
        }
    )})
}

export const searchParts = (req, res) => {

        const q = "SELECT * FROM parts WHERE partname LIKE ? ";
        db.query(q, ["%" + req.params.searchQ + "%"], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    }



