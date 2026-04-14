import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Creates a new PDF document with a sample text.
 * @returns A promise that resolves with the PDF document as a Uint8Array.
 */
export async function createSamplePdf(): Promise<Uint8Array> {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();

  // Add a blank page to the document
  const page = pdfDoc.addPage();

  // Get the form font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the width and height of the page
  const { width, height } = page.getSize();

  // Draw a string of text toward the top of the page
  const fontSize = 30;
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    font,
    size: fontSize,
    color: rgb(0, 0.53, 0.71),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
