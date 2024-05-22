const express=require("express")
const router=express.Router()
const userController=require("../controller/userController")

router.post("/",userController.createNewUser)
router.get("/",userController.getAllUsers)
router.put("/",userController.updateUser)
router.get("/:",userController.getUserById)
router.delete("/:id",userController.deleteUser)

module.exports=router