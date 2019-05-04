'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Number: {
        type: Sequelize.INTEGER
      },
      Floor: {
        type: Sequelize.INTEGER
      },
      PeopleNumber: {
        type: Sequelize.INTEGER
      },
      Type: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.DECIMAL(10, 2)
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
    return queryInterface.dropTable('Rooms')
  }
}
