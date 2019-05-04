const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object().keys({
      firstName: Joi.string().alphanum().min(3).max(25).required(),
      lastName: Joi.string().alphanum().min(3).max(25).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(128).required()
    })
    const {
      error
    } = Joi.validate(req.body, schema)

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
}
