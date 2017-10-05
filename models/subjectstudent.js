'use strict';
module.exports = function(sequelize, DataTypes) {
  var SubjectStudent = sequelize.define('SubjectStudent', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  SubjectStudent.associate = function (models) {
    SubjectStudent.belongsTo(models.Subjects)
    SubjectStudent.belongsTo(models.Student)
  };


  return SubjectStudent;
};
