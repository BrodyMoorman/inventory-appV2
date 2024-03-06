import jwt from 'jsonwebtoken';
import { db } from '../connect.js';

export const getParts = (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 2) return res.status(403).json({ message: "You are not authorized, please submit an authorization request." });
        const q = `SELECT * FROM parts WHERE partname LIKE ?  LIMIT ? OFFSET ?`;
        const q2 = `SELECT * FROM parts WHERE idparts LIKE ?  LIMIT ? OFFSET ?`;
        let offset;
        if(req.query.page) offset = (parseInt(req.query.page) - 1) * 10;
        if(req.query.searchingPartNo) {
            db.query(q2, [req.query.search+"%", parseInt(req.query.limit), parseInt(req.query.offset)], (err, data) => {
                if(err) return res.status(500).json(err);
                return res.status(200).json(data);
            })
        } else {
        db.query(q, ["%"+ req.query.search + "%", parseInt(req.query.limit), parseInt(req.query.offset)], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
            })
        }
    })
}

export const getPart = (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 2) return res.status(403).json({ message: "You are not authorized, please submit an authorization request." });
        const q = `
        SELECT parts.*, 
       bins.name as binname, 
       shelvingunits.idshelvingunits, 
       shelvingunits.shelvename, 
       rooms.idrooms, 
       rooms.roomname
       FROM parts
       LEFT JOIN bins ON parts.binid = bins.idbins
       LEFT JOIN shelvingunits ON bins.shelveid = shelvingunits.idshelvingunits
       LEFT JOIN rooms ON shelvingunits.roomid = rooms.idrooms
       WHERE parts.idparts = ?`;
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
        const location = 'Unassigned'
        const values = [req.body.partName, req.body.startingStock, req.body.cost, req.body.vendorName, req.body.mfgNo, location, req.body.restockLink];
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json({ message: "Part created successfully" });
        }
    )})
}
export const getPartListLength = (req, res) => {
    const q = "SELECT COUNT(*) as count FROM parts WHERE partname or idparts LIKE ?";
    const q2 = "SELECT COUNT(*) as count FROM parts WHERE idparts LIKE ?";
    if(req.query.searchingPartNo) {
        db.query(q2, [req.query.partNoSearch+"%"], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        })
    } else {
    db.query(q, ["%"+req.query.search + "%"], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    })
}
}

export const searchParts = (req, res) => {

        const q = "SELECT * FROM parts WHERE partname LIKE ? ";
        db.query(q, ["%" + req.params.searchQ + "%"], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    }

export const assignPartToBin = (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 2) return res.status(403).json({ message: "You are not authorized, please submit an authorization request." });
        const q1 = "SELECT * FROM parts WHERE idparts = ?";
        db.query(q1, [req.body.partID], (err, data) => {
            if(err) return res.status(500).json(err);
            if(data[0].binid) {
                const q = "UPDATE bins SET partid = NULL WHERE idbins = ?";
                db.query(q, [data[0].binid], (err, data) => {
                    if(err) return res.status(500).json(err);
                }
            )}
            const q2 = "UPDATE bins SET partid = ? WHERE idbins = ?";
            db.query(q2, [req.body.partID, req.body.binID], (err, data) => {
                if(err) return res.status(500).json(err);
                const q3 = "UPDATE parts SET binid = ? WHERE idparts = ?";
                db.query(q3, [req.body.binID, req.body.partID], (err, data) => {
                    if(err) return res.status(500).json(err);
                    const q4 = "SELECT bins.name as binname, shelvingunits.idshelvingunits, shelvingunits.shelvename, rooms.idrooms, rooms.roomname FROM bins LEFT JOIN shelvingunits ON bins.shelveid = shelvingunits.idshelvingunits LEFT JOIN rooms ON shelvingunits.roomid = rooms.idrooms WHERE bins.idbins = ?";
                    db.query(q4, [req.body.binID], (err, data) => {
                        if(err) return res.status(500).json(err);
                        let location = data[0].roomname + ", " + data[0].shelvename + ", " + data[0].binname;
                        const q5 = "UPDATE parts SET location = ? WHERE idparts = ?";
                        db.query(q5, [location, req.body.partID], (err, data) => {
                            if(err) return res.status(500).json(err);
                            return res.status(200).json({ message: "Part assigned to bin successfully" });
                        })
                    })
                })
            })
        })
    })
}

export const getPartsbyPartNo = (req, res) => {
    const q = "SELECT * FROM parts WHERE idparts LIKE ? LIMIT ? OFFSET ? ";
    db.query(q, [req.params.search+"%", req.params.limit, req.params.offset], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    })
}

export const getNumResultsbyPartNo = (req, res) => {
    const q = "SELECT COUNT(*) as count FROM parts WHERE idparts LIKE ?";
    db.query(q, [req.params.search+"%"], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    })
}



