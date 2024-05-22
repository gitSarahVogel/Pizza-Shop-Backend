const user = require('../modules/user')
const createNewUser = async (req,res)=>{
    const {firstName,lastName,password, phone, email,adress,roles} = req.body
    if(!firstName || !lastName || !password || !email)
        return res.status(400).json({masseage:'all feilds are required'})
    const newUser = await user.create({firstName,lastName,password, phone, email,adress,roles})
    if(!newUser){
        return res.status(400).json({masseage:'faild in creating new user'})
    }
    else{
       return  res.status(201).json({masseage:'new user created'})
    }
}
const getAllUsers = async (req,res)=>{
    const users = await user.find().lean()
    if(!users){
        return  res.status(400).json({masseage:'no users found'})}
    res.json(users)
    }
const updateUser = async (req,res)=>{
    const {firstName,lastName,password, phone, email,adress,roles} = req.body
    if(!password)
        return res.status(400).json({masseage:'password is required'})
    const uUser = await user.findById(password).exec() 
    if(!uUser){
        return res.status(400).json({masseage:'user not found'}) 
    }
    else{
        uUser.firstName = firstName
        uUser.lastName = lastName
        uUser.password = password
        uUser.phone = phone
        uUser.email = email
        uUser.address = adress
        uUser.roles = roles
    }
    const updatedUser = await uUser.save()
    res.json(updatedUser)
}
const getUserById = async (req,res)=>{
    const {id} = req.params
    const getUser = await user.findById(id).lean()
    if(!getUser)
        return res.status(400).json({masseage:'user not found'}) 
        res.json(getUser)    
}
const deleteUser = async(req,res)=>{
    const { password} =  req.params
    const dUser = await user.findById(password).exec()
    if(!dUser){
        return res.status(400).json({masseage:'user not found'}) 
    }
    const deletedUser =await dUser.deleteOne()
    const reply = `user ${deletedUser.firstName}  ${deletedUser.lastName} was deleted `
    res.json(reply)
}
module.exports={
createNewUser,
getAllUsers,
updateUser,
getUserById,
deleteUser
}



