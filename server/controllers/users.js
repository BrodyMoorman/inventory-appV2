import jwt from 'jsonwebtoken';
import { db } from '../connect.js';

export const getUser = async (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        const q = "SELECT name, idusers, profilepic FROM users WHERE idusers = ?";
        db.query(q, [req.params.userID], (err, data) => {
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
export const getallUsers = async (req, res) => {
    const query = `SELECT name, idusers, profilepic, permissionlevel FROM users`;
    db.query(query, (err, rows) => {
        if (err) {
            console.error("Error fetching data from MySQL:", err);
            res.status(500).json({ error: "An error occurred while fetching data." });
            return;
        }
        res.status(200).json(rows);
    });
}

export const getProfilePage = async (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        const q =
         `SELECT 
         u.idusers,
         u.name,
         u.profilepic,
         u.permissionlevel,
         (
             SELECT JSON_ARRAYAGG(
                 JSON_OBJECT(
                     'transactionid', t.transactionid,
                     'partid', t.partid,
                     'partname', p.partname, -- Added partname
                     'transactiontype', t.transactiontype,
                     'quantity', t.quantity,
                     'add', t.add,
                     'timestamp', t.timestamp,
                     'transactionfile', t.transactionfile,
                     'stockbefore', t.stockbefore,
                     'stockafter', t.stockafter
                 )
             )
             FROM transactions t
             LEFT JOIN parts p ON t.partid = p.idparts -- Join with parts table
             WHERE t.transactorid = u.idusers
             ORDER BY t.timestamp DESC
             LIMIT 10
         ) AS recent_transactions,
         JSON_ARRAYAGG(
             JSON_OBJECT(
                 'idjobs', j.idjobs,
                 'jobname', j.jobname,
                 'jobdesc', j.jobdesc,
                 'creationdate', j.creationdate,
                 'expecteddate', j.expecteddate,
                 'completeddate', j.completeddate,
                 'jobstatus', j.jobstatus,
                 'assemblyinstance', j.assemblyinstance
             )
         ) AS user_jobs
     FROM 
         users u
     LEFT JOIN 
         jobs j ON u.idusers = j.jobcreator
     WHERE 
         u.idusers = ?;
     `
        db.query(q, [req.params.userid], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        })
    })
}