const knex = require('../databases/knex')
const fieldValidator = require('../utils/FieldValidator')

exports.create = async (req, res) => {
  try {
    const course = req.body

    const invalidFields = fieldValidator(course, ['title', 'description'])

    if (invalidFields.length) {
      return res.status(400).send({
        status: 'invalid request',
        invalidFields
      })
    }

    const [courseCreatedId] = await knex.insert(course).into('courses')

    const [courseCreated] = await knex
      .select('*')
      .from('courses')
      .where({ id: courseCreatedId })

    return res.status(200).send({
      status: 'success',
      data: courseCreated
    })
  } catch (e) {
    return res.status(500).send({ error: e.message || e })
  }
}

exports.find = async (req, res) => {
  try {
    const courses = await knex.select('*').from('courses')

    return res.status(200).send(courses)
  } catch (e) {
    return res.status(500).send({ error: e.message || e })
  }
}

exports.findById = async (req, res) => {
  try {
    const id = req.params.id

    const course = await knex
    .select('*')
    .from('courses')
    .where({ id })
    .first()

    if (!course) {
      return res.status(404).send({
        status: `curso com o id ${id} não foi encontrado`
      })
    }

    const lessons = await knex
    .select('*')
    .from('lessons')
    .where({courseId: id})




    return res.status(200).send({
      ...course, 
         lessons,
    })
  } catch (e) {
    return res.status(500).send({ error: e.message || e })
  }
}
