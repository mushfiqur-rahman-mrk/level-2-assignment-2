import express from 'express';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post('/orders', OrderControllers.createOrder);
router.get('/orders', OrderControllers.getAllOrders);
router.get('/orders', OrderControllers.getOneOrder);
router.get('/', OrderControllers.searchOrder);



export const OrderRoutes = router;