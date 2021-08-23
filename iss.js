/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *  - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *  - An error, if nay (nullable)
 *  - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  //use request to fetch address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;

    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching longitude and latitude. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const { latitude, longitude} = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyoverTimes = function({ latitude, longitude }, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
      callback(Error(msg), null);
      return; 
    }

    const flyovers = JSON.parse(body).response;

    callback(null, flyovers);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTimes };
