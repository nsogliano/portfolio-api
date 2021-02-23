'use strict'

var mongoose = require('mongoose')
var app = require('./app')
var port = 3700

mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true,
                                                        useUnifiedTopology: true })
        .then(() => {
            console.log("¡Conexión a BD realizada con éxito!")
            // Creación del servidor
            app.listen(port, () => {
                console.log("¡Servidor corriendo correctamente en la URL: localhost:3700");
            })
        })
        .catch(err => console.log(err))