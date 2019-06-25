const Joi = require('joi')

const schema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(25).error(new Error('firstName must be alphanumeric string of length 3 to 25')),
  lastName: Joi.string().alphanum().min(3).max(25).error(new Error('lastName must be alphanumeric string of length 3 to 25')),
  email: Joi.string().email().error(new Error('email must be valid')),
  password: Joi.string().min(8).max(128).error(new Error('password must contains 8  to 128 characters'))
})

module.exports = {
  register (req, res, next) {
    const {
      error
    } = Joi.validate(req.body, schema, { presence: 'required' })

    if (error) {
      res.status(400).send({
        error: error.message
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
