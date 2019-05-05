'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      Value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      Payment_method: {
        type: Sequelize.STRING,
        allowNull: false
      },
      State: {
        type: Sequelize.ENUM,
        values: ['paid', 'not paid']
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
    return queryInterface.dropTable('Invoices')
  }
}
