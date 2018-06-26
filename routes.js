const path = require('path');
const articleController = path.join(__basedir, '/controllers/articleController');
const userController = path.join(__basedir, '/controllers/userController');
const commentController = path.join(__basedir, '/controllers/commentController');

function Routes(express){

    this.router = express.Router();
    this.router.get('/', (req, res) => {
        res.render('index');
    });
}

Routes.prototype.constructor = Routes;

Routes.prototype.getRouter = function() {
    return this.router;
};

module.exports = Routes;