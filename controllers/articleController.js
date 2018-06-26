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
                const documents = [];
                post.each(function (i, element) {
                         const document = {};
                         document.title = $(element).find('.article-heading').find('a').text();
                         document.image = $(element).children('.article-photo').find('img').attr('data-lazy-src');
                         document.link = $(element).find('.article-heading').find('a').attr('href');
                         document.byline = $(element).find('.article-author').children('.author-name').text();
                         document.byline += ' - ' + $(element).find('.article-author').children('.publish-since').text();
                         if(typeof document.title !== 'undefined'){
                             documents.push(document);
                         }
                });
                return documents;
             })
            .then(documents => {

                const bulkUpdate = documents.map(document => {
                    return {
                        updateOne: {
                            filter: {title: document.title},
                            update: {$set: document},
                            upsert: true
                        }}
                });
                return bulkUpdate;
            })
            .then(batch => article.saveArticles(batch))
            .catch(function(err) {
                console.log(err.message);
            });
    },
    getArticles: function(){
        return article.model.find({})
            .then(dbArticles => dbArticles)
            .catch(err => err);
    },
    saveArticles: function(documents) {

        return article.model.bulkWrite(documents)
            .then(function (bulkResult) {
                const results = bulkResult.toJSON();
                console.log(results);
                return {updated: results.nInserted , newlyscraped: results.nUpserted};
            })
            .catch(function(err){
                if(err.code !== '11000')
                    return err;
            });
    }
};

module.exports = article;