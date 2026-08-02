const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  { src: 'KC_horizontal_logo.png', name: 'KC_horizontal_logo' },
  { src: 'KC_round_logo.png', name: 'KC_round_logo' },
];

async function run() {
  const publicDir = path.join(__dirname, '..', 'public');
  for (const img of images) {
    const inPath = path.join(publicDir, img.src);
    if (!fs.existsSync(inPath)) {
      console.error('Missing input image:', inPath);
      continue;
    }

    const webpOut = path.join(publicDir, `${img.name}.webp`);
    const pngOptOut = path.join(publicDir, `${img.name}.opt.png`);

    try {
      await sharp(inPath)
        .webp({ quality: 80 })
        .toFile(webpOut);

      await sharp(inPath)
        .png({ compressionLevel: 9 })
        .toFile(pngOptOut);

      console.log('Generated:', webpOut, pngOptOut);
    } catch (err) {
      console.error('Error processing', inPath, err);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
