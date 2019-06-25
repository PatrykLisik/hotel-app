const Joi = require('joi')

const schema = Joi.object().keys({
  id: Joi.number().integer().positive().optional(),
  number: Joi.number().integer().positive(),
  floor: Joi.number().integer().positive(),
  peopleNumber: Joi.number().integer().positive(),
  type: Joi.string(),
  cost: Joi.number().positive().precision(2),
  roomEquipmentsId: Joi.number().integer().positive().optional(),
  roomEquipment: Joi.object().keys({
    id: Joi.number().integer().positive().optional(),
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
        error: error.message
      })
    } else {
      next()
    }
  }
}
