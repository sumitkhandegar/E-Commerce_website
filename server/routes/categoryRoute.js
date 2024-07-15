import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { addCategoryController, 
    updateCategoryController, 
    getCategoryController, 
    getSingleCategoryController,
    deleteCategoryController
} from '../controllers/categoryController.js';

// roter object
const router = express.Router();

// add category
router.post('/add-category', requireSignIn, isAdmin, addCategoryController);

// update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

// get category
router.get('/get-category', getCategoryController);

// get single category
router.get('/get-single-category/:slug', getSingleCategoryController);

// delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;
