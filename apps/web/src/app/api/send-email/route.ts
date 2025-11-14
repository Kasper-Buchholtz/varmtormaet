import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { client } from '@/sanity/lib/sanity.client'
import groq from 'groq'

// fetch global settings
const settingsQuery = groq`*[_type == "formularSettings"][0]{ defaultRecipientEmail }`
const globalSettings = await client.fetch(settingsQuery)

export async function POST(req) {
  const body = await req.json()

  // Tjekker om der er minimum 1 reelt felt (udover honeypot)
  const filteredFields = Object.entries(body).filter(
    ([key, value]) =>
      !['honeyPot', 'recipientEmail'].includes(key) &&
      ((typeof value === 'string' && value.trim() !== '') ||
        (Array.isArray(value) && value.length > 0)),
  )

  if (filteredFields.length === 0) {
    return NextResponse.json({ message: 'No valid fields provided' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.fastmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.FASTMAIL_USER,
      pass: process.env.FASTMAIL_PASS,
    },
  })

  // Bygger email-tekst dynamisk ud fra formularens indhold
  const emailText = filteredFields
    .map(([key, value]) => {
      const displayValue = Array.isArray(value) ? value.join(', ') : value
      return `${key}: ${displayValue}`
    })
    .join('\n')

  const recipient =
    body?.recipientEmail || // Fra formular-data
    globalSettings?.defaultRecipientEmail || // Globalt default
    'eh@superego.nu' // Absolut fallback

  try {
    await transporter.sendMail({
      from: '"Kontaktformular" <no-reply@superego.website>',
      to: recipient, // Modtagerens email
      subject: 'Ny besked fra kontaktformularen',
      text: emailText,
    })

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 })
  } catch (error) {
    console.error('Fejl ved afsendelse:', error)
    return NextResponse.json({ message: 'Error sending email.' }, { status: 500 })
  }
}
