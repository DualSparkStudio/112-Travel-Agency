const express = require('express');
const { adminAuth } = require('../middleware/auth');
const Package = require('../models/Package');
const Destination = require('../models/Destination');
const Booking = require('../models/Booking');
const router = express.Router();

// All admin routes require authentication
router.use(adminAuth);

// Packages
router.post('/packages', async (req, res) => {
  try {
    const package = new Package(req.body);
    await package.save();
    res.json({ success: true, data: package });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/packages/:id', async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: package });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/packages/:id', async (req, res) => {
  try {
    await Package.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Package deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Destinations
router.post('/destinations', async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/destinations/:id', async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/destinations/:id', async (req, res) => {
  try {
    await Destination.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Destination deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('package').sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

