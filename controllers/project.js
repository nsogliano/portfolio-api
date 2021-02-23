'use strict'

// Tenemos que cargar el modelo de proyectos para crear objetos Proyecto y laburar con eso
var Project = require('../models/project')
var fs = require('fs')
var path = require('path')

// Controladores
// Es una especie de clase con un objeto json que tiene métodos que puede utilizar.A
// Exportamos el json con module.exports

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy pagina home',
            color: 'azul'
        })

    },
    test: function(req, res){
        return res.status(200).send({
            message: 'Soy pagina test',
            color: 'verde'
        })
    },

    // Guardar proyecto
    saveProject: function(req, res){
        var project = new Project()
        // Seteamos propiedades del project:
        var params = req.body
        project.name = params.name
        project.description = params.description
        project.category = params.category
        project.year = params.year
        project.langs = params.langs
        project.image = null

        // Lo guardamos en la BD:
        project.save((err,projectStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar: ' + err})
            if(!projectStored) return res.status(404).send({message: 'Error 404 - No se ha podido guardar el proyecto'})

            // En caso de que todo este bien, mostramos el proyecto guardado.
            return res.status(200).send({project: projectStored})
        })
    },

    // Obtener proyecto por ID
    getProject: function(req, res){
        // Agarramos un proyecto que obtenemos por URL.
        var projectId = req.params.id
        
        // Método de busqueda en base de datos por ID.
        Project.findById(projectId, (err, project) => {
            // Si no pasan parametro por URL
            if(projectId == null) return res.status(404).send({message: 'El proyecto no existe, intenta con /<projectId>'})
            // Si hay algún error
            if(err) return res.status(500).send({message: 'Error al buscar el proyecto'})
            // Si no se encuentra el proyecto
            if(!project) return res.status(404).send({message: 'El proyecto no existe'})
            // Si todo sale OK
            return res.status(200).send({project})
        })
    },

    getProjects: function(req, res){
        // En el JSON podemos especificar un WHERE. Con el SORT -year pongo para que vaya decreciente en año. year es al reves.
        Project.find({}).sort('-year').exec((err, projects) => {
            if(err) return res.status(500).send({message: 'Error al listar proyectos.'})
            if(!projects) return res.status(404).send({message: 'No hay proyectos para mostrar.'})
            return res.status(200).send({projects})
        })
    },

    updateProject: function(req, res){
        var projectId = req.params.id
        var updatedProject = req.body

        // El new: true hace que nos muestre el último, no el primero.
        Project.findByIdAndUpdate(projectId, updatedProject, {new:true}, (err, projectUpdated) => {
            if(err) return res.status(500).send({message: 'Error al actualizar proyecto.'})
            if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto a actualizar.'})
            return res.status(200).send({project: projectUpdated})
        })

    },

    deleteProject: function(req, res){
        var projectId = req.params.id

        Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
            if(err) return res.status(500).send({message: 'Error al eliminar el proyecto.'})
            if(!projectDeleted) return res.status({message: 'No existe el proyecto a eliminar.'})
            return res.status(200).send({project: projectDeleted})
        })
    },

    uploadImage: function(req, res){
        var projectId = req.params.id
        var fileName = 'Imagen no subida.'
        
        if(req.files){
            var filePath = req.files.image.path
            var fileName = filePath.split("\\")[1];
            var fileExt = fileName.split('\.');
            var extension = fileExt[1].toLowerCase()

            if(extension == 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'gif'){
                if(req.files){  
                    Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
                        if(err) return res.status(500).send({message: 'Error al subir el archivo.'})
                        if(!projectUpdated) return res.status(404).send({message: 'No existe el proyecto para subir la imagen.'})
                        return res.status(200).send({project: projectUpdated})
                    })
                }
            } else {
                fs.unlink(filePath, (err) => { return res.status(200).send({message: 'Extension no válida.'})})
            }
        }else{
            return res.status(200).send({message: fileName})
        }
    },

    getImageFile: function(req, res){
        var file = req.params.image
        var pathFile = './uploads/'+file
        fs.stat(pathFile, (err, stats) => {
            if(stats){
                return res.sendFile(path.resolve(pathFile))
            }else{
                return res.status(200).send({message: 'No existe esa imagen.'})
            }
        })
    }
}

module.exports = controller