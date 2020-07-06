const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: false
    },
    recipes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Recipe'
    }]
});

module.exports = mongoose.model('RecipeList', schema);

