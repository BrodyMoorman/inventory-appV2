import express from 'express';
import { createRoom, getRooms, createShelve, getShelves, changeShelfRows, createBin, getShelveWithBins } from '../controllers/rooms.js';

const router = express.Router();

router.get('/', getRooms)
router.post('/new', createRoom)
router.post('/createshelve', createShelve)
router.get('/getshelves/:roomid', getShelves)
router.post('/updaterows', changeShelfRows)
router.post('/createbin', createBin)
router.get('/getshelvewithbins/:shelveid', getShelveWithBins)

export default router;
