const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendBookingConfirmationEmail = async (booking) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: booking.user.email,
      subject: 'Booking Confirmation - Premium Travel Agency',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #0E6E72, #46C3E0); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f7f7f7; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .footer { text-align: center; padding: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmed!</h1>
            </div>
            <div class="content">
              <p>Dear ${booking.user.name},</p>
              <p>Thank you for booking with Premium Travel Agency. Your booking has been confirmed.</p>
              
              <div class="booking-details">
                <h2>Booking Details</h2>
                <div class="detail-row">
                  <strong>Booking ID:</strong>
                  <span>${booking.bookingId}</span>
                </div>
                <div class="detail-row">
                  <strong>Travel Type:</strong>
                  <span>${booking.travelType}</span>
                </div>
                <div class="detail-row">
                  <strong>Passengers:</strong>
                  <span>${booking.passengers}</span>
                </div>
                <div class="detail-row">
                  <strong>Total Amount:</strong>
                  <span>$${booking.totalAmount}</span>
                </div>
                ${booking.departureDate ? `
                <div class="detail-row">
                  <strong>Departure Date:</strong>
                  <span>${new Date(booking.departureDate).toLocaleDateString()}</span>
                </div>
                ` : ''}
              </div>
              
              <p>We look forward to providing you with an amazing travel experience!</p>
            </div>
            <div class="footer">
              <p>Premium Travel Agency</p>
              <p>For any queries, contact us at info@travelagency.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent to', booking.user.email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

exports.sendContactEmail = async ({ name, email, phone, message }) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact email sent');
  } catch (error) {
    console.error('Error sending contact email:', error);
  }
};

