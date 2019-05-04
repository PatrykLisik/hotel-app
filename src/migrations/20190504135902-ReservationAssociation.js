'use strict'
const Promise = require('bluebird')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
     */
    return Promise.all([
      queryInterface.addColumn('Reservations', 'RoomId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('Reservations', 'ClientId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return Promise.all([
      queryInterface.removeColumn('Reservations,', 'RoomId'),
      queryInterface.removeColumn('Reservations,', 'ClientId')
    ])
  }
}
