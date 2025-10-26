import express from 'express'
import { changepassword, forgotpassword, login, resetpassword, Signup } from '../controllers/user.controllers.js';
import { isAuthorized } from '../middleware/auth.middleware.js';
import { addProduct, updateProduct } from '../controllers/product.controller.js';

const router=express.Router();

router.post("/signup", Signup)
router.post("/login", login)
router.post("/forgot-password", forgotpassword)
router.post("/reset-password/:token", resetpassword)
router.post("/change-password", isAuthorized,changepassword)
router.post("/add-product", isAuthorized,addProduct)
router.put("/update-product", isAuthorized, updateProduct)
export default router;