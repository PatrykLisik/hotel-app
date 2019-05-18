const config = require('../../config/config')
const jwt = require('jsonwebtoken')
const secret = config.authentication.secret

function getPayload (token) {
  // token  is like 'Bearer 131dada2314£3432...'
  const actualToken = token.split(' ')[1]
  return jwt.verify(actualToken, secret)
}

module.exports = class AuthorizationBuilder {
  constructor () {
    this.conditions = []
    this.startCondition = () => { return true }
  }
  start (condition) {
    this.startCondition = condition
    return this
  }
  or (condition) {
    this.conditions.push([condition, 'or'])
    return this
  }
  and (condition) {
    this.conditions.push([condition, 'and'])
    return this
  }

  build () {
    return (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' })
      }

      let payload = ''
      try {
        payload = getPayload(req.headers.authorization)
      } catch (err) {
        return res.status(403).send({
          error: err.message
        })
      }

      let result = this.startCondition(payload, req)

      for (let entry of this.conditions) {
        const condition = entry[0]
        const operator = entry[1]
        if (operator === 'or') {
          // eslint-disable-next-line no-undef
          result = result || condition(payload, req)
        } else {
          result = result && condition(payload, req)
        }
      }

      if (result) {
        return next()
      }
      return res.status(403).json({ error: 'Permission denied' })
    }
  }
}
