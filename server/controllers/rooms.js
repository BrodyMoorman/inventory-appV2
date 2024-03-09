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

export const changeShelfRows = (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 3) return res.status(403).json({ message: "You do not have permission to do this" });
        const q = "UPDATE shelvingunits SET numrows = ? WHERE idshelvingunits = ?";
        db.query(q, [req.body.rows, req.body.id], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json({ message: "Shelf rows updated successfully" });
        })
    })
}

export const createBin = (req, res) => {
    console.log(req.body)
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 3) return res.status(403).json({ message: "You do not have permission to do this" });
        const q = "INSERT INTO bins (`shelveid`, `name`, `width`, `x`, `rownum`) VALUES (?, ?, ?, ?, ?)";
        db.query(q, [req.body.shelveid, req.body.name, req.body.width, req.body.x, req.body.row], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json({ message: "Bin created successfully" });
        })
    })
}

export const getShelveWithBins = (req, res) => {
    const q = "SELECT JSON_OBJECT('numrows', shelve.numrows, 'bins', JSON_ARRAYAGG(JSON_OBJECT('id', bins.idbins, 'name', bins.name, 'width', bins.width, 'x', bins.x, 'rownum', bins.rownum, 'partname', parts.partname, 'partid', bins.partid))) as shelve FROM shelvingunits shelve JOIN bins ON shelve.idshelvingunits = bins.shelveid LEFT JOIN parts ON bins.partid = parts.idparts WHERE shelve.idshelvingunits = ? GROUP BY shelve.idshelvingunits";
    db.query(q, [req.params.shelveid], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}
