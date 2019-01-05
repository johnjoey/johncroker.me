const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('index')  
})

app.get('/cv', (req, res) => {
    let cv = './public/JohnCrokerCV.pdf'
    fs.readFile(cv, (err, data) => {
        res.contentType('application/pdf')
        res.send(data)
    })
})

app.listen('80', () => {
    console.log('Server started on port 80')
})