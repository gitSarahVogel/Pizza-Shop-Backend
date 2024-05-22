const express=require("express")
const router=express.Router()
const productController=require("../controller/productController")
router.post("/",productController.createNewProduct)
router.get("/",productController.getAllProduct)
router.put("/:id",productController.updateProduct)
router.get("/:id",productController.getProductById)
router.delete("/:id",productController.deleteProduct)
module.exports=router