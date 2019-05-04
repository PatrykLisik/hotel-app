'use strict'
const {
  Users,
  Roles
} = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Roles', [{
      name: 'Admin',
      CanViewAllUsers: true,
      CanCRUDRooms: true,
      CanViewAllReservations: true,
      CanEditAllReservations: true
    },
    {
      name: 'User',
      CanViewAllUsers: false,
      CanCRUDRooms: false,
      CanViewAllReservations: false,
      CanEditAllReservations: false
    },
    {
      name: 'Manager',
      CanViewAllUsers: false,
      CanCRUDRooms: true,
      CanViewAllReservations: true,
      CanEditAllReservations: false
    }

    ], {})

    const adminRole = await Roles.findOne({
      where: {
        name: 'Admin'
      }
    })
    const managerRole = await Roles.findOne({
      where: {
        name: 'Manager'
      }
    })
    const userRole = await Roles.findOne({
      where: {
        name: 'User'
      }
    })

    return Users.bulkCreate([{
      first_name: 'user',
      last_name: 'user',
      email: 'user@user',
      password: 'user',
      roleId: userRole.id
    },
    {
      first_name: 'manager',
      last_name: 'manager',
      email: 'manager@manager',
      password: 'manager',
      roleId: managerRole.id
    },
    {
      first_name: 'admin',
      last_name: 'admin',
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
