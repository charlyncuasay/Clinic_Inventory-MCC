const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Inventory Item routes
router.post('/items', inventoryController.addInventoryItem);
router.get('/items', inventoryController.getAllInventoryItems);
router.get('/items/:id', inventoryController.getInventoryItemById);
router.put('/items/:id', inventoryController.updateInventoryItem);
router.delete('/items/:id', inventoryController.softDeleteInventoryItem);

// Batch routes
router.post('/batches', inventoryController.addBatch);

// Low stock and expiring items routes
router.get('/low-stock', inventoryController.getLowStockItems);
router.get('/expiring-batches', inventoryController.getExpiringBatches);

// Transaction routes
router.post('/transactions', inventoryController.recordTransaction);

// Notification routes
router.post('/notifications', inventoryController.createNotification);

// Category routes
router.post('/categories', inventoryController.addCategory);
router.get('/categories', inventoryController.getAllCategories);
router.get('/categories/:id', inventoryController.getCategoryById);
router.put('/categories/:id', inventoryController.updateCategory);
router.delete('/categories/:id', inventoryController.softDeleteCategory);

module.exports = router;

