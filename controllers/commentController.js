const Controller = require('./baseController.js');
const parent = new Controller('Comment');

const comment = {
    model: parent.model,
    request: parent.http,
    saveComment: function(newComment) {
        return comment.model.create(newComment)
            .then(function(dbComment) {
                return dbComment;
            }).catch(err => err);
    }
};

module.exports = comment;