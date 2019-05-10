const Joi = require('joi')

const schema = Joi.object().keys({
  id: Joi.number().integer().required()
})

function requireIdInJSON (req, res, next, json) {
  const {
    error
  } = Joi.validate(json, schema)
  if (error) {
    res.status(400).send({
      error: 'id is required and must be integer'
    })
  } else {
    next()
  }
}

module.exports = {
  requireIdInBody (req, res, next) {
    requireIdInJSON(req, res, next, req.body)
  },
  requireIdInUpdte (req, res, next) {
    requireIdInJSON(req, res, next, req.body.update)
  }
}
