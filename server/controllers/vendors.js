import jwt from 'jsonwebtoken';
import { db } from '../connect.js';

export const createVendor = async (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 3) return res.status(403).json({ message: "You do not have permission to do this" });
        const q = "INSERT INTO vendors (`vendorname`, `vendorlink`, `phonenumber`, `email`, `streetaddress`, `city`, `state`, `zip`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        db.query(q, [req.body.name, req.body.website, req.body.phone, req.body.email, req.body.streetAddress, req.body.city, req.body.state, req.body.zip], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json({ message: "Vendor created successfully" });
        })
    })
}

export const getVendors = async (req, res) => {
    const q = `SELECT * FROM vendors WHERE vendorname LIKE ? LIMIT ? OFFSET ?`;
    db.query(q, [req.query.search + "%", parseInt(req.query.limit), parseInt(req.query.offset)], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

// export const getVendor = async (req, res) => {
//     const q = "SELECT * FROM vendors WHERE idvendors = ?";
//     db.query(q, [req.params.id], (err, data) => {
//         if(err) return res.status(500).json(err);
//         return res.status(200).json(data[0]);
//     })
// }
export const getVendor = async (req, res) => {
    const q = `SELECT
    v.*,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'idpartstovendor', ptv.idpartstovendor,
            'partid', ptv.partid,
            'vendorpn', ptv.vendorpn,
            'cost', ptv.cost,
            'vendorpartlink', ptv.vendorpartlink,
            'partname', p.partname
        )
    ) as parts
     FROM vendors v
     LEFT JOIN partstovendor ptv ON v.idvendors = ptv.vendorid
     LEFT JOIN parts p ON ptv.partid = p.idparts
     WHERE v.idvendors = ?
     GROUP BY v.idvendors`;
     
    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    })
}

export const addPartToVendor = async (req, res) => {
    const q = "INSERT INTO partstovendor (`vendorid`, `partid`, `vendorpn`, `cost`, `vendorpartlink`) VALUES (?, ?, ?, ?, ?)";
    db.query(q, [req.body.vendorid, req.body.partid, req.body.vendorPN, req.body.cost, req.body.productPage], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json({ message: "Part added to vendor successfully" });
    })
}

export const getVendorSearchLength = async (req, res) => {
    const q = "SELECT COUNT(*) as count FROM vendors WHERE vendorname LIKE ?";
    db.query(q, [req.query.search + "%"], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    })
}

export const getVendorsForPart = async (req, res) => {
    const q = "SELECT ptv.*, v.vendorname FROM partstovendor ptv JOIN vendors v ON ptv.vendorid = v.idvendors WHERE ptv.partid = ?";
    db.query(q, [req.params.partid], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const deletePartFromVendor = async (req, res) => {
    const q = "DELETE FROM partstovendor WHERE idpartstovendor = ?";
    db.query(q, [req.params.idpartstovendor], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json({ message: "Part deleted from vendor successfully" });
    })
}

export const deleteVendor = async (req, res) => {
    const vendorId = req.params.id;
    const deletePartsQuery = "DELETE FROM partstovendor WHERE vendorid = ?";
    const deleteVendorQuery = "DELETE FROM vendors WHERE idvendors = ?";

    db.beginTransaction(err => {
        if (err) return res.status(500).json(err);

        db.query(deletePartsQuery, [vendorId], (err, data) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).json(err);
                });
            }

            db.query(deleteVendorQuery, [vendorId], (err, data) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json(err);
                    });
                }

                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json(err);
                        });
                    }
                    return res.status(200).json({ message: "Vendor and associated parts deleted successfully" });
                });
            });
        });
    });
}

export const updateVendor = async (req, res) => {
    const q = "UPDATE vendors SET vendorname = ?, vendorlink = ?, phonenumber = ?, email = ?, streetaddress = ?, city = ?, state = ?, zip = ? WHERE idvendors = ?";
    db.query(q, [req.body.name, req.body.website, req.body.phone, req.body.email, req.body.streetAddress, req.body.city, req.body.state, req.body.zip, req.params.id], (err, data) => {
        if(err) return res.status(500).json(err);
        return res.status(200).json({ message: "Vendor updated successfully" });
    })
}