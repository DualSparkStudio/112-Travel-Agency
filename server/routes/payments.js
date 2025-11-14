const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking');
const Package = require('../models/Package');
const { sendBookingConfirmationEmail } = require('../utils/email');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret',
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', bookingData } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      data: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify payment
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body;

    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret')
      .update(text)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    // Calculate total amount
    let totalAmount = 2499; // Default price
    if (bookingData.packageId) {
      const packageData = await Package.findById(bookingData.packageId);
      if (packageData) {
        totalAmount = packageData.price * bookingData.passengers;
      }
    }

    // Create booking
    const bookingId = `BK${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const booking = new Booking({
      bookingId,
      user: {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        country: bookingData.country,
      },
      package: bookingData.packageId || null,
      travelType: bookingData.travelType,
      departureDate: bookingData.departureDate,
      returnDate: bookingData.returnDate,
      passengers: bookingData.passengers,
      totalAmount,
      payment: {
        status: 'completed',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      specialRequests: bookingData.specialRequests,
      status: 'confirmed',
    });

    await booking.save();

    // Send confirmation email
    await sendBookingConfirmationEmail(booking);

    res.json({
      success: true,
      message: 'Payment verified and booking confirmed',
      bookingId: booking.bookingId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

