const Joi = require('joi')

const schema = Joi.object().keys({
  id: Joi.number().integer().required().error(new Error('id is required and must be integer'))
}).unknown()

module.exports = {
  requireIdInBody (req, res, next) {
    const {
      error
    } = Joi.validate(req.body, schema)
    if (error) {
      console.log('id is ' + error)
      res.status(400).send({
        error: error.message
      })
    } else {
      next()
    }
  }
}
