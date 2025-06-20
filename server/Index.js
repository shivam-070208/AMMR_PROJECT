const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const Connectdb = require('./config/connectDb')
const cloudinary = require('cloudinary').v2;


const Allowedorigin = [
   "http://localhost:5173" 
]

//middlewares 
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APISECRET
})

dotenv.config();
Connectdb()

app.use(cors({
    origin:(origin,cb)=>{
        if(Allowedorigin.includes(origin)){
            cb(null,true)
        }else{
            cb(new Error('request not allowed for this origin'),false);
        }
    },
    allowedHeaders:['Content-Type']
    
}))
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.post('/add',(req,res)=>{

})

app.listen(process.env.PORT||3000)