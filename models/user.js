const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const sequelize = require('../utility/database');
const jwt = require('jsonwebtoken');
const secretKey = 'virag';



const User = sequelize.define('user', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      email: Sequelize.STRING,
      password: Sequelize.STRING
});


module.exports = User;
