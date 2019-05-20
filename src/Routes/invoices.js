const idPolicy = require('../Middleware/IdRequire.js')
const AuthorizationBuilder = require('../Middleware/Authorization/ConditionalAuthorizationBuilder')
const RolesENUM = require('../Middleware/Authorization/Roles')
const RoleBuilder = require('../Middleware/Authorization/AuthorizeRole')

const express = require('express')
const router = express.Router()

const invoiceController = require('../Controllers/InvoiceController')
const invoicePolicy = require('../Middleware/policies/InvoicePolicy')
const invoiceBelonging = require('../Middleware/Authorization/Belonging/Invoice')
const isUser = new AuthorizationBuilder()
  .start(RoleBuilder.requireRole(RolesENUM.Manager))
  .build()

const isManager = new AuthorizationBuilder()
  .start(RoleBuilder.requireRole(RolesENUM.Manager))
  .build()

const belongsToUserOrIsManager = new AuthorizationBuilder()
  .start(RoleBuilder.requireRole(RolesENUM.User))
  .and(invoiceBelonging.isBelongingToUser)
  .or(RoleBuilder.requireRole(RolesENUM.Manager))
  .build()

router.post('/invoice',
  invoicePolicy.create,
  isUser,
  invoiceController.create)

router.post('/invoice/pay',
  idPolicy.requireIdInBody,
  invoiceController.markAsPaid)

router.get('/invoice/all',
  isManager,
  invoiceController.getAll)

router.get('/invoice',
  idPolicy.requireIdInBody,
  belongsToUserOrIsManager,
  invoiceController.getOne)

router.delete('/invoice',
  idPolicy.requireIdInBody,
  isManager,
  invoiceController.delete)

module.exports = router
