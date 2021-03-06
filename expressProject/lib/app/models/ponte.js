var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nome: {type: String},
    descricao: {type: String},
    bairro: {type: String},
    latitude: {type: Number},
    longitude: {type: Number}
},{collection: 'pontes'});

module.exports = mongoose.model('Ponte', schema);
