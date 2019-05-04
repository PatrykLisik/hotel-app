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
      queryInterface.addColumn('Reservations', 'roomId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.addColumn('Reservations', 'clientId', {
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
      queryInterface.removeColumn('Reservations,', 'roomId'),
      queryInterface.removeColumn('Reservations,', 'clientId')
    ])
  }
}
