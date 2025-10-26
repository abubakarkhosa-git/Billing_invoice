import express from 'express'
import { changepassword, forgotpassword, login, resetpassword, Signup } from '../controllers/user.controllers.js';
import { isAuthorized } from '../middleware/auth.middleware.js';
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/product.controller.js';

const router=express.Router();

router.post("/signup", Signup)
router.post("/login", login)
router.post("/forgot-password", forgotpassword)
router.post("/reset-password/:token", resetpassword)
router.post("/change-password", isAuthorized,changepassword)


//Product
router.post("/products", isAuthorized, addProduct); 
router.put("/products/:productId", isAuthorized, updateProduct); 
router.delete("/products/:productId", isAuthorized, deleteProduct); 
router.get("/products/:productId", isAuthorized, getProduct); 
router.get("/products", isAuthorized, getAllProducts);
export default router;