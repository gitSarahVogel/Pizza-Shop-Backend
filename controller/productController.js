const product= require('../modules/product')
const createNewProduct = async (req,res)=>{
    const {id,name,description,price, isDairy, image} = req.body
    if(!name || !price || !id)
        return res.status(400).json({masseage:'all feilds are required'})
    const newProduct = await product.create({id,name,description,price, isDairy, image})
    if(!newProduct){
        return res.status(400).json({masseage:'faild in creating new product'})
    }
    else{
       return res.status(201).json({masseage:'new product created'})
    }
}
const getAllProduct = async (req,res)=>{
    const products = await product.find().lean()
    if(!products?.length){
        return  res.status(400).json({masseage:'no products found'})}
    res.json(products)
}
const updateProduct = async (req,res)=>{
    const {id}=req.params 
    const uProduct = await product.findById(id).exec() 
    console.log(uProduct)
    if(!uProduct){
        return res.status(400).json({masseage:'product not found'}) 
    }
    
    else{
        const  {id,name,description,price, isDairy, image} = req.body
        uProduct.id = id
        uProduct.name = name
        uProduct.description = description
        uProduct.price = price
        uProduct.isDairy = isDairy
        uProduct.image = image
    }
    const updatedProduct  = await uProduct.save()
    res.json(updatedProduct)
}
const getProductById = async (req,res)=>{
    const {id} = req.params
    const getProduct  = await product.findById(id).lean()
    if(!getProduct){
        return res.status(400).json({masseage:'product not found'}) 
    }
    else
        res.json(getProduct)    
}
const deleteProduct = async(req,res)=>{
    const {id} =  req.params
    const dProduct = await product.findById(id).exec()
    if(!dProduct){
        return res.status(400).json({masseage:'product not found'}) 
    }
    const deletedProduct =await dProduct.deleteOne()
    const reply = `product ${deletedProduct.id}  ${deletedProduct.name} was deleted `
    res.json(reply)
}
module.exports={
createNewProduct,
getAllProduct,
getProductById,
deleteProduct,
updateProduct
}



