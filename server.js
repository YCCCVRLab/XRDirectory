import { APITable } from 'apitable';  // ES6 import if supported
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Enable CORS to allow frontend to access the backend
const app = express();
app.use(cors());

// API token stored in environment variables
const apiToken = process.env.APITOKEN;
const apitable = APITable({ token: apiToken, fieldKey: 'name' });  // Call APITable as a function
const datasheet = apitable.datasheet("dstljdoHCE54Pk2QZg");

// Endpoint to fetch apps
app.get('/api/apps', async (req, res) => {
  try {
    const response = await datasheet.records.query({ viewId: "viw6ZEpbVVxlS" });
    if (response.success) {
      res.json(response.data.records);  // Return the list of apps
    } else {
      res.status(500).send('Failed to fetch apps');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Endpoint to fetch app details by recordId
app.get('/api/app-detail', async (req, res) => {
  const { recordId } = req.query;
  try {
    const response = await datasheet.record.query({ recordIds: [recordId] });
    if (response.success) {
      res.json(response.data[0]);  // Return the details of a specific app
    } else {
      res.status(500).send('Failed to fetch app details');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});