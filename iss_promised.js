const request = require('request-promise-native');

const fetchMyIP = (() => {
  return request('https://api.ipify.org/?format=json');
});

const fetchCoordsByIP = ((body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
});

const fetchISSFlyoverTimes = ((body) => {
  const { latitude, longitude } = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
});

const nextISSTimesForMyLocation = (() => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyoverTimes)
    .then((data) => {
      const response = JSON.parse(data).response;
      return response;
    });
});

module.exports = { nextISSTimesForMyLocation };