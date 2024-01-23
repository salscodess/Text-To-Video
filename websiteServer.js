const express = require('express');
const request = require('request-promise-native'); // For making HTTP requests
const multer = require('multer'); // For handling file uploads
const app = express();
const port = process.env.PORT || 3000;

// Set up middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve a simple HTML page with a file upload form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle file upload and initiate request to Raspberry Pi server
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Process the uploaded file (e.g., save to disk, validate, etc.)
    // For simplicity, we'll just log the file information
    console.log('Received file:', req.file);

    // Make a request to the Raspberry Pi server
    const response = await request.post('http://raspberrypi.local:3001/processRequest');
    console.log('Response from Raspberry Pi server:', response);

    res.json({ success: true });
  } catch (error) {
    console.error('Error handling file or communicating with Raspberry Pi server:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Website Server is running on port ${port}`);
});
