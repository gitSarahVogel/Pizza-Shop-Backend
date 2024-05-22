const mongoose = require('mongoose')
const shopCartSchema = new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'user'
},
product:{
    type:mongoose.Schema.Types.ObjectId,
    require:true,
    ref:'product'
}
},
{
timestamps:true
})
module.exports = mongoose.model('shoppingCart',shopCartSchema)