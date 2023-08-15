const fs = require('fs');
const parse = require('csv-parser');

const csvFilePath = 'rename_tracking.csv';
const jsonFilePath = 'regulations_json/regulations.json';

const mappings = {};

fs.createReadStream(csvFilePath)
  .pipe(parse())
  .on('data', (row) => {
    const originalFilename = row.originalFilename;
    const newFilename = row.newFilename;

    mappings[originalFilename] = newFilename;
  })
  .on('end', () => {
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return;
      }

      const jsonData = JSON.parse(data);

      jsonData.forEach((entry) => {
        for (const [originalFilename, newFilename] of Object.entries(mappings)) {
          if (entry.reg_link != null) {
            entry.reg_link = entry.reg_link.replace(originalFilename, newFilename);
          }
          if (entry.hearing_report != null) {
            entry.hearing_report = entry.hearing_report.replace(originalFilename, newFilename);
          }
          if (entry['support'] != null) {
            entry.support = entry.support.replace(originalFilename, newFilename);
          }
          if (entry['support.1'] != null) {
            entry['support.1'] = entry['support.1'].replace(originalFilename, newFilename);
          }
          if (entry['support.2'] != null) {
            entry['support.2'] = entry['support.2'].replace(originalFilename, newFilename);
          }
          if (entry['support.3'] != null) {
            entry['support.3'] = entry['support.3'].replace(originalFilename, newFilename);
          }
          if (entry['support.4'] != null) {
            entry['support.4'] = entry['support.4'].replace(originalFilename, newFilename);
          }
        }
      });

      fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing updated JSON file:', err);
        } else {
          console.log('JSON file updated successfully.');
        }
      });
    });
  });
