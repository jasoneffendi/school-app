'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isUnique: function(value, next) {
          Student.find({
              where: {email: value},
              attributes: ['id']
          })
              .done(function(error, user) {
                  if (error)
                      return next(error);
                  if (user)
                      return next('Email address already in use!');
                  next();
              });
      }
      }
    },
    full_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Student.associate = function (models) {
    // Student.hasMany(models.Subjects)
    Student.belongsToMany(models.Subjects, {through: 'SubjectStudent'})
  };

  Student.prototype.get_full_name = function () {
    return this.first_name + ' ' + this.last_name
  }




  return Student;
};
