const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const InventoryItem = require('./InventoryItem');
const Batch = require('./Batch');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  notification_type: {
    type: DataTypes.ENUM('LOW_STOCK', 'EXPIRED'),
    allowNull: false
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
  quantity_left: {
    type: DataTypes.INTEGER
  },
  expiry_date: {
    type: DataTypes.DATE
  },
  seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'notifications',
  timestamps: false,
  indexes: [
    {
      unique: false,
      fields: ['notification_type'] // Index for filtering by notification type
    },
    {
      unique: false,
      fields: ['inventory_item_id'] // Index for joins and lookups on inventory_item_id
    },
    {
      unique: false,
      fields: ['batch_id'] // Index for joins and lookups on batch_id
    },
    {
      unique: false,
      fields: ['expiry_date'] // Index for querying by expiry date
    },
    {
      unique: false,
      fields: ['seen'] // Index for filtering by unseen notifications
    },
    {
      unique: false,
      fields: ['created_at'] // Index for sorting/filtering by creation time
    }
  ]
});

Notification.belongsTo(InventoryItem, { foreignKey: 'inventory_item_id' });
Notification.belongsTo(Batch, { foreignKey: 'batch_id' });

module.exports = Notification;
