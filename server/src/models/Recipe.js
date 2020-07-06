const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    ingredients: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Recipe', schema);