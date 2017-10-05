'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Students', [{
      first_name: 'Heri',
      last_name: 'Suprapto',
      email: 'Herisuprapto@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      first_name: 'Mawar',
      last_name: 'Suprinda',
      email: 'Mawarsuprinda@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      first_name: 'Juli',
      last_name: 'Borhu',
      email: 'Juliborhu@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      first_name: 'Gino',
      last_name: 'Derus',
      email: 'Ginoderus@sekolah.id',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
