import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import { Inquiry } from '../models/Inquiry';
import { sendInquiryEmail, sendClientConfirmationEmail } from '../utils/emailService';
import { appendInquiryToExcel, getExcelFilePath } from '../utils/excelService';

const router = Router();

// GET /api/inquiries/export-excel — Download the nexeshcustomer.xlsx file
router.get('/export-excel', (_req: Request, res: Response) => {
  const filePath = getExcelFilePath();
  if (fs.existsSync(filePath)) {
    res.download(filePath, 'nexeshcustomer.xlsx');
  } else {
    res.status(404).json({ success: false, message: 'Excel customer database file not found yet.' });
  }
});

// POST /api/inquiries — Create new inquiry
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, phone, email, eventType, eventDate, location, packagePreference, message } =
      req.body;

    if (!name || !phone || !eventType) {
      res.status(400).json({
        success: false,
        message: 'Name, phone, and event type are required.',
      });
      return;
    }

    let inquiry = null;
    if (mongoose.connection.readyState === 1) {
      try {
        inquiry = await Inquiry.create({
          name,
          phone,
          email,
          eventType,
          eventDate,
          location,
          packagePreference,
          message,
        });
      } catch (dbErr) {
        console.error('Database write warning (proceeding with email and excel saving):', dbErr);
      }
    } else {
      console.warn('⚠️ MongoDB is not connected. Processing inquiry via Excel and email fallback.');
    }

    const inquiryData = {
      name,
      phone,
      email,
      eventType,
      eventDate,
      location,
      packagePreference,
      message,
    };

    // Save directly to Excel sheet (nexeshcustomer.xlsx)
    try {
      await appendInquiryToExcel(inquiryData);
    } catch (excelErr) {
      console.error('Error saving inquiry to Excel sheet:', excelErr);
    }

    // Send email to studio with inquiry details
    await sendInquiryEmail(inquiryData).catch(err => console.error('Error sending studio email:', err));

    // Send confirmation email to client if email is provided
    if (email) {
      await sendClientConfirmationEmail(email, name).catch(err => console.error('Error sending client email:', err));
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! We will contact you within 2 hours.',
      data: inquiry,
    });
  } catch (err) {
    console.error('Error creating inquiry:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// GET /api/inquiries — Fetch all inquiries (latest first)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET /api/inquiries/:id — Get single inquiry
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found.' });
      return;
    }
    res.json({ success: true, data: inquiry });
  } catch (err) {
    console.error('Error fetching inquiry:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// PATCH /api/inquiries/:id — Update status or fields
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found.' });
      return;
    }
    res.json({ success: true, data: inquiry });
  } catch (err) {
    console.error('Error updating inquiry:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// DELETE /api/inquiries/:id — Delete an inquiry
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found.' });
      return;
    }
    res.json({ success: true, message: 'Inquiry deleted.' });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
