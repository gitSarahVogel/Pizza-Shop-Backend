const shoppingCart = require('../modules/shoppingCart')
const createNewCart = async (req,res)=>{
const { product} = req.body
if(!product)
    return res.status(400).json({message:'all feilds are required'})
const cart = await shoppingCart.create({user:req.user._id, product})
if(!cart)
    return res.status(400).json({message:'failed in creating a shopping cart'})
return res.status(200).json({message:'shopping cart created'})
}

const getCartById = async(req, res)=>{

    const cart = await shoppingCart.find({user :req.user._id}).populate("user",{firstName:1,lastName:1}).populate("product").exec()
    if(!cart)
        return res.status(400).json({message:"no products in cart"})
    res.json(cart)
}

const deleteProductFromCart = async(req, res)=>{
    const {id} = req.params
    const cart = await shoppingCart.findById(id).exec()
    if(!cart)
        return res.status(400).json({message:"product not found"})
    const result = await cart.deleteOne()
    const reply = "product deleted"
    res.json(reply)
}
    

module.exports = {createNewCart, getCartById, deleteProductFromCart}