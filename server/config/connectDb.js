const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

 const Connectdb = async ()=>{
try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:", conn.connection.host);
}catch(err){
    console.log('err',err.message);
}
}

module.exports = Connectdb;