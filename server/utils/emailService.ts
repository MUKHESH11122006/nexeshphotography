import nodemailer from 'nodemailer';

// Create transporter for sending emails
const createTransporter = () => {
  const email = process.env.EMAIL_USER as string;
  const password = process.env.EMAIL_PASSWORD as string;

  if (!email || !password) {
    console.warn('⚠️  Email credentials not configured in .env');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });
};

// Send inquiry notification email to studio
export const sendInquiryEmail = async (inquiryData: {
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  packagePreference?: string;
  message?: string;
}) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn('Email transporter not configured');
    return false;
  }

  const studioEmail = process.env.STUDIO_EMAIL as string;
  if (!studioEmail) {
    console.warn('Studio email not configured in .env');
    return false;
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #d4af37 0%, #d4af37 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">📸 NEXESH Photography</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 14px;">New Event Inquiry Received</p>
      </div>

      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">Inquiry Details</h2>

        <table style="width: 100%; margin: 20px 0; border-collapse: collapse;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; color: #333; width: 35%;">Client Name</td>
            <td style="padding: 12px; border: 1px solid #ddd; color: #555;">${inquiryData.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; color: #333;">Phone / WhatsApp</td>
            <td style="padding: 12px; border: 1px solid #ddd; color: #555;">${inquiryData.phone}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; color: #333;">Email</td>
            <td style="padding: 12px; border: 1px solid #ddd; color: #555;">${inquiryData.email || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; color: #333;">Event Type</td>
            <td style="padding: 12px; border: 1px solid #ddd; color: #555;">${inquiryData.eventType}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; color: #333;">Event Date</td>
            <td style="padding: 12px; border: 1px solid #ddd; color: #555;">${inquiryData.eventDate || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; color: #333;">Event Location</td>
            <td style="padding: 12px; border: 1px solid #ddd; color: #555;">${inquiryData.location || 'Not specified'}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; color: #333;">Package Preference</td>
            <td style="padding: 12px; border: 1px solid #ddd; color: #555;">${inquiryData.packagePreference || 'Not specified'}</td>
          </tr>
        </table>

        ${inquiryData.message ? `
          <div style="background-color: #f0f0f0; padding: 15px; border-left: 4px solid #d4af37; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0 0 10px 0; color: #333; font-weight: bold;">Client Message:</p>
            <p style="margin: 0; color: #555; line-height: 1.6;">${inquiryData.message}</p>
          </div>
        ` : ''}

        <div style="background-color: #e8f4f8; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #25D366;">
          <p style="margin: 0; color: #333; font-size: 14px;">
            <strong>💡 Action Required:</strong> Please contact the client within 2 hours via phone, WhatsApp, or email to confirm availability and discuss package details.
          </p>
        </div>

        <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px; text-align: center;">
          This is an automated email from NEXESH Photography website inquiry system.<br/>
          © 2024 NEXESH Photography. All rights reserved.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"NEXESH Photography" <${process.env.EMAIL_USER}>`,
      to: studioEmail,
      replyTo: inquiryData.email || inquiryData.phone,
      subject: `🎞️ New Event Inquiry - ${inquiryData.name} (${inquiryData.eventType})`,
      html: htmlContent,
    });

    console.log(`✅ Email sent to ${studioEmail} for inquiry from ${inquiryData.name}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};

// Send confirmation email to client
export const sendClientConfirmationEmail = async (clientEmail: string, clientName: string) => {
  const transporter = createTransporter();
  if (!transporter || !clientEmail) {
    return false;
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; border-radius: 10px;">
      <div style="background: linear-gradient(135deg, #d4af37 0%, #d4af37 100%); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">📸 NEXESH Photography</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 14px;">Thank You for Your Inquiry!</p>
      </div>

      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #333; margin-top: 0;">Hello ${clientName},</h2>

        <p style="color: #555; line-height: 1.6; font-size: 15px;">
          Thank you for reaching out to <strong>NEXESH Photography</strong>! We've received your event inquiry and appreciate your interest in capturing your special moments with us.
        </p>

        <div style="background-color: #e8f4f8; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #d4af37;">
          <p style="margin: 0; color: #333; font-size: 14px;">
            <strong>⏱️ Next Step:</strong> Our team will review your event details and contact you within <strong>2 hours</strong> via phone, WhatsApp, or email to discuss your specific requirements and provide a customized quote.
          </p>
        </div>

        <h3 style="color: #333; margin-top: 30px; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Quick Links</h3>
        <ul style="color: #555; line-height: 1.8;">
          <li><a href="https://instagram.com/nexeshphotography" style="color: #d4af37; text-decoration: none; font-weight: bold;">Visit our Instagram Portfolio</a></li>
          <li><a href="https://wa.me/919994878151" style="color: #25D366; text-decoration: none; font-weight: bold;">Chat with us on WhatsApp</a></li>
          <li><a href="tel:+919994878151" style="color: #d4af37; text-decoration: none; font-weight: bold;">Call us directly</a></li>
        </ul>

        <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
          If you have any questions in the meantime, feel free to reach out to us at <strong>nexeshphotography@gmail.com</strong> or <strong>+91 99948 78151</strong>.<br/><br/>
          © 2024 NEXESH Photography. All rights reserved.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"NEXESH Photography" <${process.env.EMAIL_USER}>`,
      to: clientEmail,
      subject: `✨ Inquiry Received - NEXESH Photography`,
      html: htmlContent,
    });

    console.log(`✅ Confirmation email sent to ${clientEmail}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
    return false;
  }
};
