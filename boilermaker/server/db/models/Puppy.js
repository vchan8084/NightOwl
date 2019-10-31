const crypto = require('crypto');
const _ = require('lodash');
const Sequelize = require('sequelize');
const db = require('../db');

const Puppy = db.define(
  'puppy',
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    salt: {
      type: Sequelize.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword,
    },
  }
);

// instance methods
Puppy.prototype.correctPassword = function(candidatePassword) {
  return (
    this.Model.encryptPassword(candidatePassword, this.salt) === this.password
  );
};

//makes sure you don't send any more information than needed down to the client
Puppy.prototype.sanitize = function() {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
Puppy.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

//creates the gibberish password
Puppy.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

function setSaltAndPassword(puppy) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (puppy.changed('password')) {
    puppy.salt = Puppy.generateSalt();
    //sets the gibberish as the user's password
    puppy.password = Puppy.encryptPassword(puppy.password, Puppy.salt);
  }
}

module.exports = Puppy;
