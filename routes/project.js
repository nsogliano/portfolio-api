'use strict'

// Rutas: UN FICHERO POR CONTROLADOR

// Las rutas se crean con EXPRESS
var express = require('express')

// Cargamos el controlador al que corresponde la ruta.
var ProjectController = require('../controllers/project')

// Creamos el router, le configuramos todas las rutas (apuntando a metodos del controlador) y lo exportamos.
var _router = express.Router();

// Middleware para Multiparty

var multipart = require('connect-multiparty')
var multipartMiddleware = multipart({uploadDir: './uploads'})

_router.get('/home', ProjectController.home)
_router.post('/test', ProjectController.test)
_router.post('/save-project', ProjectController.saveProject)
_router.get('/project/:id?', ProjectController.getProject)
_router.get('/projects', ProjectController.getProjects)
_router.put('/project/:id', ProjectController.updateProject)
_router.delete('/project/:id', ProjectController.deleteProject)
_router.get('/get-image/:image', ProjectController.getImageFile)

// Subida de imagenes
_router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage)

module.exports = _router