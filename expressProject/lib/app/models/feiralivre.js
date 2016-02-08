var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    Nome: {type: String},
    Localizacao: {type: String},
    Dias: {type: String},
    Horario: {type: String},
    Observacao: {type: String},
    Latitude: {type: Number},
    Longitude: {type: Number}
}, {collection: 'feiraslivres'});

module.exports = mongoose.model('FeiraLivre', schema);
