import express from 'express';
import { getUser, getUsers, getProfilePage,getallUsers } from '../controllers/users.js';
const router = express.Router();

router.get('/find/:userID', getUser);
router.get('/', getUsers);
router.get('/profile/:userid', getProfilePage);
router.get('/team', getallUsers);

export default router;