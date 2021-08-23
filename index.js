const { fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTimes } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('IP address is: ', ip);
});

fetchCoordsByIP('142.120.88.25', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('Coordinates are: ',coordinates);
});

fetchISSFlyoverTimes({ latitude: '43.7489', longitude: '-79.4422' }, (error, flyovers) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  console.log('Time of ISS flyovers are: ', flyovers);
});