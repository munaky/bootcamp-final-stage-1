import express from 'express'
import view from '../../controllers/dashboardController.js'
import isAuthenticated from '../../middleware/ValidateUser.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', view);
router.get('/dashboard', view);

export default router;