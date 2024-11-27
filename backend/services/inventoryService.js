const InventoryItem = require('../models/InventoryItem');
const Category = require('../models/Category');
const Batch = require('../models/Batch');
const Transaction = require('../models/Transaction');
const Notification = require('../models/Notification');
const { Op, sequelize } = require('sequelize');

const inventoryService = {
  // Add a new inventory item
  async addInventoryItem(itemData) {
    return await InventoryItem.create(itemData);
  },

  // Get all inventory items
  async getAllInventoryItems() {
    try {
      return await InventoryItem.findAll({
        attributes: ['id', 'name', 'category_id', 'description', 'quantity_in_stock', 'min_stock_level', 'unit_price'],
        include: [{
          model: Batch,
          as: 'batches', // Make sure this alias matches the one in your InventoryItem model
          attributes: ['id', 'batch_number', 'quantity', 'expiry_date', 'supplier', 'received_date'],
          where: { is_active: true },
          required: false
        }],
        where: { is_active: true }
      });
    } catch (error) {
      console.error('Error in getAllInventoryItems:', error);
      throw error;
    }
  },

  // Get inventory item by ID
  async getInventoryItemById(id) {
    return await InventoryItem.findByPk(id, {
        include: [{ model: Batch, where: { is_active: true }, required: false }],
    });
  },

  // Update inventory item
  async updateInventoryItem(id, updateData) {
    const item = await InventoryItem.findByPk(id);
    if (item) {
      return await item.update(updateData);
    }
    return null;
  },

  // Soft delete inventory item
  async softDeleteInventoryItem(id) {
    const item = await InventoryItem.findByPk(id);
    if (item) {
      return await item.update({ is_active: false });
    }
    return null;
  },

  // Add a new batch
  async addBatch(batchData) {
    const batch = await Batch.create(batchData);
    await this.updateInventoryQuantity(batch.inventory_item_id);
    return batch;
  },

  
  // Update inventory quantity
  async updateInventoryQuantity(inventoryItemId) {
    const totalQuantity = await Batch.sum('quantity', {
      where: { inventory_item_id: inventoryItemId, is_active: true }
    });
    await InventoryItem.update(
      { quantity_in_stock: totalQuantity },
      { where: { id: inventoryItemId } }
    );
  },

  // Get low stock items
  async getLowStockItems() {
    return await InventoryItem.findAll({
      where: {
        quantity_in_stock: { [Op.lte]: sequelize.col('min_stock_level') },
        is_active: true
      }
    });
  },

  // Get expiring batches
  async getExpiringBatches(daysThreshold) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysThreshold);
    
    return await Batch.findAll({
      where: {
        expiry_date: { [Op.lte]: expiryDate },
        is_active: true
      },
      include: [
        { model: Batch, where: { is_active: true } },
        { model: InventoryItem }
      ]
    });
  },

  // Record a transaction
  async recordTransaction(transactionData) {
    return await Transaction.create(transactionData);
  },

  // Create a notification
  async createNotification(notificationData) {
    return await Notification.create(notificationData);
  },

  // Add a new category
  async addCategory(categoryData) {
    return await Category.create(categoryData);
  },

  // Get all categories
  async getAllCategories() {
    return await Category.findAll();
  },

  // Get category by ID
  async getCategoryById(id) {
    return await Category.findByPk(id);
  },

  // Update category
  async updateCategory(id, updateData) {
    const category = await Category.findByPk(id);
    if (category) {
      return await category.update(updateData);
    }
    return null;
  },

  // Soft delete category
  async softDeleteCategory(id) {
    const category = await Category.findByPk(id);
    if (category) {
      return await category.update({ is_active: false });
    }
    return null;
  }
};

module.exports = inventoryService;