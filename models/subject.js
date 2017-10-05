'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subjects = sequelize.define('Subjects', {
    subject_name: DataTypes.STRING,
    TeacherId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // Subjects.hasMany(models.Teacher)
      }
    }
  });

  Subjects.associate = function (models) {
    Subjects.hasMany(models.Teacher)
    Subjects.belongsToMany(models.Student, {through: 'SubjectStudent'});
  };


  return Subjects;
};
