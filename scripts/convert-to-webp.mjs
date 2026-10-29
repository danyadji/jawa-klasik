import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('assets');
const publicDir = path.resolve('public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function getImages(dir, fileList = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getImages(fullPath, fileList);
    } else if (/\.(png|jpg|jpeg)$/i.test(item)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function convertAll() {
  const images = getImages(assetsDir);
  console.log(`Found ${images.length} images to convert.`);

  for (const img of images) {
    const ext = path.extname(img);
    const targetWebp = img.slice(0, -ext.length) + '.webp';
    const metadata = await sharp(img).metadata();

    await sharp(img)
      .webp({
        quality: 81,
        alphaQuality: 90,
        effort: 6,
      })
      .toFile(targetWebp);

    const oldSize = fs.statSync(img).size;
    const newSize = fs.statSync(targetWebp).size;
    console.log(
      `Converted: ${path.relative(assetsDir, img)} (${Math.round(oldSize / 1024)} KB -> ${Math.round(newSize / 1024)} KB) [${metadata.width}x${metadata.height}]`
    );
  }

  // Also write public/bg.webp from assets/backgrounds/bg.jpg
  const bgJpg = path.join(assetsDir, 'backgrounds', 'bg.jpg');
  if (fs.existsSync(bgJpg)) {
    const publicBg = path.join(publicDir, 'bg.webp');
    await sharp(bgJpg)
      .webp({
        quality: 81,
        effort: 6,
      })
      .toFile(publicBg);
    console.log(`Created public/bg.webp (${Math.round(fs.statSync(publicBg).size / 1024)} KB)`);
  }
}

convertAll().catch(err => {
  console.error('Error converting images:', err);
  process.exit(1);
});
