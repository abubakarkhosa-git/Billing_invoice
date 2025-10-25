import express from 'express'
import { changepassword, forgotpassword, login, resetpassword, Signup } from '../controllers/user.controllers.js';

const router=express.Router();

router.post("/signup", Signup)
router.post("/login", login)
router.post("/forgot-password", forgotpassword)
router.post("/reset-password/:token", resetpassword)
router.post("/change-password", changepassword)
export default router;