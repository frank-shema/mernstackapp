const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const app = express()
const cookieParser = require('cookie-parser')
app.use(express.static('public'))

// app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
const { requireAuth, checkUser } = require('./middleware/middleware')
const dbUrl = 'mongodb://127.0.0.1:27017/authrev'
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3800, (err) => {
    if(err) throw err
    console.log('App Running on port 3800..');
})).catch((err) => console.log(err))

// routes

app.get('*', checkUser)


app.get('/', (req, res) => {
    res.render('home')
})
app.get('/smoothies', requireAuth, (req, res) => {
    res.render('smoothies')
    
})


app.use(authRoutes)


