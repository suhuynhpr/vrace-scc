/** @type {import('next').NextConfig} */
const schedule = require('node-schedule');
const fetch = require('node-fetch');
const teams = require('./data/teams.json');

const apiUrl = 'http://localhost:3000/api/fetchData'; // Địa chỉ API route đã tạo

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (isServer) {
      // scheduleApiCall();
    }
    return config;
  },
};


const scheduleApiCall = async () => {
  // schedule.scheduleJob('0 */8 * * *', async () => {
    
    try {
      console.log('reload')
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teams }),
      });
      if (response.ok) {
        console.log('Scheduled API call was successful.');
      } else {
        console.error(
          'Error during the scheduled API call:',
          response.statusText
        );
      }
    } catch (error) {
      console.error('An error occurred during the scheduled API call:', error);
    }
  // });
};

module.exports = nextConfig;
