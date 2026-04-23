const axios = require('axios');
const fs = require('fs');
const path = require('path');

// This is the correct way to load and initialize dotenv in one go:
require('dotenv').config();
// Configuration - Replace these or use environment variables
const CLIENT_ID = process.env.XRAY_CLIENT_ID; //GETTING THIS FROM ENV VARS FOR SECURITY
const CLIENT_SECRET = process.env.XRAY_CLIENT_SECRET;
const REPORT_PATH = path.join(__dirname, 'reports', 'report.json');


async function uploadToXray() {
    try {
        console.log('--- Starting Xray Upload ---');

        // 1. Authenticate with Xray
        console.log('Authenticating...');
        const authResponse = await axios.post('https://xray.cloud.getxray.app/api/v2/authenticate', {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        });
        const token = authResponse.data;

        // 2. Read the Cucumber JSON file
        if (!fs.existsSync(REPORT_PATH)) {
            throw new Error(`Report file not found at: ${REPORT_PATH}`);
        }
        const reportData = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf-8'));

        // 3. Import to Xray
        console.log('Uploading report to Jira...');
        const xrayResponse = await axios.post(
            'https://xray.cloud.getxray.app/api/v2/import/execution/cucumber',
            reportData,
            {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ Success! Test Execution created:', xrayResponse.data.testExecKey);
    } catch (error) {
        console.error('❌ Error uploading to Xray:');
        if (error.response) {
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }
        process.exit(1);
    }
}

uploadToXray();