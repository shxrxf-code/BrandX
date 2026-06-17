# Contact Form Setup

## Overview

The contact form API uses Nodemailer to deliver form submissions directly to email.

## Environment Variables

Create a `.env.local` file with the following:

```bash
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password
```

## Email Provider Setup

1. Enable 2FA on your email account
2. Generate an app password (Gmail: Google Account → Security → 2-Step Verification → App passwords)
3. Use this password as `EMAIL_PASS`

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
{ "success": true }
```

**Validation Error (400):**
```json
{ "error": "Valid email is required" }
```

**Rate Limited (429):**
```json
{ "error": "Too many requests. Please try again later." }
```

## Validation Rules

| Field | Requirement |
|-------|-------------|
| `name` | Minimum 2 characters, maximum 100 |
| `email` | Valid email format, no disposable domains |
| `subject` | Optional |
| `message` | Minimum 10 characters, maximum 5000 |

## Vercel Deployment

Add the environment variables in your Vercel project settings:
- Settings → Environment Variables → Add each variable
- Redeploy after adding variables
