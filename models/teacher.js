'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    SubjectId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // Teacher.belongsTo(models.Subject)
      }
    }
  });

  Teacher.associate = function (models) {
    Teacher.belongsTo(models.Subjects)
  };


  return Teacher;
};
