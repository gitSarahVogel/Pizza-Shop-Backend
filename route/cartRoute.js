const express = require('express')
const router = express.Router()
const cartController = require('../controller/shoppingCartController')
const verifyJWT = require('../middleware/verifyJWT')
router.use(verifyJWT)
router.post("/", cartController.createNewCart)
router.get("/", cartController.getCartById)
router.delete("/:id", cartController.deleteProductFromCart)

module.exports = router