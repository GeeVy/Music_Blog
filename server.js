const express           = require('express');
const bodyParser        = require('body-parser');
const mongoose          = require('mongoose');
const Article           = require('./models/article')
const articleRouter     = require('./routes/articles');
const methodOverride    = require('method-override')
const app = express();


mongoose.connect('mongodb://localhost:/blogs',{ 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
 })


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async function(req, res){ 
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles}) 
}) 


app.use('/articles', articleRouter) 


app.listen(5000)