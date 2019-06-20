const Joi = require('joi')

const schema = Joi.object().keys({
  number: Joi.number().integer().positive(),
  floor: Joi.number().integer().positive(),
  peopleNumber: Joi.number().integer().positive(),
  type: Joi.string(),
  cost: Joi.number().positive().precision(2),
  roomArea: Joi.number().integer().positive().greater(10),
  roomEquipment: Joi.object().keys({
    bedNumber: Joi.number().positive().integer().min(1).required(),
    teapot: Joi.bool().required(),
    tv: Joi.bool().required(),
    balcony: Joi.bool().required(),
    fridge: Joi.bool().required(),
    freeBeverages: Joi.bool().required()
  })
})

module.exports = {
  create (req, res, next) {
    const {
      error
    } = Joi.validate(req.body, schema, { presence: 'required' })

    if (error) {
      res.status(400).send({
        error: error
      })
    } else {
      next()
    }
  },
  update (req, res, next) {
    const {
      error
    } = Joi.validate(req.body.update, schema)

    if (error) {
      res.status(400).send({
        error: error.details.message
      })
    } else {
      next()
    }
  }
}
