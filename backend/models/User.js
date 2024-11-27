const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  } 
}, {
  tableName: 'users',
  timestamps: false,
  indexes: [
    {
      unique: false, // Not unique index
      fields: ['email'] // Index on the 'email' column
    },
    {
      unique: true, // Unique index
      fields: ['username', 'email'] // Composite unique index on 'username' and 'email'
    }
  ]
});

module.exports = User;

