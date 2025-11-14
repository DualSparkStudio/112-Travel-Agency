const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['tour', 'flight', 'train', 'bus'],
    required: true,
  },
  features: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
  }],
  images: [String],
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Package', packageSchema);

