const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title:  { type: String, required: true},
    body:   { type: String, required: true},
    time:   { type: Date, default: Date.now },
    author: { type: String, default: 'Anonymous'}
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
