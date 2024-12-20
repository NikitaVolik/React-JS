const PORT = 9001
const URLDB = 'mongodb://127.0.0.1:27017'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { secret } = require('./config')
const User = require('./models/User')
const Product = require('./models/Product')

const app = express()

app.use(cors())
app.use(express.json())

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

app.post('/registration', async (req, res) => {
    console.log(req.body)
    const {login, password, email} = req.body
    const user = new User({login, password, email})

    await user.save()
    res.json({
        message: 'Вы успешно зарегистрировались!'
    })


})

app.post('/login', async (req, res) => {
    console.log(req.body)
    const {login, password} = req.body
    const user = await User.findOne({login})
    if (!user){
        return res.status(400).json({message: 'Пользователь не найден!'})
    }
    if (user.password !== password){
        return res.status(400).json({message: 'Неверный логин или пароль!'})
    }
    const token = generateAccessToken(user._id)
    res.json({
        message: 'Вы успешно авторизованы!',
        token: token
    })
})

app.get('/products', async (req, res) => {

    /*const products = [
        { id: 1, header: 'Товар 1', price: 120 },
        { id: 2, header: 'Товар 2', price: 3850 },
        { id: 3, header: 'Товар 3', price: 570 },
        { id: 4, header: 'Товар 4', price: 14360 },
        { id: 5, header: 'Товар 5', price: 98 },
        { id: 6, header: 'Товар 6', price: 734 },
        { id: 7, header: 'Товар 7', price: 198 },
        { id: 8, header: 'Товар 8', price: 334 }
    ]*/

    const products = await Product.find()

    res.json({
        data: products
    })
})

app.post('/loading', async (req, res) => {

    console.log(req.body)
    const {header, price, image} = req.body
    const product = new Product({header, price, image})
    await product.save()

    // const products = await Product.find()

    res.json({
        data: product
    })
})

app.post('/payment', async (req, res) => {
    console.log(req.body)
    const {number, code, month, year} = req.body
    console.log(number, code, month, year);
    let bankCardRe = /^\d\d\d\d \d\d\d\d \d\d\d\d \d\d\d\d$/i;
    let bankCodeRe = /^[a-zA-Z]{3}$/;
    if ( !bankCardRe.test(number) ) {
        return res.status(400).json({message: 'Неверный номер!'})
    }
    if ( !bankCodeRe.test(code) ) {
        return res.status(400).json({message: 'Неверный код!'})
    }
    res.json({
        message: 'Вы успешно оплатили заказ!'
    })
})

app.post('/private', async (req, res) => {
    console.log(req.body)
    const {login, password, email, newPassword} = req.body
    /* console.log(login, password, email, newPassword) */

    const user = await User.findOne({login})
    console.log('user', user);
    if (!user){
        return res.status(400).json({message: 'Пользователь не найден!'})
    }
    if (user.password !== password){
        return res.status(400).json({message: 'Неверный логин или пароль!'})
    }
    // console.log('user', user);
    user.password = newPassword;
    // console.log('new user', user);

    await user.save()

    res.json({
        message: 'Вы успешно изменили пароль!'
    })
})

const start = async () => {
    try {
        await mongoose.connect(URLDB, {authSource: "admin"})
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`))
    } catch (error) {
        console.log(error)
    }
}

start()