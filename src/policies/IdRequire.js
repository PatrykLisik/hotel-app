const Joi = require('joi')

const schema = Joi.object().keys({
  id: Joi.number().integer().required()
})

module.exports = {
  requireIdInBody (req, res, next) {
    const {
      error
    } = Joi.validate(req.body, schema)
    if (error) {
      res.status(400).send({
        error: 'id is required and must be integer'
      })
    } else {
      next()
    }
  }
}
