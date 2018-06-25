const path = require('path');
const articleController = path.join(__basedir, '/controllers/articleController');
const userController = path.join(__basedir, '/controllers/userController');

function Routes(express){

    if(express instanceof Routes) {
        this.router = express.Router();

        this.router.get('/', (req, res) => {
            res.render('index');
        });
    }
    else return new Routes(express);
}

module.exports = Routes;