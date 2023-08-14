const fs = require('fs');
const path = require('path');
const parse = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const inputDir = 'regulations';
const outputDir = 'new_regulations';
const csvOutputPath = 'rename_tracking.csv';

const csvWriter = createCsvWriter({
  path: csvOutputPath,
  header: [
    { id: 'originalFilename', title: 'Original Filename' },
    { id: 'newFilename', title: 'New Filename' }
  ],
  append: true // Append to existing CSV file
});

function sanitizeFilename(filename) {
  return filename.replace(/[^\w\d.]/g, '-').toLowerCase();
}

fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach((file) => {
  if (file.endsWith('.pdf')) {
    const originalFilename = file;
    const newFilename = sanitizeFilename(file);

    fs.copyFileSync(
      path.join(inputDir, originalFilename),
      path.join(outputDir, newFilename)
    );

    csvWriter.writeRecords([
      { originalFilename, newFilename }
    ]).then(() => {
      console.log(`Processed: ${originalFilename}`);
    });
  }
});
