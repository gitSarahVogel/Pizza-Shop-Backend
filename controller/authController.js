const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require('../modules/user')
const register = async (req, res) => {
    const { firstName, lastName, password, phone, email, adress, roles } = req.body
    if (!firstName || !lastName || !password || !email)
        return res.status(400).json({ masseage: 'all feilds are required' })
    const duplicateUser = await user.findOne({ password: password }).lean()
    if (duplicateUser)
        res.status(409).json({ massage: "duplicate user" })
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await user.create({ firstName, lastName, password: hashPassword, phone, email, adress, roles })
    if (!newUser)
        return res.status(400).json({ masseage: 'failed in a creating new user' })
    res.json({ massage: "user created" })
    console.log(newUser)
}
const login = async (req, res) => {
    const {firstName, lastName, password } = req.body
    if (!firstName || !lastName || !password)
        return res.status(400).json({ masseage: 'all feilds are required' })
    const lUser = await user.findOne({ lastName }).lean()
    if (!lUser)
        return res.status(401).json({ massage: "unathourized" })
    const match = await bcrypt.compare(password, lUser.password)
    if (!match)
        return res.status(401).json({ massage: "unathourized" })
    const userInfo = {
        _id: lUser._id,
        firstName: lUser.firstName,
        lastName: lUser.lastName,
        phone: lUser.phone,
        email: lUser.email,
        address: lUser.address,
        roles: lUser.roles
    }
    const token1 = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ token: token1 })
}
module.exports = { login, register }