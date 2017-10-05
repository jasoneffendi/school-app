'use strict';
module.exports = function(sequelize, DataTypes) {
  var Conjunction = sequelize.define('Conjunction', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // Conjunction.hasMany(models.Teacher)
      }
    }
  });
  // Conjunction.associate = function (models) {
  //   Conjunction.belongsTo(models.Subjects)
  //   Conjunction.belongsTo(models.Student)
  // };

  return Conjunction;
};
