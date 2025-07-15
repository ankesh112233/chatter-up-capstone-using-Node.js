import express from 'express';
import { getAllMessages } from '../controllers/messageController.js';

const router = express.Router();

router.get('/', getAllMessages);

export default router;
