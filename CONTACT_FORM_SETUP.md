# Contact Form Setup

## Overview

The contact form API uses Nodemailer to deliver form submissions directly to email.

## Environment Variables

Create a `.env.local` file with the following:

```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=brandexdigital.in@gmail.com
EMAIL_PASS=your-app-password
```

## Gmail App Password Setup

1. Enable 2FA on your Gmail account
2. Go to Google Account → Security → 2-Step Verification → App passwords
3. Generate a new app password for "Mail"
4. Use this password as `EMAIL_PASS`

## API Endpoint

- **Route:** `POST /api/contact`
- **File:** `src/app/api/contact/route.ts`

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a website redesign..."
}
```

### Response

**Success (200):**
```json
{ "success": true, "message": "Email sent successfully" }
```

**Validation Error (400):**
```json
{ "error": "Valid email is required" }
```

**Service Unavailable (503):**
```json
{ "error": "Email service not configured" }
```

## Validation Rules

| Field | Requirement |
|-------|-------------|
| `name` | Minimum 2 characters |
| `email` | Valid email format |
| `subject` | Minimum 3 characters |
| `message` | Minimum 10 characters |

## Vercel Deployment

Add the environment variables in your Vercel project settings:
- Settings → Environment Variables → Add each variable
- Redeploy after adding variables
