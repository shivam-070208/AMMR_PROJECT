const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const Connectdb = require('./config/connectDb')
const streamUpload = require('./config/cloudinaryconfig');
const uploader = require('./config/multerconfig');
const Itemmodel = require('./models/Itemmodel');
const morgan = require('morgan')

const Allowedorigin = [
   "http://localhost:5173" 
]

//middlewares 
dotenv.config();
Connectdb()



// app.use(cors({
//     origin:(origin,cb)=>{
//         if(Allowedorigin.includes(origin)){
//             cb(null,true)
//         }else{
//             cb(new Error('request not allowed for this origin'),false);
//         }
//     },
//     allowedHeaders:['Content-Type']
    
// }))
app.use(morgan())
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//functions 


app.post('/add',uploader.array('Images',5),async (req,res)=>{
    const { Description, Name ,ItemType} = req.body
    try{
        const Images=[];
        for(const file of req.files){
            const result = await streamUpload(file.buffer);
            Images.push(result.secure_url);
        }
        const CoverImage = Images[0];
        const AdditionalImage = Images.filter((ite,i)=>i!==0);
        const Item = await Itemmodel.create({
            Description,Name,ItemType,CoverImage,AdditionalImage
        })
        res.status(200).json({Item})

    }catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
    
})

app.listen(process.env.PORT||3000)