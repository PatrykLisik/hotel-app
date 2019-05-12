const Joi = require('joi')

module.exports = {

  create (req, res, next) {
    const schema = Joi.object().keys(
      { reservationIds: Joi.array().items(Joi.number().integer().positive()).required() })
    const {
      error
    } = Joi.validate(req.body, schema)

    if (error) {
      res.status(400).send({
        error: 'You need to provide list of reservations id to crete invoice'
      })
    } else {
      next()
    }
  }
}
