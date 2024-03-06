import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"




export const login = (req, res) => {

    const q = "SELECT * FROM users WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) 
            return res.status(500).json(err)
        if (!data.length){
        
            console.log(req.body.email)
            return res.status(404).json({ message: "User does not exist" })

        }
            
        //Check password
        const validPassword = bcrypt.compareSync(req.body.password, data[0].hash);
        if (!validPassword)
            return res.status(400).json({ message: "Invalid email or password." })
        //Create token
        const token = jwt.sign({ id: data[0].id }, process.env.TOKEN_SECRET)

        const {hash, ...user} = data[0]

        res.status(200).json({ token: token, user: user })
    })

        



}

export const register = (req, res) => {
    //Check if user exists
    const q = "SELECT * FROM users WHERE email = ?"

    db.query(q, [req.body.email], (err, data) => {
        if (err) 
            return res.status(500).json(err)
        if (data.length > 0) 
            return res.status(400).json({ message: "User already exists" })
        //Create user
        //Hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`name`,`hash`,`email`) VALUES (?)"

        const concatName = req.body.firstName + " " + req.body.lastName
        const values = [concatName, hash, req.body.email];
        db.query(q, [values] , (err, data) => {
            if (err) 
                return res.status(500).json(err)
            return res.status(200).json({ message: "User created successfully" })
        })


    })

    


}

export const logout = (req, res) => {
    
}
