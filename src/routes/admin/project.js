import express from 'express'
import { view, viewCreate,  viewUpdate, create, update, remove } from '../../controllers/projectControlller.js'
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