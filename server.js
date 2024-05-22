require("dotenv").config()
const express = require ("express")
const cors = require ("cors")
const corsOption = require("./config/corsOption")
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const PORT = process.env.PORT || 7000
const app = express()
connectDB()
//app.use(cors())
app.use(cors(corsOption))
app.use(express.json()) 
app.use(express.static("public"))
app.use("/api/user", require("./route/userRoute"))
app.use("/api/product",require("./route/productRoute"))
app.use("/api/auth",require("./route/authRoute"))
app.use("/api/cart",require("./route/cartRoute"))

app.get("/",(req,res)=>{
    res.send("this is homePage")
})
mongoose.connection.once('open',()=>{
console.log("connected to DB");
app.listen(PORT,()=>{
    console.log(`running on ${PORT}`)
})

mongoose.connection.on("error",err =>{
    console.log(err)
})
})