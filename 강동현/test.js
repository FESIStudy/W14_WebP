const sharp = require('sharp');

sharp('./bear.png').webp({ quality: 100 }).toFile('quality-100.webp')
sharp('./bear.png').webp({ lossless: true }).toFile('lossless.webp')