import express from 'express';
// import shopController from '../controllers/shop';
import {welcome, getProducts, postProduct, putProduct, deleteProduct} from '../controllers/shop';


const router = express.Router();

router.get('/', welcome);

router.get('/products', getProducts);

router.post('/products', postProduct);

router.put('/product/:id', putProduct);

router.delete('/product/:id', deleteProduct);

export default router;