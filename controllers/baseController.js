let path = require('path');
let db = require(path.join(__basedir,'/models'));

function Controller(modelName) {
    this.model = db[modelName];
}

module.exports = Controller;
