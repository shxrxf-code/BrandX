import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

interface ContactFormInput {
  name: string
  email: string
  subject: string
  message: string
}

function validateInput(data: Partial<ContactFormInput>): string | null {
  if (!data.name || data.name.trim().length < 2) {
    return 'Name must be at least 2 characters'
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Valid email is required'
  }
  if (!data.subject || data.subject.trim().length < 3) {
    return 'Subject must be at least 3 characters'
  }
  if (!data.message || data.message.trim().length < 10) {
    return 'Message must be at least 10 characters'
  }
  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body as ContactFormInput

    const validationError = validateInput({ name, email, subject, message })
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      )
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      )
    }

    await transporter.sendMail({
      from: `"Brandex Digital Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table>
          <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Subject:</strong></td><td>${subject}</td></tr>
          <tr><td><strong>Message:</strong></td><td>${message}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
