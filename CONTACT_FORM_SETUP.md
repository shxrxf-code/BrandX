# Contact Form Setup Instructions

## Overview
The contact form now uses a custom backend API with Nodemailer instead of Formspree.

## Required Environment Variables

Add these to your Vercel Environment Variables:

```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=brandexdigital.in@gmail.com
EMAIL_PASS=your-app-password
```

## Gmail Setup

1. Enable 2FA on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate new app password
   - Use this password for EMAIL_PASS

## API Endpoint

The contact form now submits to: `/api/contact`

## Features

- ✅ Direct email delivery to brandexdigital.in@gmail.com
- ✅ No external dependencies (Formspree removed)
- ✅ Secure environment variable usage
- ✅ Error handling and user feedback
- ✅ Form validation
- ✅ Mobile-friendly

## Testing

1. Deploy to Vercel with environment variables
2. Test contact form submission
3. Verify email delivery

## Files Modified

- `src/pages/Contact.tsx` - Updated to use fetch API
- `api/contact.ts` - New backend email handler
- `vercel.json` - API routing configuration
- `.env.example` - Environment variables template
