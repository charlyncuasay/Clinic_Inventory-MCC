const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const InventoryItem = require('./InventoryItem');
const Batch = require('./Batch');
const User = require('./User');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  inventory_item_id: {
    type: DataTypes.INTEGER,
    references: {
      model: InventoryItem,
      key: 'id'
    }
  },
  batch_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Batch,
      key: 'id'
    }
  },
  transaction_type: {
    type: DataTypes.ENUM('ADD', 'REMOVE', 'UPDATE', 'DELETE'),
    allowNull: false
  },
  quantity_change: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  admin_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  remarks: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'transactions',
  timestamps: false,
  indexes: [
    {
      unique: false,
      fields: ['inventory_item_id'] // Regular index on inventory_item_id
    },
    {
      unique: false,
      fields: ['batch_id'] // Regular index on batch_id
    },
    {
      unique: false,
      fields: ['admin_id'] // Regular index on admin_id
    },
    {
      unique: false,
      fields: ['transaction_type'] // Regular index on transaction_type
    },
    {
      unique: false,
      fields: ['date'] // Index for querying by date
    }
  ]
});

Transaction.belongsTo(InventoryItem, { foreignKey: 'inventory_item_id' });
Transaction.belongsTo(Batch, { foreignKey: 'batch_id' });
Transaction.belongsTo(User, { foreignKey: 'admin_id' });

module.exports = Transaction;
