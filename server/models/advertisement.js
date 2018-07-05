const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisementSchema = new Schema({
    title: String,
    description: String,
    price: String,
    negotiable: Boolean,
    photo: String
});

module.exports = mongoose.model('Advertisement', advertisementSchema);