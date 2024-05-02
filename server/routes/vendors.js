import express from 'express';
import { createVendor, getVendors, getVendorSearchLength, addPartToVendor, getVendorsForPart } from '../controllers/vendors.js';
const router = express.Router();

router.post('/new', createVendor);
router.get('/', getVendors);
router.get('/searchlength', getVendorSearchLength);
router.post('/addpart', addPartToVendor);
router.get('/part/:partid', getVendorsForPart);


export default router;