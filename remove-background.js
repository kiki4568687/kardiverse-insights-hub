const sharp = require('sharp');
const path = require('path');

async function removeBackground() {
  try {
    const inputPath = path.join(__dirname, 'public', 'logo.png');
    const outputPath = path.join(__dirname, 'public', 'logo-transparent.png');
    
    // Get image metadata and data
    const image = sharp(inputPath);
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    // Threshold for black/dark pixels (adjust between 0-255)
    const threshold = 30;
    
    // Process each pixel: make dark pixels transparent
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Check if pixel is dark (black or near-black)
      if (r < threshold && g < threshold && b < threshold) {
        data[i + 3] = 0; // Make transparent
      }
    }
    
    // Write the modified image
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);
    
    console.log('Background removed successfully! New file: logo-transparent.png');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

removeBackground();
