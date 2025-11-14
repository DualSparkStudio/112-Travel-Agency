const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    name: String,
    email: String,
    phone: String,
    country: String,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
  },
  travelType: {
    type: String,
    enum: ['tour', 'flight', 'train', 'bus'],
    required: true,
  },
  departureDate: Date,
  returnDate: Date,
  passengers: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  payment: {
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
  },
  specialRequests: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);

