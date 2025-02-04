import express from "express";
import {signupValidation,loginValidation} from '../middleware/AuthValidate.js'
import {signup,login} from '../controllers/AuthController.js'
const router=express.Router();

router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup);

export default router;