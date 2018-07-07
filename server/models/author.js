const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    gender: String,
    country: String
});

module.exports = mongoose.model('Author', authorSchema);