const APITable = require('apitable').default;  // Fix: Correct import based on the guide

// Get the recordId from the URL
const urlParams = new URLSearchParams(window.location.search);
const recordId = urlParams.get('recordId');

// API setup
const apiToken = process.env.APITOKEN;
const apitable = new APITable({ token: apiToken, fieldKey: 'name' });
const datasheet = apitable.datasheet("dstljdoHCE54Pk2QZg");

// Fetch and display app details
async function fetchAppDetail() {
  try {
    const response = await datasheet.record.query({ recordIds: [recordId] });

    if (response.success) {
      const app = response.data[0];
      document.getElementById('app-name').innerText = app.fields.Name;
      document.getElementById('app-image').src = app.fields.Image[0].url;
      document.getElementById('app-description').innerText = app.fields.Description;
      document.getElementById('app-tags').innerText = app.fields.Tags.join(', ');
      document.getElementById('app-status').innerText = app.fields.Installed;
    } else {
      console.error('Failed to load app details', response);
    }
  } catch (error) {
    console.error('Error fetching app details:', error);
  }
}

// Go back to the home page
function goBack() {
  window.history.back();
}

// Load app details on page load
window.onload = fetchAppDetail;