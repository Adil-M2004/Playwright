const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

async function uploadResults() {
    const clientID = process.env.XRAY_CLIENT_ID;
    const clientSecret = process.env.XRAY_CLIENT_SECRET;

    try {
        // Step A: Authenticate and get Token
        const authResponse = await axios.post('https://xray.cloud.getxray.app/api/v2/authenticate', {
            client_id: clientID,
            client_secret: clientSecret
        });
        const token = authResponse.data;

        // Step B: Read the JSON report
        const reportData = fs.readFileSync('./reports/report.json');

        // Step C: Send to Xray
        // Use /api/v2/import/execution/cucumber
        const response = await axios.post(
            'https://xray.cloud.getxray.app/api/v2/import/execution/cucumber',
            reportData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        console.log('Successfully uploaded to Xray! Execution Key:', response.data.key);
    } catch (error) {
        console.error('Upload failed:', error.response ? error.response.data : error.message);
    }
}

uploadResults();