const Controller = require('./baseController.js');
const parent = new Controller('Article');

let article = {
    model: parent.model,
    request: parent.http,
    scrapeArticles: function(url) {
        return this.request.get(url)
            .then(function (response) {
                const $ = parent.scraper.load(response.data);
                const post  = $('main').find('.article-card');
                post.each(function (i, element) {
                         const document = {};
                         document.title = $(element).find('.article-heading').find('a').text();
                         document.image = $(element).children('.article-photo').find('img').attr('data-lazy-src');
                         document.link = $(element).find('.article-heading').find('a').attr('href');
                         document.byline = $(element).find('.article-author').children('.author-name').text();
                         document.byline += ' - ' + $(element).find('.article-author').children('.publish-since').text();
                         if(typeof document.title !== 'undefined')
                            article.saveArticle(document);
                });

             })
            .catch(function(err) {
                console.log(err.message);
            });
    },
    getArticles: function(){
        return article.model.find({})
            .then(dbArticles => dbArticles)
            .catch(err => err);
    },
    saveArticle: function(document) {
        article.model.update({title: document.title}, {$set: document}, {upsert: true})
            .then(function (dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err){
                if(err.code !== '11000')
                    console.log(err);
            });
    }
};

module.exports = article;