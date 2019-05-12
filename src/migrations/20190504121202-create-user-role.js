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
      canViewAllUsers: {
        type: Sequelize.BOOLEAN
      },
      canCRUDRooms: {
        type: Sequelize.BOOLEAN
      },
      canViewAllReservations: {
        type: Sequelize.BOOLEAN
      },
      canEditAllReservations: {
        type: Sequelize.BOOLEAN
      },
      canAddRoles: {
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
