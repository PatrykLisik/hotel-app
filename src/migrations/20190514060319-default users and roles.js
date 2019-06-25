'use strict'
const {
  User,
  UserRole
} = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await UserRole.bulkCreate([{
      name: 'Admin'
    },
    {
      name: 'User'
    },
    {
      name: 'Manager'
    }

    ], {})

    const adminRole = await UserRole.findOne({
      where: {
        name: 'Admin'
      }
    })
    const managerRole = await UserRole.findOne({
      where: {
        name: 'Manager'
      }
    })
    const userRole = await UserRole.findOne({
      where: {
        name: 'User'
      }
    })

    return User.bulkCreate([{
      firstName: 'user',
      lastName: 'user',
      email: 'user@user.com',
      password: 'user',
      roleId: userRole.id
    },
    {
      firstName: 'manager',
      lastName: 'manager',
      email: 'manager@manager.com',
      password: 'manager',
      roleId: managerRole.id
    },
    {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@admin.com',
      password: 'admin',
      roleId: adminRole.id
    }
    ], {
      validate: true,
      individualHooks: true
    })
  },
  down: async (queryInterface) => {
    /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
  }
}
