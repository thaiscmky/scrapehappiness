const path = require('path');
const articleController = require(path.join(__basedir, '/controllers/articleController'));
const userController = require(path.join(__basedir, '/controllers/userController'));
const commentController = require(path.join(__basedir, '/controllers/commentController'));
let msg = {};

function Routes(express){

    this.router = express.Router();
    this.router.get('/', (req, res) => {
        articleController.getArticles().then(articles => {
            res.render('index', Object.assign(msg, {articles: articles, title: 'Articles'}));
        })
        .catch(err => {
            msg.error = err.message;
            res.redirect('/');
        });
    });

    this.router.get('/saved', (req, res) => {
        articleController.getSavedArticles().then(articles => {
            res.render('index', Object.assign(msg, {articles: articles, title: 'Saved Articles', bookmarks: true}));
        }).catch(err => {
                msg.error = err.message;
                res.redirect('/');
        });
    });

    this.router.get('/scrape', (req, res) => {
        resetMessages();
        const articles = articleController.scrapeArticles('https://www.lifehack.org/communication/motivation');
        articles.then( response => {
            msg.success = `${response.newlyscraped} new article(s) have been scraped`;
            if(response.updated)    msg.success += ', and ${response.updated} articles have been updated.';
            res.redirect('/');
        }).catch(err => {
            msg.error = err.message;
            res.redirect('/');
        });
    });

    this.router.post('/addcomment/:id', (req, res) => {
       resetMessages();
       const comment = commentController.saveComment(req.body);
       comment.then(comment => {
            return articleController.addComment(comment)
                .then(articles => articles)
                .catch(err => err);
       }).then( () => {
           res.redirect('/');
       }).catch(err => {
           msg.error = err.message;
           res.redirect('/');
       });;
    });

    this.router.get('/save/:id', (req, res) => {
        resetMessages();
        const article = articleController.bookmarkArticle(req.params.id);
        article.then( () => {
            msg.success = `Article ${req.params.id} saved`;
            res.redirect('/saved');
        }).catch(err => {
            msg.error = err.message;
            res.redirect('/');
        });;
    });
}

function resetMessages(){
    msg = {};
}

Routes.prototype.constructor = Routes;

Routes.prototype.getRouter = function() {
    return this.router;
};

module.exports = Routes;