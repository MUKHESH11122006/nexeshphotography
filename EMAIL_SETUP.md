# Email Configuration Setup Guide

## Overview
The inquiry form now sends emails directly to your inbox when users submit event inquiries. Here's how to set it up:

## Step-by-Step Setup Instructions

### 1. Enable Gmail 2-Factor Authentication (if not already enabled)
- Go to [myaccount.google.com](https://myaccount.google.com)
- Click on **Security** in the left menu
- Enable **2-Step Verification** if you haven't already

### 2. Create a Gmail App Password
- Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- You may need to sign in again
- Select **Mail** as the app
- Select **Windows Computer** (or your device type) as the device
- Click **Generate**
- Copy the 16-character password displayed

### 3. Update Your .env File
Edit the `.env` file in your project root and update these values:

```env
# Email Configuration (Gmail)
EMAIL_USER=nexeshphotography@gmail.com
EMAIL_PASSWORD=your_16_character_app_password_here
STUDIO_EMAIL=nexeshphotography@gmail.com
```

**Important:** Never commit your .env file to GitHub. It contains sensitive credentials.

### 4. Restart the Server
After updating the .env file, restart your development server:

```bash
npm run server
```

## What Happens When a User Submits an Inquiry

### Email to Studio
- **Recipient:** Your studio email (STUDIO_EMAIL)
- **Content:** Complete inquiry details including name, phone, email, event type, date, location, and message
- **Design:** Professional HTML template with all information formatted nicely

### Confirmation Email to Client
- **Recipient:** Client's email (if provided in the form)
- **Content:** Thank you message and next steps
- **Links:** Quick access to WhatsApp, phone, Instagram, and email

## Troubleshooting

### "Email credentials not configured in .env"
- Make sure you've added EMAIL_USER and EMAIL_PASSWORD to your .env file
- Check for typos in the email or password

### "Error sending email"
- Verify the Gmail app password is correct (16 characters)
- Make sure you have 2-Factor Authentication enabled
- Check that your Gmail account has SMTP access enabled

### Email not received
- Check spam/junk folder
- Verify STUDIO_EMAIL is correct in .env
- Check console logs for detailed error messages

## Email Features

- ✅ **Professional HTML Template** - Branded emails with NEXESH Photography logo theme
- ✅ **Instant Notifications** - Receive inquiries in real-time
- ✅ **Client Confirmation** - Users receive automatic confirmation when they submit
- ✅ **Rich Formatting** - All inquiry details displayed in organized tables
- ✅ **Action-Oriented** - Reminder to contact client within 2 hours
- ✅ **Reply-To Links** - Click to reply directly to the inquiry

## Security Notes

1. **Never share your App Password** - It's specific to your Gmail account
2. **Keep .env private** - Don't commit it to version control
3. **Use separate email account** - Consider using a dedicated Gmail for studio inquiries
4. **Rotate passwords** - You can regenerate app passwords anytime in your Google Account settings

## Alternative Email Services

To use a different email service (SendGrid, Mailgun, etc.), edit `server/utils/emailService.ts` and update the transporter configuration.

---

For questions, check the nodemailer documentation: https://nodemailer.com/
