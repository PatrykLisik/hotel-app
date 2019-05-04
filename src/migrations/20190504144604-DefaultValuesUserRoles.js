'use strict'
const {
  User,
  UserRole
} = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await UserRole.bulkCreate([{
      name: 'Admin',
      CanViewAllUsers: true,
      CanCRUDRooms: true,
      CanViewAllReservations: true,
      CanEditAllReservations: true,
      CanAddRoles: true
    },
    {
      name: 'User',
      CanViewAllUsers: false,
      CanCRUDRooms: false,
      CanViewAllReservations: false,
      CanEditAllReservations: false,
      CanAddRoles: false
    },
    {
      name: 'Manager',
      CanViewAllUsers: false,
      CanCRUDRooms: true,
      CanViewAllReservations: true,
      CanEditAllReservations: false,
      CanAddRoles: false
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
