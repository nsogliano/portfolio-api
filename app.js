'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var app = express();

// Cargamos archivos de rutas
var project_routes = require('./routes/project')

// Middlewares (se ejecuta en el medio de que se recibe algo y se vuelve a enviar, por ejemplo la transformación a JSON.)
app.use(bodyParser.urlencoded({extended: false})) // Configuracion necesaria
app.use(bodyParser.json()) // Cualquier petición se convierte a JSON.

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas (las cargamos sobre app)
// Le ponemos antes /api, quedando localhost/api/test y le asignamos el archivo de rutas.
app.use('/api', project_routes)

// Export
module.exports = app;























/* COSAS QUE ESTABAN Y LAS BORRE

// Rutas (envío de datos a localhost:3700/test)
app.post('/test/:id', (req, res) => {
    console.log(req.body.nombre) // Leo el key 'nombre' enviado en el body del POST request.
    console.log(req.query.puto)  // Leo el parametro 'puto' de la URL del POST.
    console.log(req.params.id)
    res.status(200).send({
        message: "Se han enviado los datos."
    })
})

Ejemplo POST: http://localhost:3700/test/22?puto=xd
Body: {nombre: Nicolas, apellido: Sogliano}
Devuelve: Nicolas - xd - 22

app.get('/inicio', (req, res) => {
    res.status(200).send("<h1>Que te pasa puto</h1>")
})
*/