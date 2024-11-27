const inventoryService = require('../services/inventoryService');

const inventoryController = {
  // Add a new inventory item
  async addInventoryItem(req, res) {
    try {
      const newItem = await inventoryService.addInventoryItem(req.body);
      res.status(201).json({ success: true, data: newItem });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Get all inventory items
  async getAllInventoryItems(req, res) {
    try {
      const items = await inventoryService.getAllInventoryItems();
      res.json({ success: true, data: items });
    } catch (error) {
      console.error('Error in getAllInventoryItems controller:', error);
      res.status(500).json({ 
        success: false, 
        error: 'An error occurred while fetching inventory items',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Get inventory item by ID
  async getInventoryItemById(req, res) {
    try {
      const item = await inventoryService.getInventoryItemById(req.params.id);
      if (item) {
        res.json({ success: true, data: item });
      } else {
        res.status(404).json({ success: false, error: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update inventory item
  async updateInventoryItem(req, res) {
    try {
      const updatedItem = await inventoryService.updateInventoryItem(req.params.id, req.body);
      if (updatedItem) {
        res.json({ success: true, data: updatedItem });
      } else {
        res.status(404).json({ success: false, error: 'Item not found' });
      }
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Soft delete inventory item
  async softDeleteInventoryItem(req, res) {
    try {
      const deletedItem = await inventoryService.softDeleteInventoryItem(req.params.id);
      if (deletedItem) {
        res.json({ success: true, message: 'Item soft deleted successfully' });
      } else {
        res.status(404).json({ success: false, error: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Add a new batch
  async addBatch(req, res) {
    try {
      const newBatch = await inventoryService.addBatch(req.body);
      res.status(201).json({ success: true, data: newBatch });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },


  // Get low stock items
  async getLowStockItems(req, res) {
    try {
      const lowStockItems = await inventoryService.getLowStockItems();
      res.json({ success: true, data: lowStockItems });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get expiring batches
  async getExpiringBatches(req, res) {
    try {
      const daysThreshold = parseInt(req.query.days) || 30; // Default to 30 days if not specified
      const expiringBatches = await inventoryService.getExpiringBatches(daysThreshold);
      res.json({ success: true, data: expiringBatches });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Record a transaction
  async recordTransaction(req, res) {
    try {
      const transaction = await inventoryService.recordTransaction(req.body);
      res.status(201).json({ success: true, data: transaction });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Create a notification
  async createNotification(req, res) {
    try {
      const notification = await inventoryService.createNotification(req.body);
      res.status(201).json({ success: true, data: notification });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Add a new category
  async addCategory(req, res) {
    try {
      const newCategory = await inventoryService.addCategory(req.body);
      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Get all categories
  async getAllCategories(req, res) {
    try {
      const categories = await inventoryService.getAllCategories();
      res.json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Get category by ID
  async getCategoryById(req, res) {
    try {
      const category = await inventoryService.getCategoryById(req.params.id);
      if (category) {
        res.json({ success: true, data: category });
      } else {
        res.status(404).json({ success: false, error: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // Update a category
  async updateCategory(req, res) {
    try {
      const updatedCategory = await inventoryService.updateCategory(req.params.id, req.body);
      if (updatedCategory) {
        res.json({ success: true, data: updatedCategory });
      } else {
        res.status(404).json({ success: false, error: 'Category not found' });
      }
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  // Soft delete category
  async softDeleteCategory(req, res) {
    try {
      const deletedCategory = await inventoryService.softDeleteCategory(req.params.id);
      if (deletedCategory) {
        res.json({ success: true, message: 'Category soft deleted successfully' });
      } else {
        res.status(404).json({ success: false, error: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = inventoryController;
