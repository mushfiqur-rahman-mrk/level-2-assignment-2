import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/create-product', ProductControllers.createProduct);

router.get('/', ProductControllers.getAllProducts);

router.get('/:productId', ProductControllers.getSingleProduct);
router.put('/:productId', ProductControllers.getSingleUpdatedProduct);
router.delete('/:productId', ProductControllers.deleteSingleProduct);
console.log('Before assigning route handler');
router.get('/', ProductControllers.searchProduct);
console.log('After assigning route handler');

export const ProductRoutes = router;