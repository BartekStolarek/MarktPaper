const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: String,
    voivodenship: String
});

module.exports = mongoose.model('City', citySchema);