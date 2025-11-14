# Premium Travel Agency Website

A fully dynamic, premium-grade Travel Agency Website with a smooth, luxury, cinematic feel built with Next.js and Node.js.

## Features

### ✈️ Booking System
- Book tickets for flights, trains, buses
- Tour packages with full itinerary
- Journey planning with locations, photos, and maps
- Timetable for each day

### 💳 Payment Integration
- Razorpay full integration
- Secure payment processing
- Auto email confirmation after payment
- Booking saved in dashboard

### 📱 Customer Integrations
- WhatsApp chat button
- Instagram feed integration
- Facebook link
- Contact form with auto email
- Customer review section

### 🧳 Admin Panel
- Add destinations
- Add packages
- Add ticket prices
- Add images
- Add itineraries
- Add offers
- Manage bookings

### 🎨 Premium Design
- Luxury color palette (Teal Blue, Sky Blue, Gold accents)
- Premium typography (Clash Display, Inter)
- Hero section with video background
- Smooth scrolling with Lenis
- GSAP animations and ScrollTrigger
- Magnetic buttons
- Custom cursor effects
- Parallax effects
- Premium microinteractions

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis (Smooth Scroll)
- Framer Motion
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Razorpay Integration
- Nodemailer (Email)

## Installation

### Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Update .env with your credentials:
# - MONGODB_URI
# - JWT_SECRET
# - RAZORPAY_KEY_ID
# - RAZORPAY_KEY_SECRET
# - SMTP credentials

# Run server
npm run dev
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (server/.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-agency
JWT_SECRET=your-super-secret-jwt-key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@travelagency.com
```

## Razorpay Setup

1. Sign up at [Razorpay](https://razorpay.com)
2. Get your Key ID and Key Secret from the dashboard
3. Add them to your environment variables
4. Test with Razorpay test keys first

## Database Schema

### User
- name, email, password, role

### Package
- title, description, duration, price, type, features, itinerary, images, destination

### Destination
- name, description, image, price, duration, location, images

### Booking
- bookingId, user, package, travelType, departureDate, returnDate, passengers, totalAmount, payment, status

## API Endpoints

### Auth
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Packages
- GET `/api/packages` - Get all packages
- GET `/api/packages/:id` - Get single package

### Destinations
- GET `/api/destinations` - Get all destinations
- GET `/api/destinations/:id` - Get single destination

### Bookings
- GET `/api/bookings/my-bookings` - Get user bookings (auth required)
- GET `/api/bookings/:id` - Get single booking (auth required)

### Payments
- POST `/api/payments/create-order` - Create Razorpay order
- POST `/api/payments/verify` - Verify payment

### Contact
- POST `/api/contact` - Send contact form

### Admin (auth required)
- POST `/api/admin/packages` - Create package
- PUT `/api/admin/packages/:id` - Update package
- DELETE `/api/admin/packages/:id` - Delete package
- POST `/api/admin/destinations` - Create destination
- PUT `/api/admin/destinations/:id` - Update destination
- DELETE `/api/admin/destinations/:id` - Delete destination
- GET `/api/admin/bookings` - Get all bookings
- PUT `/api/admin/bookings/:id` - Update booking

## Deployment

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Add environment variables
4. Deploy

### Backend (Render/Railway)
1. Push code to GitHub
2. Create new service on Render/Railway
3. Connect repository
4. Add environment variables
5. Deploy

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── destinations/      # Destinations pages
│   ├── packages/          # Package pages
│   ├── book/              # Booking page
│   ├── payment/           # Payment pages
│   ├── contact/           # Contact page
│   ├── dashboard/         # User dashboard
│   └── admin/             # Admin panel
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Destinations.tsx
│   ├── Packages.tsx
│   ├── Footer.tsx
│   └── ...
├── server/                # Backend server
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   ├── utils/            # Utilities (email, etc.)
│   └── server.js         # Server entry point
└── public/               # Static assets
```

## License

MIT License

## Support

For support, email info@travelagency.com or contact via WhatsApp.

