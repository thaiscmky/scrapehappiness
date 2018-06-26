const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title:  { type: String, required: true, unique: true},
    image:  String,
    byline: { type: String, required: true},
    link:   { type: String, required: true},
    saved:  { type: Boolean, default: false},
    comments: [
        { type: Schema.Types.ObjectId, ref: "Comment"}
    ]
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
