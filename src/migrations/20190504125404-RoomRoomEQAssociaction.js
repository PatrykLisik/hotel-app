'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
     */
    return queryInterface.addColumn('Rooms', 'RoomEquipmentsId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'RoomEquipments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.removeColumn('Rooms,', 'RoomEquipmentsId')
  }
}
