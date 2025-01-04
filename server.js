import express from 'express'
import dotenv from 'dotenv'
import './models/db.js'
dotenv.config();

const app=express()
const port=process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.send("ok1");
})

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
})