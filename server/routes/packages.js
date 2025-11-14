const express = require('express');
const Package = require('../models/Package');
const router = express.Router();

// Get all packages
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const query = { isActive: true };
    if (type) query.type = type;

    const packages = await Package.find(query).populate('destination');
    res.json({ success: true, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single package
router.get('/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id).populate('destination');
    if (!package) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    res.json({ success: true, data: package });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

