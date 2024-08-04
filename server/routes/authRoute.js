import express from 'express';
import { registerController, 
    loginController, 
    forgotPasswordController, 
    testController, 
    updateProfileController,
    getOrdersController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// roter object
const router = express.Router();

// Register || METHOD POST
router.post('/register', registerController);

// Login || METHOD POST
router.post('/login', loginController);

// Forgot Password || METHOD POST
router.post('/forgot-password', forgotPasswordController);

// test route
router.get('/test', requireSignIn, isAdmin, testController);

// protected user route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

// protected admin route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// protected admin route
router.put('/profile', requireSignIn, updateProfileController);

// orders
router.get('/orders', requireSignIn, getOrdersController);
 
export default router;