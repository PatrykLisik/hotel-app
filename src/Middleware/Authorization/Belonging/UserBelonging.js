module.exports = {
  userUpdate (tokenPayload, req) {
    return tokenPayload.userJSON.id === req.body.id
  }
}
