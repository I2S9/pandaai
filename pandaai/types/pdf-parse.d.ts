declare module 'pdf-parse' {
  interface PDFData {
    text: string;
    numpages: number;
    info: {
      PDFFormatVersion: string;
      IsAcroFormPresent: boolean;
      IsXFAPresent: boolean;
      [key: string]: unknown;
    };
    metadata: unknown;
    version: string;
  }

  function pdfParse(buffer: Buffer, options?: unknown): Promise<PDFData>;
  
  export default pdfParse;
} 