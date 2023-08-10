const fs = require('fs');
const path = require('path');
const url = require('url');
const csvWriter = require('csv-writer').createObjectCsvWriter;

const regulationsDir = 'regulations';
const newRegulationsDir = 'new_regulations';
const csvFilePath = 'file_mapping.csv';

// Ensure the "new_regulations" directory exists
if (!fs.existsSync(newRegulationsDir)) {
    fs.mkdirSync(newRegulationsDir);
}

// Create a CSV writer
const csvWriterObj = csvWriter({
    path: csvFilePath,
    header: [
        { id: 'originalName', title: 'Original File Name' },
        { id: 'newName', title: 'New File Name' }
    ]
});

// Read files from "regulations" directory
fs.readdir(regulationsDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Process each file
    files.forEach(originalName => {
        const newName = encodeURIComponent(originalName); // URL-encode the file name
        const sourcePath = path.join(regulationsDir, originalName);
        const targetPath = path.join(newRegulationsDir, newName);

        // Rename and move the file
        fs.rename(sourcePath, targetPath, err => {
            if (err) {
                console.error('Error renaming/moving file:', err);
                return;
            }

            // Write to CSV
            csvWriterObj.writeRecords([
                { originalName, newName }
            ]).then(() => {
                console.log(`File "${originalName}" renamed and moved to "${newName}"`);
            }).catch(error => {
                console.error('Error writing to CSV:', error);
            });
        });
    });
});
