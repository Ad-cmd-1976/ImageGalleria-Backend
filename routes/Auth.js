import express from "express";

const router=express.Router();

router.post('/login',(req,res)=>{
    res.send('login Success');
})
router.post('/signup',(req,res)=>{
    res.send('signup success');
})

export default router;