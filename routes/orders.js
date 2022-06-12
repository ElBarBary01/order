import express from 'express'
import {createOrder,updateOrder} from "../controller/order.js"
const router = express.Router();

router.post('/',createOrder)
router.patch('/:id',updateOrder)
router.get('/test', (req, res) => res.send('product route testing!'));
export default router;