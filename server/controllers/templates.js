import jwt from 'jsonwebtoken';
import { db } from '../connect.js';

export const getTemplates = (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 2) return res.status(403).json({ message: "You are not authorized, please submit an authorization request." });
        const query = `
        SELECT
          at.idassemblytemplates AS transaction_id,
          at.templatename AS transaction_name,
          at.templatedescription AS transaction_description,
          at.designdocument AS designdocument,
          p.idparts AS part_id,
          p.partname AS part_name,
          p.location AS part_location,
          pat.quantity
        FROM partstoassemblytemplates AS pat
        JOIN assemblytemplates AS at ON pat.templateid = at.idassemblytemplates
        JOIN parts AS p ON pat.partid = p.idparts;
      `;
    
      db.query(query, (err, rows) => {
        if (err) {
          console.error('Error fetching data from MySQL:', err);
          res.status(500).json({ error: 'An error occurred while fetching data.' });
          return;
        }
    
        // Transform the result into the desired JSON format
        const transactions = [];
        let currentTransaction = null;

        const hasTransaction = (transaction_id) => {
            for (const transaction of transactions) {
                if (transaction.transaction_id === transaction_id) {
                    return true;
                }
            }
        }
        const findTransaction = (transaction_id) => {
            for (const transaction of transactions) {
                if (transaction.transaction_id === transaction_id) {
                    return transaction;
                }
            }
        }
    
        for (const row of rows) {
          if (!currentTransaction || !hasTransaction(row.transaction_id)) {
            // Start a new transaction
            currentTransaction = {
              transaction_id: row.transaction_id,
              transaction_name: row.transaction_name,
              transaction_description: row.transaction_description,
              designdocument: row.designdocument,
              parts: [],
            };
            transactions.push(currentTransaction);
          } else {
            currentTransaction = findTransaction(row.transaction_id);
            }
            
    
          // Add part information to the current transaction's parts array
          currentTransaction.parts.push({
            partId: row.part_id,
            partName: row.part_name,
            part_location: row.part_location,
            partCount: row.quantity,
          });
        }
    
        res.status(200).json(transactions);
      })})

}



export const createTemplate = (req, res) => {
   
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 3) return res.status(403).json({ message: "You do not have permission to do this" });
        const q = "INSERT INTO assemblytemplates (`templatename`,`templatedescription`,`designdocument`) VALUES (?)";
        const values = [req.body.name, req.body.description, req.body.designDoc];
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            req.body.parts.forEach(part => {
                console.log("adding part: " + part.partId + " to template: " + data.insertId);
                const q2 = "INSERT INTO partstoassemblytemplates (`templateid`,`partid`,`quantity`) VALUES (?)";
                const values2 = [data.insertId, part.partId, part.partCount];
                db.query(q2, [values2], (err2, data) => {
                    if(err2) return res.status(500).json(err2);
                    
                })
                
            });
            return res.status(200).json({ message: "Template created successfully" });
        }

    )})
}



export const deleteTemplate = (req, res) => {
    
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 3) return res.status(403).json({ message: "You do not have permission to do this" });

        const q = "DELETE FROM partstoassemblytemplates WHERE templateid = ?";
        db.query(q, [req.params.templateID], (err, data) => {
            if(err) return res.status(500).json(err);
            const q2 = "DELETE FROM assemblytemplates WHERE idassemblytemplates = ?";
            db.query(q2, [req.params.templateID], (err2, data2) => {
                if(err2) return res.status(500).json(err2);
                return res.status(200).json({ message: "Template deleted successfully" });
            })
        }
    )})

}
