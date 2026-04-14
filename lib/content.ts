import fs from "fs";
import path from "path";
import mammoth from "mammoth";

const CONTENT_ROOT = path.join(process.cwd());

/**
 * Strip leading document-header paragraphs (author name, date, course info,
 * all-caps titles, short labels) that aren't part of the essay body.
 */
function isHeaderLine(p: string): boolean {
  // Only strip short lines that look like document metadata, not body text.
  // A body paragraph is typically > 80 characters.
  if (p.length > 80) return false;

  const patterns = [
    /^ben\s*inglee$/i,                            // just the name
    /ben\s*inglee.*msp/i,                         // name + course code
    /^home\s+ben\s*inglee/i,                      // "Home Ben Inglee MSP..."
    /msp\s*3296/i,
    /^travel\s*writing$/i,
    /^\w+\s+\d{1,2},?\s+\d{4}$/,                 // "February 27, 2025"
    /^(home|destination|guide)\s*(\(revised\))?$/i,
    /^\(revised\)$/i,
    /^[A-Z\s()]+$/,                               // ALL-CAPS lines
    /^author[\u2019']?s?\s*bio$/i,
    /^a day in philadelphia$/i,
  ];

  return patterns.some((rx) => rx.test(p));
}

function stripDocumentHeader(paragraphs: string[]): string[] {
  let start = 0;
  while (start < paragraphs.length && isHeaderLine(paragraphs[start])) {
    start++;
  }
  return paragraphs.slice(start);
}

export async function readDocx(
  relativePath: string,
  strip = false
): Promise<string[]> {
  const fullPath = path.join(CONTENT_ROOT, relativePath);
  const buffer = fs.readFileSync(fullPath);
  const result = await mammoth.extractRawText({ buffer });
  const paragraphs = result.value
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  return strip ? stripDocumentHeader(paragraphs) : paragraphs;
}

export async function readPdf(
  relativePath: string,
  strip = false
): Promise<string[]> {
  const pdfParse = (await import("pdf-parse")).default;
  const fullPath = path.join(CONTENT_ROOT, relativePath);
  const buffer = fs.readFileSync(fullPath);
  const data = await pdfParse(buffer);

  let rawLines = data.text
    .split(/\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .filter((l) => !/^--\s*\d+\s*of\s*\d+\s*--$/.test(l));

  // Strip header lines BEFORE merging, so they don't contaminate essay text
  if (strip) {
    rawLines = stripDocumentHeader(rawLines);
  }

  // pdf-parse preserves hard line-wraps from the PDF layout.
  // Merge wrapped lines into real paragraphs: a line that ends with
  // sentence-ending punctuation followed by a line starting with a capital
  // letter is a paragraph boundary.
  const paragraphs: string[] = [];
  let acc = "";

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    acc = acc ? acc + " " + line : line;

    const endsWithPunctuation = /[.!?'"\u201D)]$/.test(line);
    const nextStartsUpper =
      i + 1 < rawLines.length && /^[A-Z]/.test(rawLines[i + 1]);
    const isLast = i === rawLines.length - 1;

    if (isLast || (endsWithPunctuation && nextStartsUpper)) {
      paragraphs.push(acc);
      acc = "";
    }
  }
  if (acc) paragraphs.push(acc);

  return paragraphs;
}

export interface TransformationItem {
  number: number;
  heading: string;
  body: string;
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

/**
 * Parse transformation docx files using mammoth's HTML output.
 * The Word files use <ol><li> for each item heading followed by <p> for body text.
 */
export async function readTransformation(
  relativePath: string
): Promise<TransformationItem[]> {
  const fullPath = path.join(CONTENT_ROOT, relativePath);
  const buffer = fs.readFileSync(fullPath);
  const result = await mammoth.convertToHtml({ buffer });
  const html = result.value;

  const items: TransformationItem[] = [];

  // Split the HTML into segments. Each <ol><li>...</li></ol> marks an item heading,
  // and the <p> tags following it (until the next <ol>) are the body.
  const segments = html.split(/(?=<ol>)/);
  let count = 0;

  for (const segment of segments) {
    const headingMatch = segment.match(/<ol><li>(?:<strong>)?(.*?)(?:<\/strong>)?<\/li><\/ol>/);
    if (!headingMatch) continue;

    count++;
    const heading = stripHtmlTags(headingMatch[1]);

    // Collect all <p> text after this <ol>
    const bodyParts: string[] = [];
    const afterOl = segment.replace(/<ol>.*?<\/ol>/, "");
    let pMatch: RegExpExecArray | null;
    const pRegex = /<p>(.*?)<\/p>/g;
    while ((pMatch = pRegex.exec(afterOl)) !== null) {
      const text = stripHtmlTags(pMatch[1]);
      if (text) bodyParts.push(text);
    }

    items.push({
      number: count,
      heading,
      body: bodyParts.join(" "),
    });
  }

  return items;
}
