import express from 'express';
import { getParts, getPart, createPart, searchParts, assignPartToBin, getPartListLength, getPartsbyPartNo } from '../controllers/parts.js';
const router = express.Router();

router.get('/', getParts);
router.get('/:partID', getPart);
router.post('/new', createPart);
router.post('/assign', assignPartToBin);
router.get('/searchpartno', getPartsbyPartNo);
router.get('/search/searchlength', getPartListLength);
router.get('/search/:searchQ', searchParts);



export default router;