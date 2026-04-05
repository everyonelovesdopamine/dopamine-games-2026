import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

// Ensure directory exists
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

// Get next screenshot number
function getNextScreenshotNumber() {
  const files = fs.readdirSync(screenshotDir);
  const numbers = files
    .map(f => {
      const match = f.match(/^screenshot-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .sort((a, b) => b - a);
  return (numbers[0] || 0) + 1;
}

async function takeScreenshot() {
  const url = process.argv[2];
  const label = process.argv[3];

  if (!url) {
    console.error('Usage: node screenshot.mjs <url> [label]');
    process.exit(1);
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    console.log(`📸 Taking screenshot of ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    const num = getNextScreenshotNumber();
    const filename = label ? `screenshot-${num}-${label}.png` : `screenshot-${num}.png`;
    const filepath = path.join(screenshotDir, filename);

    await page.screenshot({ path: filepath, fullPage: false });

    console.log(`✅ Screenshot saved: ${filepath}`);
    console.log(`Read it with: Read ${filepath}`);

    await browser.close();
  } catch (error) {
    console.error('❌ Screenshot failed:', error.message);
    if (browser) await browser.close();
    process.exit(1);
  }
}

takeScreenshot();
