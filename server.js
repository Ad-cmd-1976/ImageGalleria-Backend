import express from 'express'
import Authroute from './routes/Auth.js'
import dotenv from 'dotenv'
import cors from 'cors'
import './models/db.js'
dotenv.config();

const app=express()
const port=process.env.PORT || 8080;


app.get('/',(req,res)=>{
    res.send("ok1");
})

app.use(express.json())
app.use(cors());
app.use('/auth',Authroute);

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
})