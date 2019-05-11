const Joi = require('joi')

function errorDispatcher (error, res, next) {
  if (error) {
    switch (error.details[0].context.key) {
      case 'firstName':
        res.status(400).send({
          error: 'firstName must be alphanumeric string of length 3 to 25'
        })
        break
      case 'lastName':
        res.status(400).send({
          error: 'lastName must be alphanumeric string of length 3 to 25'
        })
        break
      case 'email':
        res.status(400).send({
          error: 'email must be valid'
        })
        break
      case 'password':
        res.status(400).send({
          error: 'password must contains 8  to 128 characters'
        })
        break
      default:
        res.status(400).send({
          error: 'invalid data'
        })
        break
    }
  } else {
    next()
  }
}

const schema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(25),
  lastName: Joi.string().alphanum().min(3).max(25),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(128)
})

module.exports = {
  register (req, res, next) {
    const {
      error
    } = Joi.validate(req.body, schema, { presence: 'required' })

    errorDispatcher(error, res, next)
  },

  update (req, res, next) {
    const {
      error
    } = Joi.validate(req.body.update, schema)

    errorDispatcher(error, res, next)
  }
}
