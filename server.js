const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

app.get('/api/portfolio', (req, res) => {
    let portfolio = [
        {id: 1, name: 'Financial Services Expo', url: 'https://www.financialservicesexpo.co.uk/', date: '2018', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id: 2, name: 'Mortgage Sleep Out', url: 'http://www.mortgagesleepout.com/', date: '2018', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id: 3, name: 'Financial Reporter', url: 'https://www.financialreporter.co.uk/', date: '2018', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id: 4, name: '#FRWRA', url: 'https://frwra.co.uk/', date: '2018', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id: 5, name: 'Specialist Lending Roadshow', url: 'https://www.specialistlendingroadshow.co.uk/', date: '2018', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id: 6, name: 'Front Events', url: 'http://frontevents.co.uk/', date: '2018', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id: 7, name: 'FS Cup', url: 'http://fs-cup.co.uk/', date: '2018', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
        {id: 8, name: 'NMA Awards', url: 'http://nma-awards.co.uk/', date: '2018', description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    ]

    res.json(portfolio)  
})

app.get('/cv', (req, res) => {
    let cv = './public/JohnCrokerCV.pdf'
    fs.readFile(cv, (err, data) => {
        res.contentType('application/pdf')
        res.send(data)
    })
})

const port = 5000
app.listen(port, () => {console.log(`Server started on port ${port}`)})