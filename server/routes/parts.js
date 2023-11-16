import express from 'express';
import { getParts, getPart, createPart, searchParts } from '../controllers/parts.js';
const router = express.Router();

router.get('/', getParts);
router.get('/:partID', getPart);
router.post('/new', createPart);
router.get('/search/:searchQ', searchParts);

export default router;