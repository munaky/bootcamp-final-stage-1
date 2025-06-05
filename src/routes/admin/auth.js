import express from 'express'
import { viewLogin,  viewRegister, register, login, logout } from '../../controllers/authController.js'

const router = express.Router();

router.get('/login', viewLogin);
router.get('/register', viewRegister);
router.get('/logout', logout);
router.post('/login', login);
router.post('/register', register);

export default router;