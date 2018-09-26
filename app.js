const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const config = require('./config/database')
const passport = require('passport')
const fs = require('fs')

mongoose.connect(config.database, { useNewUrlParser: true })
let db = mongoose.connection

db.once('open', () => {
    console.log('Connected to mongodb')
})

// Check for DB errors
db.on('error', (err) => {
    console.log("mongodb error, yo: "+err)
})

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Set /public folder
app.use(express.static(path.join(__dirname, 'public')))

// Express Session Middleware
app.use(session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
  }))

 // Express Messages Middleware
app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
})

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        }
    }
}))

// Passport config
require('./config/passport')(passport)
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
    res.locals.user = req.user || null
    next()
})

// Bring in models
let Articles = require('./models/article')

// Load view engine
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials',
    layoutDir: __dirname + '/views/layouts'
}))

app.set('view engine', 'handlebars')

// Home Route
app.get('/', (req, res) => {
    Articles.find({}, (err, articles) => {
        if(err) {
            console.log(err)
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            })
        }
    })  
})

app.get('/cv', (req, res) => {
    let cv = './public/JohnCrokerCV.pdf'
    fs.readFile(cv, (err, data) => {
        res.contentType('application/pdf')
        res.send(data)
    })
})

// Route file
let articles = require('./routes/articles')
let users = require('./routes/users')
app.use('/articles', articles)
app.use('/users', users)

// Start server
app.listen('80', () => {
    console.log('Server started on port 80')
})