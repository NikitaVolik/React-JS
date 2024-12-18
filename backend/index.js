const PORT = 9001
const URLDB = 'mongodb://127.0.0.1:27017'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') // Импортируем bcrypt
const { secret } = require('./config')
const User = require('./models/User')
const Product = require('./models/Product')

const app = express()

app.use(cors())
app.use(express.json())

const generateAccessToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, secret, { expiresIn: '24h' })
}

// Регистрация пользователя
app.post('/registration', async (req, res) => {
    console.log(req.body)
    const { login, password, email } = req.body

    // Проверяем, существует ли уже пользователь с таким login
    const existingUser = await User.findOne({ login })
    if (existingUser) {
        return res.status(400).json({ message: 'Пользователь с таким аккаунтом уже существует!' })
    }

    // Хэшируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(password, 10)

    // Создаём нового пользователя с хэшированным паролем
    const user = new User({ login, password: hashedPassword, email })
    
    // Сохраняем пользователя в базе данных
    await user.save()

    res.json({ message: 'Вы успешно зарегистрировались!' })
})

// Логин пользователя
app.post('/login', async (req, res) => {
    console.log(req.body)
    const { login, password } = req.body
    const user = await User.findOne({ login })

    if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден!' })
    }

    // Сравниваем введённый пароль с хэшем из базы данных
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({
            message: 'Неверный логин или пароль!'
        })
    }

    const token = generateAccessToken(user._id)
    res.json({
        message: 'Вы успешно авторизовались!',
        token: token
    })
})

// Получение продуктов
app.get('/products', async (req, res) => {
    const products = await Product.find()
    res.json({ data: products })
})

// Загрузка товара
app.post('/loading', async (req, res) => {
    console.log(req.body)
    const { header, price, image } = req.body
    const product = new Product({ header, price, image })
    await product.save()
    res.json({ data: product })
})

// Оплата
app.post('/payment', async (req, res) => {
    console.log(req.body)
    const { number, code, month, year } = req.body
    let bankCardRe = /^\d\d\d\d \d\d\d\d \d\d\d\d \d\d\d\d$/i
    let bankCodeRe = /^[a-zA-Z]{3}$/

    if (!bankCardRe.test(number)) {
        return res.status(400).json({ message: 'Неверный номер!' })
    }
    if (!bankCodeRe.test(code)) {
        return res.status(400).json({ message: 'Неверный код!' })
    }
    res.json({ message: 'Вы успешно оплатили заказ!' })
})

// Изменение пароля
app.post('/private', async (req, res) => {
    console.log(req.body)
    const { login, password, newPassword } = req.body

    const user = await User.findOne({ login })
    if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден!' })
    }

    // Проверяем старый пароль
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Неверный логин или пароль!' })
    }

    // Хэшируем новый пароль и сохраняем его
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedNewPassword
    await user.save()

    res.json({ message: 'Вы успешно изменили пароль!' })
})

const start = async () => {
    try {
        await mongoose.connect(URLDB, { authSource: "admin" })
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`))
    } catch (error) {
        console.log(error)
    }
}

start()
