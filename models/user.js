const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: "Please enter a First Name"
    },
    lastName: {
        type: String,
        trim: true,
        required: "Please enter a Last Name"
    },
    username: {
        type: String,
        trim: true,
        required: "Username is Required"
    },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [
            function(input) {
                return input.length >= 6;
            },
            "Password must be at least 6 characters long."
        ]
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    userCreated: { type: Date, default: Date.now },
    lastUpdated: Date,
    fullName: String,

    articles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Article"
        }
    ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;