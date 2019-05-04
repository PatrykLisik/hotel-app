'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserRoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      CanViewAllUsers: {
        type: Sequelize.BOOLEAN
      },
      CanCRUDRooms: {
        type: Sequelize.BOOLEAN
      },
      CanViewAllReservations: {
        type: Sequelize.BOOLEAN
      },
      CanEditAllReservations: {
        type: Sequelize.BOOLEAN
      },
      CanAddRoles: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserRoles')
  }
}
