import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import { manipulatePartStock } from "../helpers/stockmanipulation.js"


export const createTransaction =  (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 2) return res.status(403).json({ message: "You are not authorized, please submit an authorization request." });
        const add = req.body.add === true ? 1 : 0;
        let result = await manipulatePartStock(req.body.partid, req.body.transactionAmount, add);
        console.log(result);
        if(result.message === "Insufficient stock!") return res.status(400).json({ message: result.message });
        const q = "INSERT INTO transactions (`partid`,`transactiontype`,`quantity`,`transactorid`,`jobid`, `transactionfile`,`add`,`stockbefore`,`stockafter`) VALUES (?)";
        const values = [req.body.partid, req.body.transactionType, req.body.transactionAmount, req.body.transactorid, req.body.jobid, req.body.purchaseOrder, add, result.oldStock,  result.newStock ];
        db.query(q, [values], (err, result) => {
            if(err){
                console.log(err);
                return res.status(500).json({ message: "Internal server error!" });
            }
            return res.status(200).json({ message: "Transaction created successfully" });
        })

        
    })
}

export const getTransactionsForPart = (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        const q = "SELECT transactions.*, users.name AS transactorName FROM transactions JOIN users ON transactions.transactorid = users.idusers WHERE transactions.partid = ?";
        db.query(q, [req.params.partid], (err, data) => {
            if(err) return res.status(500).json({ message: "Internal server error!" });
            return res.status(200).json(data);
        })
    })
}
