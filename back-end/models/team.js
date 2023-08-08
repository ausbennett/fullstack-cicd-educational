const { Sequelize, DataTypes } = require('sequelize');

// Connect to the DB
const sequelize = new Sequelize('volleyball', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  retry: {
      max: 10, // Maximum amount of times to retry connecting
      timeout: 5000, // Throw if no response or error within milliseconds
      match: [
          // Retry for any of these error codes
          Sequelize.ConnectionError,
          Sequelize.ConnectionRefusedError,
          Sequelize.TimeoutError
      ]
  }
});

// Test the connection
function connectWithRetry() {
  sequelize.authenticate()
      .then(() => {
          console.log('Database connection has been established successfully.');
      })
      .catch(err => {
          console.error('Unable to connect to the database:', err);
          setTimeout(connectWithRetry, 5000);
      });
}

// Initial connection attempt
connectWithRetry();

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

  
  
  