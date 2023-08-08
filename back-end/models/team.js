const { Sequelize, DataTypes } = require('sequelize');

// Connect to the DB
const sequelize = new Sequelize('volleyball', 'root', 'password', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
  });

// Define the Team model
const Team = sequelize.define('Team', {
  // id field
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // name field
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // score field
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
});

module.exports = Team;

  
  
  