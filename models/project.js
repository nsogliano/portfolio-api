'use strict'

// Importamos Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definimos Schema
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
})

// Exportamos para poder importar y usar este Schema como modelo.
// Primer param: Nombre de la entidad (a la BD se pasa en minuscula y en plural)
// Segundo param: schema a seguir.
module.exports = mongoose.model('Project', ProjectSchema)