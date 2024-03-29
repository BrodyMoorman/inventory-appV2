import express from 'express';
import { createJob, getUserJobs, getJob, changeJobStatus, chargeOutParts, addJobMember } from '../controllers/jobs.js';
const router = express.Router();

router.get('', );
router.get('/user/:userId', getUserJobs );
router.post('/new', createJob );
router.get('/:jobId', getJob );
router.put('/status/:jobId', changeJobStatus );
router.post('/partcharge/:jobId', chargeOutParts );
router.post('/addmember/:jobId', addJobMember );


export default router;