'use strict'

// Add two attributes: account and coverage.
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn('Users', 'account', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'coverage', {
        type: Sequelize.STRING,
        defaultValue: 'https://i.imgur.com/s2FQTRY.jpg'
      })
    ]);
  },

  down: async (queryInterface) => {
    await Promise.all([
      queryInterface.removeColumn('Users', 'account'),
      queryInterface.removeColumn('Users', 'coverage')
    ]);
  }
}
