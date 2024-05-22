const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
id:{
    type:String,
    unique:true,
    require:true
},
name:{
    type:String,
    require:true,
    trim:true
},
description:{
    type:String
},
price:{
    type:Number,
    require:true,
    min:0
},
isDairy:{
    type:Boolean,
    default:true
},
image:{
    type:String
}

},
{
timestamps:true
})
module.exports = mongoose.model('product',productSchema)