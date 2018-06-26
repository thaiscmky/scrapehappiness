const path = require('path');
const db = require(path.join(__basedir,'/models'));
const cheerio = require("cheerio");
const axios = require("axios");

function Controller(modelName) {
    this.model = db[modelName];
    this.scraper = cheerio;
    this.http = axios;
}

module.exports = Controller;
