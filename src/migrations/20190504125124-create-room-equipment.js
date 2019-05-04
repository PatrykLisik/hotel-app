'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RoomEquipments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BedNumber: {
        type: Sequelize.INTEGER
      },
      Teapot: {
        type: Sequelize.BOOLEAN
      },
      TV: {
        type: Sequelize.BOOLEAN
      },
      Balcony: {
        type: Sequelize.BOOLEAN
      },
      Fridge: {
        type: Sequelize.BOOLEAN
      },
      FreeBeverages: {
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
    return queryInterface.dropTable('RoomEquipments')
  }
}
