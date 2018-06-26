const path = require('path');
const articleController = require(path.join(__basedir, '/controllers/articleController'));
const userController = require(path.join(__basedir, '/controllers/userController'));
const commentController = require(path.join(__basedir, '/controllers/commentController'));

function Routes(express){

    this.router = express.Router();
    this.router.get('/', (req, res) => {
        articleController.getArticles().then(articles => {
            res.render('index', {articles: articles});
        });
    });

    this.router.get('/scrape', (req, res) => {
        const articles = articleController.scrapeArticles('https://www.lifehack.org/communication/motivation');
        articles.then( response => {
            console.log(response);
            res.render('index');
        });
    });
}

Routes.prototype.constructor = Routes;

Routes.prototype.getRouter = function() {
    return this.router;
};

module.exports = Routes;