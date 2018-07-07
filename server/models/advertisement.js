const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisementSchema = new Schema({
    title: String,
    description: String,
    category: String,
    price: String,
    negotiable: Boolean,
    city: String,
    authorId: String
});

module.exports = mongoose.model('Advertisement', advertisementSchema);