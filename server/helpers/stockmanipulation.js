import e from "express";
import { db } from "../connect.js"

export const manipulatePartStock = (partid, quantity, add) => {
    return new Promise((resolve, reject) => {
    const q = "SELECT count FROM parts WHERE idparts = ?";
        db.query(q, [partid], (err,data) => {
            if(err) reject({ message: "Internal server error!" });
            if(!data.length) reject({ message: "Part does not exist!" });
            const stock = parseInt(data[0].count);
            let newStock;
            if(add) newStock = stock + parseInt(quantity);
            else{
            if(stock < quantity) reject( { message: "Insufficient stock!" });
                newStock = stock - parseInt(quantity);
            }
            console.log("old Stock:" + stock + "new Stock:" + newStock);
            const q2 = "UPDATE parts SET count = ? WHERE idparts = ?";
            db.query(q2, [newStock, partid], (err, data) => {
                if(err) reject({ message: "Internal server error!" });
                else resolve({ oldStock: stock, newStock: newStock, message: "Stock updated successfully!" });
            })
            
    } 
    );
});
}