'use strict';
const generate = require('../helpers/rang')
const hash = require('../helpers/hasher')
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
      hooks: {
        beforeCreate: (data) => {
          console.log(data)
        let secret = generate()
        let hashed = hash(data.dataValues.password, secret)
        data.password = hashed
        data.salt = secret
      }, 
        beforeBulkUpdate: (data) => {
          console.log(data, 'Ini masternya')
          console.log(data.attributes, 'pertama')
          let secret = generate()
          let hashed = hash(data.attributes.password, secret)
          console.log(secret, 'ini rahasianya')
          data.attributes.password = hashed
          data.attributes.salt = secret
          console.log(data.attributes, 'halo')
        }
      },
      individualHooks: true
    });
  return User;
};

