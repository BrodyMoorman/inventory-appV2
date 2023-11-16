import express from 'express';
import { getUser, getUsers } from '../controllers/users.js';
const router = express.Router();

router.get('/find/:userID', getUser);
router.get('/', getUsers);

export default router;