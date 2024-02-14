import express from 'express';
import { createTransaction, getTransactionsForPart } from '../controllers/transactions.js';
const router = express.Router();

router.get('/part/:partid', getTransactionsForPart );
router.post('', createTransaction);

export default router;