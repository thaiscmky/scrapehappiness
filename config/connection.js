const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/happyscrape");

module.exports = mongoose;