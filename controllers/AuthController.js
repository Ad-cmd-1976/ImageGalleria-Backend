import UserModel from "../models/UserSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const signup=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(400).json({message:'User Already Exists',success:false});
        }
        const newuser=new UserModel({name,email,password});
        newuser.password=await bcrypt.hash(password,10);
        await newuser.save();
        res.status(201).json({message:'Signup Successfull',success:true});
    }catch(err){
        return res.status(500).json({message:'Internal Server Error',success:false});
    }
}
const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email});
        const errMsg='Authentication failed wrong email or password';
        if(!user){
            return res.status(403).json({message:errMsg,success:false});
        }
        const ispassEqual=await bcrypt.compare(password,user.password);
        if(!ispassEqual){
            return res.status(403).json({message:errMsg,success:false});
        }
        const jwtToken=jwt.sign({email:user.email,_id:user.id},process.env.JWT_SECRET,{expiresIn:'24h'});
        res.status(200).json({
            message:'Login Successfull',
            name:user.name,
            email,
            jwtToken,
            success:true
        })
    }catch(err){
        return res.status(500).json({message:'Internal Server Error',success:false})
    }
}
export {signup,login};