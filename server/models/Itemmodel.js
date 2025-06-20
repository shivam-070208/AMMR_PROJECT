const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
    Name:{
        type:String
    },
    ItemType:{
        type:String
    },
    Description:{
        type:String
    },
    CoverImage:{
        type:String
    },
    AdditionalImage:{
        type:String
    }
})

module.exports = new mongoose.model('Itemmodel',ItemSchema);
