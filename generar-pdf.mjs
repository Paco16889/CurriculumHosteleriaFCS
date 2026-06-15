import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'index.html');
const pdfPath = path.join(__dirname, 'CV-Francisco-Cobo.pdf');

const chromePaths = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean);

const executablePath = chromePaths.find((p) => fs.existsSync(p));

if (!executablePath) {
  console.error('No se encontró Chrome ni Edge. Instala Chrome o define CHROME_PATH.');
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();

// Vista exacta del formato PC (794 × 1123 px ≈ A4)
await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, {
  waitUntil: 'networkidle0',
  timeout: 30000,
});

// Renderizar como pantalla de PC, no como móvil ni solo @media print
await page.emulateMediaType('screen');

await page.evaluate(() => {
  document.querySelectorAll('.section-collapsible').forEach((el) => {
    el.setAttribute('open', '');
  });
});

// Recortar exactamente a una hoja A4 (evita 2ª página con restos de color)
await page.addStyleTag({
  content: `
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      width: 794px !important;
      height: 1123px !important;
      min-height: 0 !important;
      max-height: 1123px !important;
      overflow: hidden !important;
      background: #fff !important;
      display: block !important;
    }
    .mobile-header,
    .mobile-menu {
      display: none !important;
    }
    .page {
      margin: 0 !important;
      box-shadow: none !important;
    }
  `,
});

await page.pdf({
  path: pdfPath,
  printBackground: true,
  width: '794px',
  height: '1123px',
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  pageRanges: '1',
});

await browser.close();

console.log(`PDF generado: ${pdfPath}`);
