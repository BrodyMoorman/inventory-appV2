import express from 'express';
import { createVendor, getVendors, getVendorSearchLength, addPartToVendor, getVendorsForPart, getVendor, deleteVendor, deletePartFromVendor, updateVendor  } from '../controllers/vendors.js';
const router = express.Router();

router.post('/new', createVendor);
router.get('/', getVendors);
router.get('/searchlength', getVendorSearchLength);
router.post('/addpart', addPartToVendor);
router.get('/part/:partid', getVendorsForPart);
router.get('/:id', getVendor);
router.delete('/:id', deleteVendor);
router.delete('/part/:idpartstovendor', deletePartFromVendor);
router.put('/:id', updateVendor);


export default router;