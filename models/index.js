const path = require("path");
const connection = require(path.join(__basedir, "/config/connection"));

module.exports = {
    User: require('./user'),
    Comment: require('./comment'),
    Article: require('./article')
};