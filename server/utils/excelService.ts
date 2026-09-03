import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export interface InquiryExcelData {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  eventType: string;
  eventDate?: string;
  packagePreference?: string;
  message?: string;
}

const EXCEL_FILE_NAME = 'nexeshcustomer.xlsx';
const HEADERS = [
  'S.No',
  'Name',
  'Phone',
  'E-Mail',
  'Event Location',
  'Category of Event',
  'Event Date',
  'Preferd Package',
  'Message',
  'Submitted At',
];

export const getExcelFilePath = (): string => {
  return path.resolve(process.cwd(), EXCEL_FILE_NAME);
};

export const appendInquiryToExcel = async (data: InquiryExcelData): Promise<void> => {
  const filePath = getExcelFilePath();
  let workbook: XLSX.WorkBook;
  let sheetName = 'Sheet1';
  let existingRows: any[][] = [];

  if (fs.existsSync(filePath)) {
    try {
      workbook = XLSX.readFile(filePath);
      sheetName = workbook.SheetNames[0] || 'Sheet1';
      const sheet = workbook.Sheets[sheetName];
      if (sheet) {
        existingRows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
      }
    } catch (err) {
      console.error('Error reading existing Excel file, creating a new workbook:', err);
      workbook = XLSX.utils.book_new();
    }
  } else {
    workbook = XLSX.utils.book_new();
  }

  // If no rows or sheet missing header, set header
  if (existingRows.length === 0) {
    existingRows.push(HEADERS);
  } else {
    // Ensure headers contain all fields
    const currentHeader = existingRows[0];
    HEADERS.forEach((h) => {
      if (!currentHeader.includes(h)) {
        currentHeader.push(h);
      }
    });
  }

  // Calculate S.No based on current number of data rows
  const nextSNo = existingRows.length; // since row 0 is header

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}`;

  const newRow = [
    nextSNo,
    data.name || 'N/A',
    data.phone || 'N/A',
    data.email || 'N/A',
    data.location || 'N/A',
    data.eventType || 'N/A',
    data.eventDate || 'N/A',
    data.packagePreference || 'N/A',
    data.message || 'N/A',
    formattedDate,
  ];

  existingRows.push(newRow);

  const newSheet = XLSX.utils.aoa_to_sheet(existingRows);
  workbook.Sheets[sheetName] = newSheet;

  if (!workbook.SheetNames.includes(sheetName)) {
    XLSX.utils.book_append_sheet(workbook, newSheet, sheetName);
  }

  XLSX.writeFile(workbook, filePath);
  console.log(`✅ Saved inquiry for "${data.name}" to Excel sheet: ${filePath}`);
};
