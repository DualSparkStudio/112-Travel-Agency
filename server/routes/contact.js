const express = require('express');
const { sendContactEmail } = require('../utils/email');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await sendContactEmail({ name, email, phone, message });

    res.json({
      success: true,
      message: 'Your message has been sent successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

