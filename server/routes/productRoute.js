import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { addProductController, 
    updateProductController, 
    getProductController, 
    getSingleProductController, 
    deleteProductController,
    productPhotoController,
    SearchProductController } from '../controllers/productController.js';
import formidable from 'express-formidable'

// roter object
const router = express.Router();

// add product
router.post('/add-product', requireSignIn, isAdmin, formidable(), addProductController);

// get product
router.get('/get-product', getProductController);

// get single product
router.get('/get-single-product/:slug', getSingleProductController);

// get product photot
router.get('/product-photo/:pid', productPhotoController);

// update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// delete product
router.delete('/delete-product/:id', requireSignIn, isAdmin, deleteProductController);

// search product
router.get('/search/:keyword', SearchProductController);

export default router;
