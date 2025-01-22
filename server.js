import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import axios from 'axios'
import Authroute from './routes/Auth.js'
import './models/db.js'
const {parsed:config}=dotenv.config();

const app=express()
const port=process.env.PORT || 8080;
const BASE_URL=`https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}`
const auth={
    username:config.API_KEY,
    password:config.API_SECRET
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/auth',Authroute);

app.get('/',(req,res)=>{
    res.send("ok1");
})

app.get('/photos',async (req,res)=>{
    const response=await axios.get(BASE_URL+'/resources/image',{
        auth,
        params:{next_cursor:req.query.next_cursor}
    });
    res.send(response.data);
})

app.get('/search',async (req,res)=>{
    const response=await axios.get(BASE_URL+'/resources/search',{
        auth,
        params:{
            expression:req.query.expression
        }
    })
    res.send(response.data);
})

app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
})