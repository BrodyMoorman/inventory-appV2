import express from 'express';
import { createRoom, getRooms, createShelve, getShelves } from '../controllers/rooms.js';

const router = express.Router();

router.get('/', getRooms)
router.post('/new', createRoom)
router.post('/createshelve', createShelve)
router.get('/getshelves/:roomid', getShelves)

export default router;
