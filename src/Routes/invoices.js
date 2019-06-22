const idPolicy = require('../Middleware/IdRequire.js')
const AuthorizationBuilder = require('../Middleware/Authorization/ConditionalAuthorizationBuilder')
const RolesENUM = require('../Middleware/Authorization/Roles')
const RoleBuilder = require('../Middleware/Authorization/AuthorizeRole')

const express = require('express')
const router = express.Router()

const invoiceController = require('../Controllers/InvoiceController')
const invoicePolicy = require('../Middleware/policies/InvoicePolicy')
const invoiceBelonging = require('../Middleware/Authorization/Belonging/Invoice')
const isUserOrManager = new AuthorizationBuilder()
  .start(RoleBuilder.requireRole(RolesENUM.User))
  .or(RoleBuilder.requireRole(RolesENUM.Manager))
  .build()

const isManager = new AuthorizationBuilder()
  .start(RoleBuilder.requireRole(RolesENUM.Manager))
  .build()

const belongsToUserOrIsManager = new AuthorizationBuilder()
  .start(RoleBuilder.requireRole(RolesENUM.User))
  .and(invoiceBelonging.isBelongingToUser)
  .or(RoleBuilder.requireRole(RolesENUM.Manager))
  .build()

router.post('/',
  invoicePolicy.create,
  isUserOrManager,
  invoiceController.create)

router.post('/pay',
  idPolicy.requireIdInBody,
  invoiceController.markAsPaid)

router.get('/all',
  isManager,
  invoiceController.getAll)

router.get('/',
  idPolicy.requireIdInBody,
  belongsToUserOrIsManager,
  invoiceController.getOne)

router.get('/client',
  invoiceController.getInvoicesOfUser)

router.delete('/',
  idPolicy.requireIdInBody,
  isManager,
  invoiceController.delete)

module.exports = router
