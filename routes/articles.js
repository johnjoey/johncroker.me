const express = require('express')
const router = express.Router()

// Bring in article model
let Article = require('../models/article')

// user model
let User = require('../models/user')

router.get('/add', ensureAuthenticated,  (req, res) => {
    res.render('add_article', {
        title: 'Add Article'
    })
})

// Add Article post route
router.post('/add', (req, res) => {
    req.checkBody('title', 'title is required').notEmpty()
    //req.checkBody('author', 'author is required').notEmpty()
    req.checkBody('body', 'body is required').notEmpty()

    let errors = req.validationErrors()

    if(errors) {
        res.render('add_article', {
            errors:errors
        })
    } else {
        let article = new Article()
        article.title = req.body.title;
        article.author = req.user._id;
        article.body = req.body.body;

        article.save((err) => {
            if(err) {
                console.log(err)
            } else {
                req.flash('success', 'Article added.')
                res.redirect('/')
            }
        })
    }
})

// edit submit
router.post('/edit/:id', (req, res) => {
    let article = {}
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}

    Article.update(query, article, (err) => {
        if(err) {
            console.log(err)
        } else {
            req.flash('success', 'Article updated.')
            res.redirect('/')
        }
    })
})

// delete article
router.delete('/:id', (req, res) => {

    if(!req.user._id) {
        res.status(500).send()
    } else {

        let query = {_id:req.params.id}

        Article.findById(query, (err, article) => {
            if(article.author != req.user._id) {
                res.status(500).send()
            } else {
                Article.remove(query, (err) => {
                    if(err) {
                        console.log(err)
                    }
                    res.send('Success')
                })
            }
        })
    }
})

// edit article
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if(article.author != req.user._id) {
            req.flash('danger', 'Not authorised')
            res.redirect('/')
        } else {
            res.render('edit_article', {
                title:'Edit Article',
                article: article
            })
        }
    })
})

// get single article
router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        User.findById(article.author, (err, user) => {
            res.render('article', {
                article: article,
                author: user.name
            })
        })
    })
})

// access control
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    } else {
        req.flash('danger', 'Please login')
        res.redirect('/users/login')
    }
}

module.exports = router