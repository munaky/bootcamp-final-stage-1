import express from 'express'
import { view,  viewEdit, create, update, remove } from '../../controllers/techStackController.js'

const router = express.Router();

router.get('/', view);
router.get('/edit/:id', viewEdit);
router.post('/create', create);
router.post('/update', update);
router.post('/remove', remove);

export default router;