import express from 'express';
import { createTemplate, getTemplates, deleteTemplate } from '../controllers/templates.js';
import { getParts } from '../controllers/parts.js';
const router = express.Router();

router.get('/', getTemplates);
router.post('/new', createTemplate);
router.delete('/:templateID', deleteTemplate);



export default router;