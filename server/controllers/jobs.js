import jwt from 'jsonwebtoken';
import { db } from '../connect.js';

export const createJob = async (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        if(userInfo.permission < 3) return res.status(403).json({ message: "You do not have permission to do this" });
        const q = "INSERT INTO jobs (`jobname`,`expecteddate`,`jobstatus`,`jobcreator` ) VALUES (?)";
        const values = [req.body.jobTitle, req.body.completionDate, "in progress", req.body.members[0].userId];
        console.log(values);
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            req.body.members.forEach((member) => {
                const q = "INSERT INTO userstojobs (`jobid`,`userid`) VALUES (?)";
                const values = [data.insertId, member.userId];
                db.query(q, [values], (err, data) => {
                    if(err) return res.status(500).json(err);
                }
            )})
            req.body.parts.forEach((part) => {
                const q = "INSERT INTO partstojobs (`jobid`,`partid`,`numneeded`,`numused`) VALUES (?)";
                const values = [data.insertId, part.partId, part.partCount, 0];
                db.query(q, [values], (err, data) => {
                    if(err) return res.status(500).json(err);
                }
            )})
            return res.status(200).json({ message: "Job created successfully" }); 
        }
    )})
}

export const getUserJobs = async (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        const q = "Select * from jobs inner join userstojobs on jobs.idjobs = userstojobs.jobid where userstojobs.userid = ? ";
        db.query(q, [req.params.userId], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}

export const getJob = async (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        const q = "SELECT JSON_OBJECT('jobId', jobs.idjobs, 'jobName', jobs.jobname, 'createdDate', jobs.creationdate, 'expectedDate', jobs.expecteddate, 'jobStatus', jobs.jobstatus, 'jobCreator', jobs.jobcreator, 'parts', JSON_ARRAYAGG(JSON_OBJECT('partID', parts.idparts, 'partName', parts.partname, 'partCost', parts.cost, 'partStock', parts.count, 'partLocation', parts.location, 'numNeeded', partstojobs.numneeded, 'numUsed', partstojobs.numused )), 'members', JSON_ARRAYAGG(JSON_OBJECT('userId', users.idusers, 'userName', users.name, 'userImg', users.profilepic)), 'jobActions', (SELECT JSON_ARRAYAGG(JSON_OBJECT('idjobactions', jobactions.idjobactions, 'jobId', jobactions.jobid, 'actorId', jobactions.actorid, 'userName', (SELECT name FROM users WHERE idusers = jobactions.actorid), 'partName', (SELECT partname FROM parts WHERE idparts = jobactions.partid), 'actionType', jobactions.actiontype, 'jobActionsCol', jobactions.jobactionscol, 'newStatus', jobactions.newstatus, 'partId', jobactions.partid, 'numCharged', jobactions.numcharged, 'actionTime', jobactions.actiontime, 'oldStatus', jobactions.oldstatus)) FROM jobactions WHERE jobactions.jobid = jobs.idjobs)) AS job FROM jobs JOIN userstojobs ON jobs.idjobs = userstojobs.jobid INNER JOIN users ON userstojobs.userid = users.idusers JOIN partstojobs ON jobs.idjobs = partstojobs.jobid JOIN parts ON partstojobs.partid = parts.idparts WHERE jobs.idjobs = ?";
        db.query(q, [req.params.jobId], (err, data) => {
            if(err) return res.status(500).json(err);      
            return res.status(200).json(data[0]);
        })
    })
}

export const changeJobStatus = async (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        const q = "UPDATE jobs SET jobstatus = ? WHERE idjobs = ?";
        db.query(q, [req.body.jobStatus, req.params.jobId], (err, data) => {
            if(err) return res.status(500).json(err);
            const q2 = "INSERT INTO jobactions (`jobid`,`actorid`,`actiontype`,`newstatus`, `oldstatus` ) VALUES (?)";
            const values = [req.params.jobId, req.body.userId, "status change", req.body.jobStatus, req.body.oldStatus];
            db.query(q2, [values], (err, data) => {
                if(err) return res.status(500).json({ message: "Error logging job action" });
                return res.status(200).json({ message: "Job status changed successfully" });
            })
        })
    })
}

export const chargeOutParts = async (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        const q = "UPDATE partstojobs SET numused = numused + ? WHERE jobid = ? AND partid = ?";
        db.query(q, [req.body.numCharged, req.params.jobId, req.body.partId], (err, data) => {
            if(err) return res.status(500).json({ message: "Error charging out parts" });
            const q2 = "INSERT INTO jobactions (`jobid`,`actorid`,`actiontype`,`partid`,`numcharged` ) VALUES (?)";
            const values = [req.params.jobId, req.body.userId, "part charge", req.body.partId, req.body.numCharged];
            db.query(q2, [values], (err, data) => {
                if(err) return res.status(500).json({ message: "Error logging job action" });
                return res.status(200).json({ message: "Parts charged out successfully" });
            })

            
        })
    })
}

export const addJobMember = async (req, res) => {
    const token = req.cookies.__auth__;
    if (!token) return res.status(401).json({ message: "Not logged in!" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userInfo) => {
        if(err) return res.status(403).json({ message: "Invalid token!" });
        const q = "INSERT INTO userstojobs (`jobid`,`userid`) VALUES (?)";
        const values = [req.params.jobId, req.body.userId];
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err);
            return res.status(200).json({ message: "Member added to job successfully" });
        })
    })
}

    
