const express = require('express')

const routes = express.Router()

const IndexController = require('./controllers/IndexController')
const CoursesController = require('./controllers/CoursesController')
const InstructorsController = require('./controllers/InstructorsController')
const LessonsController = require('./controllers/LessonsController')

//rotas de indíce
routes.get('/', IndexController.index)

//rotas de cursos
routes.get('/courses', CoursesController.find)
routes.get('/courses/:id', CoursesController.findById)
routes.post('/courses', CoursesController.create)

//rotas de professores
routes.post('/instructors', InstructorsController.create)

//rotas de aulas
routes.get('/lessons/:id', LessonsController.findById)
routes.post('/lessons', LessonsController.create)

module.exports = routes

// lessons
// courses
// instructors
