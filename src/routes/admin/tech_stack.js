import express from 'express'
import { view,  viewUpdate, create, update, remove, viewCreate } from '../../controllers/techStackController.js';
import isAuthenticated from '../../middleware/ValidateUser.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', view);
router.get('/create', viewCreate);
router.get('/update/:id', viewUpdate);
router.post('/create', create);
router.post('/update', update);
router.post('/remove', remove);

export default router;