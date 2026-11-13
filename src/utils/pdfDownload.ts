import { CompanySettings, ECatalogItem, Product } from '../types';

const sanitizePdfText = (text: string): string => {
  return text
    .replace(/[^\x20-\x7E]/g, (ch) => {
      if (ch === '–' || ch === '—') return '-';
      if (ch === '·' || ch === '•') return '*';
      if (ch === '°') return ' deg';
      if (ch === '±') return '+/-';
      if (ch === '≥') return '>=';
      if (ch === '≤') return '<=';
      return ' ';
    })
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
};

const wrapText = (text: string, maxChars: number): string[] => {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += ` ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
};

const buildCatalogPdfBlob = (
  catalog: ECatalogItem,
  catalogProducts: Product[],
  company: CompanySettings
): Blob => {
  const cmds: string[] = [];
  let y = 790;

  const drawRect = (x: number, rectY: number, w: number, h: number, r: number, g: number, b: number) => {
    cmds.push(`q ${r} ${g} ${b} rg ${x} ${rectY} ${w} ${h} re f Q`);
  };

  const drawText = (
    text: string,
    x: number,
    textY: number,
    size: number,
    font: 'F1' | 'F2' = 'F1',
    r = 0.08,
    g = 0.11,
    b = 0.18
  ) => {
    cmds.push(`BT /${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${x} ${textY} Tm (${sanitizePdfText(text)}) Tj ET`);
  };

  // Corporate Blue Header Banner
  drawRect(0, 742, 595, 100, 0.11, 0.25, 0.69);
  drawText(company.companyName.toUpperCase(), 44, 804, 15, 'F2', 1, 1, 1);
  drawText(company.tagline || 'Precision Industrial Spareparts & Automation', 44, 784, 9.5, 'F1', 0.85, 0.91, 1);
  drawText(`E-CATALOG RESMI | ${catalog.code} | ${catalog.edition}`, 44, 760, 9, 'F2', 0.78, 0.87, 1);

  y = 710;

  // Title & Division
  drawText(`DIVISI: ${catalog.category.toUpperCase()}`, 44, y, 9.5, 'F2', 0.11, 0.25, 0.69);
  y -= 20;

  const titleLines = wrapText(catalog.title, 62);
  for (const line of titleLines) {
    drawText(line, 44, y, 16, 'F2', 0.06, 0.09, 0.16);
    y -= 20;
  }

  y -= 6;
  const descLines = wrapText(catalog.description, 88);
  for (const line of descLines.slice(0, 5)) {
    drawText(line, 44, y, 10, 'F1', 0.28, 0.33, 0.41);
    y -= 14;
  }

  // Highlights
  y -= 10;
  drawRect(44, y - 4, 507, 1, 0.88, 0.91, 0.94);
  y -= 20;
  drawText('KEUNGGULAN & CAKUPAN KATALOG:', 44, y, 10, 'F2', 0.06, 0.09, 0.16);
  y -= 16;

  for (const hl of catalog.highlights.slice(0, 5)) {
    const hlLines = wrapText(`- ${hl}`, 86);
    for (const l of hlLines) {
      drawText(l, 50, y, 9.5, 'F1', 0.2, 0.25, 0.33);
      y -= 13;
    }
  }

  // Product Lineup Table
  y -= 12;
  drawRect(44, y - 4, 507, 22, 0.94, 0.96, 1);
  drawText(`DAFTAR PRODUK DIVISI ${catalog.category.toUpperCase()}`, 52, y + 3, 9.5, 'F2', 0.11, 0.25, 0.69);
  y -= 22;

  if (catalogProducts.length === 0) {
    drawText('Hubungi tim sales kami untuk daftar item & datasheet terbaru pada divisi ini.', 48, y, 9.5, 'F1', 0.35, 0.4, 0.48);
    y -= 16;
  } else {
    for (const prod of catalogProducts.slice(0, 8)) {
      if (y < 120) break;
      drawText(`${prod.sku}  -  ${prod.name}`, 48, y, 10, 'F2', 0.06, 0.09, 0.16);
      y -= 13;
      const specSummary = prod.specifications
        .slice(0, 3)
        .map((s) => `${s.label}: ${s.value}`)
        .join(' | ');
      const specLines = wrapText(specSummary, 88);
      for (const sLine of specLines.slice(0, 2)) {
        drawText(sLine, 54, y, 8.5, 'F1', 0.35, 0.4, 0.48);
        y -= 12;
      }
      y -= 5;
    }
  }

  // Corporate Footer Box
  drawRect(44, 48, 507, 54, 0.96, 0.97, 0.99);
  drawText(`${company.companyName} | ${company.address}`, 54, 84, 8.5, 'F2', 0.15, 0.2, 0.3);
  drawText(
    `WhatsApp: +${company.whatsappNumber}  |  Telp: ${company.phone}  |  Email: ${company.email}`,
    54,
    69,
    8.5,
    'F1',
    0.11,
    0.25,
    0.69
  );
  drawText(`Jam Operasional: ${company.operatingHours}`, 54, 56, 8, 'F1', 0.4, 0.45, 0.53);

  const streamContent = cmds.join('\n');
  const encoder = new TextEncoder();
  const streamByteLength = encoder.encode(streamContent).length;

  const objects = [
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `6 0 obj\n<< /Length ${streamByteLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`
  ];

  const header = '%PDF-1.4\n';
  let body = header;
  const offsets: number[] = [0];

  for (const obj of objects) {
    offsets.push(encoder.encode(body).length);
    body += obj;
  }

  const xrefOffset = encoder.encode(body).length;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) {
    xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  const pdfBytes = encoder.encode(body + xref + trailer);

  return new Blob([pdfBytes], { type: 'application/pdf' });
};

const triggerBrowserDownload = (href: string, fileName: string, openInNewTab = false) => {
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName;
  if (openInNewTab) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getCleanCatalogFileName = (catalog: ECatalogItem): string => {
  if (catalog.pdfFileName?.trim()) {
    return catalog.pdfFileName.trim().endsWith('.pdf')
      ? catalog.pdfFileName.trim()
      : `${catalog.pdfFileName.trim()}.pdf`;
  }
  const safeCode = catalog.code.replace(/[^a-zA-Z0-9-_]/g, '-');
  return `${safeCode}.pdf`;
};

export const downloadCatalogPdf = async (
  catalog: ECatalogItem,
  catalogProducts: Product[],
  company: CompanySettings
): Promise<'hosted' | 'external' | 'generated'> => {
  const fileName = getCleanCatalogFileName(catalog);
  const url = catalog.pdfUrl?.trim();

  if (url) {
    if (url.startsWith('data:application/pdf')) {
      triggerBrowserDownload(url, fileName);
      return 'hosted';
    }

    const isAbsoluteExternal = /^https?:\/\//i.test(url) && !url.startsWith(window.location.origin);

    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok) {
        const blob = await response.blob();
        const headerSlice = await blob.slice(0, 5).text();
        const isPdfHeader = headerSlice.startsWith('%PDF');
        const contentType = (response.headers.get('content-type') || '').toLowerCase();

        if (isPdfHeader || contentType.includes('application/pdf')) {
          const pdfBlob =
            blob.type === 'application/pdf' ? blob : new Blob([blob], { type: 'application/pdf' });
          const objectUrl = URL.createObjectURL(pdfBlob);
          triggerBrowserDownload(objectUrl, fileName);
          setTimeout(() => URL.revokeObjectURL(objectUrl), 15000);
          return 'hosted';
        }
      }
    } catch {
      // Cross-origin hosting URL without CORS headers: fall back to direct browser download/open
      if (isAbsoluteExternal) {
        triggerBrowserDownload(url, fileName, true);
        return 'external';
      }
    }

    // If an explicit external URL was set by admin (even if HEAD/fetch was blocked), trigger direct download link
    if (isAbsoluteExternal) {
      triggerBrowserDownload(url, fileName, true);
      return 'external';
    }
  }

  // Fallback: generate a real, valid, ready-to-open PDF document so download always succeeds
  const generatedBlob = buildCatalogPdfBlob(catalog, catalogProducts, company);
  const objectUrl = URL.createObjectURL(generatedBlob);
  triggerBrowserDownload(objectUrl, fileName);
  setTimeout(() => URL.revokeObjectURL(objectUrl), 15000);
  return 'generated';
};
