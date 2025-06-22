const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const Connectdb = require('./config/connectDb')
const streamUpload = require('./config/cloudinaryconfig');
const uploader = require('./config/multerconfig');
const Itemmodel = require('./models/Itemmodel');
const morgan = require('morgan')
const nodemailer = require('nodemailer')
const Allowedorigin = [
  "https://ammr-project-pb46.vercel.app",
   "http://localhost:5173"
]

//middlewares 
dotenv.config();
Connectdb()



app.use(cors({
    origin: 'https://ammr-project-pb46.vercel.app'
    
}))
app.use(morgan())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


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

app.post('/fetch',async (req,res)=>{
    try{
        const Items = await Itemmodel.find().sort({ createdAt: -1 });
        res.status(200).json({Items})
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message})
    }
})
app.post('/send-mail', async (req, res) => {
  try {
    const { current } = req.body;
    if (!current) {
      return res.status(400).json({ error: 'Missing current object!' });
    }

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.STATIC_TO_EMAIL,
      subject: `Enquiry about ${current.Name}`,
      text: `Enquiry Details:\n\nName: ${current.Name}\nType: ${current.ItemType}\nDescription: ${current.Description}`,
      html: `
        <h2>Enquiry Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${current.Name}</li>
          <li><strong>Type:</strong> ${current.ItemType}</li>
          <li><strong>Description:</strong> ${current.Description}</li>
        </ul>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (error) {
 
    res.status(500).json({ success: false, error: error.message });
  }
});
app.listen(process.env.PORT||3000)