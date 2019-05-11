'use strict'
const {
  User,
  UserRole
} = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await UserRole.bulkCreate([{
      name: 'Admin',
      canViewAllUsers: true,
      canCRUDRooms: true,
      canViewAllReservations: true,
      canEditAllReservations: true,
      canAddRoles: true
    },
    {
      name: 'User',
      canViewAllUsers: false,
      canCRUDRooms: false,
      canViewAllReservations: false,
      canEditAllReservations: false,
      canAddRoles: false
    },
    {
      name: 'Manager',
      canViewAllUsers: false,
      canCRUDRooms: true,
      canViewAllReservations: true,
      canEditAllReservations: false,
      canAddRoles: false
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
      email: 'user@user',
      password: 'user',
      roleId: userRole.id
    },
    {
      firstName: 'manager',
      lastName: 'manager',
      email: 'manager@manager',
      password: 'manager',
      roleId: managerRole.id
    },
    {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@admin',
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
