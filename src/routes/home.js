import express from 'express';
import { view } from '../controllers/homeController.js';

const router = express.Router();

router.get('/', view);

export default router;