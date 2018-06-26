const mongoose = require("mongoose");
mongoose.Promise = Promise;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/happyscrape";
mongoose.connect(MONGODB_URI);

module.exports = mongoose;