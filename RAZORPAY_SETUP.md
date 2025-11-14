# Razorpay Integration Guide

## Step 1: Create Razorpay Account

1. Go to https://razorpay.com
2. Sign up for an account
3. Complete KYC verification (for live mode)

## Step 2: Get API Keys

### Test Mode (Development)
1. Login to Razorpay Dashboard
2. Go to Settings > API Keys
3. Generate Test Keys
4. Copy Key ID and Key Secret

### Live Mode (Production)
1. Complete KYC verification
2. Go to Settings > API Keys
3. Generate Live Keys
4. Copy Key ID and Key Secret

## Step 3: Configure Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

### Backend (server/.env)
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret_here
```

## Step 4: Test Payment Flow

### Test Card Numbers

**Success:**
- Card Number: 4111 1111 1111 1111
- CVV: Any 3 digits (e.g., 123)
- Expiry: Any future date (e.g., 12/25)
- Name: Any name

**Failure:**
- Card Number: 4000 0000 0000 0002
- CVV: Any 3 digits
- Expiry: Any future date

## Step 5: Payment Flow

1. User fills booking form
2. Frontend calls `/api/payments/create-order`
3. Backend creates Razorpay order
4. Frontend opens Razorpay checkout
5. User completes payment
6. Razorpay redirects with payment details
7. Frontend calls `/api/payments/verify`
8. Backend verifies signature and creates booking
9. Email confirmation sent

## Step 6: Webhook Setup (Optional)

For production, set up webhooks:

1. Go to Settings > Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/razorpay`
3. Select events:
   - payment.captured
   - payment.failed
   - order.paid

## Security Best Practices

1. **Never expose Key Secret** in frontend code
2. Always verify payment signature on backend
3. Use HTTPS in production
4. Validate amounts on backend
5. Store payment details securely
6. Implement idempotency for payments

## Common Issues

### Payment Not Processing
- Check API keys are correct
- Verify amount is in paise (multiply by 100)
- Check Razorpay dashboard for errors

### Signature Verification Failed
- Ensure Key Secret matches
- Verify signature generation logic
- Check order_id and payment_id are correct

### Test Mode vs Live Mode
- Test keys only work in test mode
- Live keys only work in live mode
- Don't mix test and live keys

## Support

- Razorpay Docs: https://razorpay.com/docs/
- Support: support@razorpay.com

