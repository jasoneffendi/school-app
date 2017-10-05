'use strict';
const generate = require('../helpers/rang')
const hash = require('../helpers/hasher')
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
      hooks: {
        beforeCreate: (data) => {
          const secret = generate()
          const hashed = hash(data.password, secret)
          data.password = hashed
          data.salt = secret
      }
    }
  });
  return User;
};