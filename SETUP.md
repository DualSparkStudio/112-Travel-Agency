# Setup Guide - Premium Travel Agency

## Prerequisites

- Node.js 18+ installed
- MongoDB installed and running (or MongoDB Atlas account)
- Razorpay account (for payments)
- Email account for SMTP (Gmail recommended)

## Step-by-Step Setup

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 3. Setup Environment Variables

#### Frontend (.env.local)
Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Backend (server/.env)
Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-agency
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@travelagency.com
```

### 4. Setup MongoDB

#### Local MongoDB:
```bash
# Start MongoDB service
mongod
```

#### MongoDB Atlas (Cloud):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in server/.env

### 5. Setup Razorpay

1. Sign up at https://razorpay.com
2. Go to Settings > API Keys
3. Generate test keys
4. Add Key ID and Key Secret to environment variables
5. For production, use live keys

### 6. Setup Email (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate App Password:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
3. Use this password in SMTP_PASS

### 7. Run the Application

#### Terminal 1 - Backend:
```bash
cd server
npm run dev
```

#### Terminal 2 - Frontend:
```bash
npm run dev
```

### 8. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Creating Admin User

To create an admin user, you can use MongoDB directly or create a script:

```javascript
// server/scripts/createAdmin.js
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const admin = new User({
      name: 'Admin',
      email: 'admin@travelagency.com',
      password: 'admin123', // Change this!
      role: 'admin'
    });
    await admin.save();
    console.log('Admin user created!');
    process.exit();
  });
```

Run: `node server/scripts/createAdmin.js`

## Testing Payment

1. Use Razorpay test credentials
2. Test card numbers:
   - Success: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For Atlas, whitelist your IP address

### Razorpay Payment Error
- Verify Key ID and Secret are correct
- Ensure using test keys in development
- Check Razorpay dashboard for errors

### Email Not Sending
- Verify SMTP credentials
- Check Gmail App Password is correct
- Ensure 2FA is enabled on Gmail

### Port Already in Use
- Change PORT in server/.env
- Update NEXT_PUBLIC_API_URL in .env.local

## Production Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Backend (Render/Railway)
1. Push to GitHub
2. Create new service
3. Connect repository
4. Add environment variables
5. Set build command: `cd server && npm install`
6. Set start command: `cd server && npm start`

## Support

For issues, check:
- Console logs for errors
- Network tab for API errors
- MongoDB logs
- Razorpay dashboard

