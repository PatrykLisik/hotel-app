const Joi = require('joi')

const schema = Joi.object().keys({
  number: Joi.number().integer().positive(),
  floor: Joi.number().integer().positive(),
  peopleNumber: Joi.number().integer().positive(),
  type: Joi.string(),
  cost: Joi.number().positive().precision(2),
  roomArea: Joi.number().integer().positive().greater(10)
})

function errorDispatcher (error, res) {
  switch (error.details[0].context.key) {
    case 'number':
      return 'room number must be positive integer'
    case 'floor':
      return 'floor number must be positive integer'
    case 'peopleNumber':
      return 'people number in room must be positive integer'
    case 'type':
      return 'room type must be a string'
    case 'cost':
      return 'room per night cost must be positive float with precision of 2'
    case 'roomArea':
      return 'room area must be positive integer greater then 10'
  }
}

module.exports = {
  create (req, res, next) {
    const {
      error
    } = Joi.validate(req.body, schema, { presence: 'required' })

    if (error) {
      res.status(400).send({
        error: errorDispatcher(error)
      })
    } else {
      next()
    }
  },
  update (req, res, next) {
    const {
      error
    } = Joi.validate(req.body.update, schema, { presence: 'required' })

    if (error) {
      res.status(400).send({
        error: errorDispatcher(error)
      })
    } else {
      next()
    }
  }
}
