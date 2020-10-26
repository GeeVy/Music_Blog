const express      = require('express');
const { fchown }   = require('fs');
const Article      = require('./../models/article');
const slugify      = require('slugify');
const router       = express.Router();

router.get('/new', function(req, res){
     res.render("articles/new", { article: new Article() });
});


router.get('/:slug', async function(req, res){
    const article = await Article.findOne({ slug: req.params.slug });
    if(article ==  null) {
        res.redirect('/'); 
    } 
    res.render('articles/show', { article: article });
});


router.get('/edit/:id', async function(req, res){
    const article = await Article.findById(req.params.id);
    res.render('articles/new', { article : article })
})


router.delete('/:id', async function(req, res){
     await Article.findByIdAndDelete(req.params.id);
     res.redirect('/')
});
 

router.post('/', async function(req, res, next){
    req.article = new Article();
    next()
}, saveArticleAndredirect("new"));


router.put('/:id', async function(req, res, next){
    req.article = await Article.findById(req.params.id);
    next() 
}, saveArticleAndredirect("edit"));


function saveArticleAndredirect(path){
    return async (req, res)=>{
         let article = req.article
            article.title = req.body.title
            article.description = req.body.description
            article.markdown = req.body.markdown
        try{ 
           article = await article.save()
           res.redirect(`/articles/${ article.slug }`);
        }
        catch(error){
            console.log(error);
           res.render(`articles/${path}`, { article: article });
        }
     }
}

 
 module.exports = router;