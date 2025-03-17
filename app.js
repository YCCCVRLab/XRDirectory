// API setup
const APITable = require('apitable').default;  // Fix: Correct import based on the guide
const apiToken = process.env.APITOKEN;
const apitable = new APITable({ token: apiToken, fieldKey: 'name' });
const datasheet = apitable.datasheet("dstljdoHCE54Pk2QZg");

// Fetch and display apps
async function fetchApps() {
  try {
    const response = await datasheet.records.query({ viewId: "viw6ZEpbVVxlS" });

    if (response.success) {
      const apps = response.data.records;
      displayApps(apps);
    } else {
      console.error('Failed to load apps', response);
    }
  } catch (error) {
    console.error('Error fetching apps:', error);
  }
}

// Display the apps
function displayApps(apps) {
  const appList = document.getElementById('app-list');
  appList.innerHTML = '';
  
  apps.forEach(app => {
    const appCard = document.createElement('div');
    appCard.classList.add('app-card');
    appCard.onclick = () => viewAppDetail(app);

    appCard.innerHTML = `
      <img src="${app.fields.Image[0].url}" alt="${app.fields.Name}">
      <h3>${app.fields.Name}</h3>
      <p>${app.fields.Description.substring(0, 100)}...</p>
    `;
    
    appList.appendChild(appCard);
  });
}

// Handle the search functionality
function searchApps() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const filteredApps = apps.filter(app => app.fields.Name.toLowerCase().includes(query));
  displayApps(filteredApps);
}

// View app details
function viewAppDetail(app) {
  window.location.href = `app-detail.html?recordId=${app.recordId}`;
}

// Load apps on page load
window.onload = fetchApps;