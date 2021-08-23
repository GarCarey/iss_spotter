const { nextISSTimesForMyLocation } = require('./iss');

const printFlyoverTimes = function(passTimes) {
  for( const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  //success, print out the deets
  printFlyoverTimes(passTimes);
});

//fetchMyIP((error, ip) => {
//  if (error) {
//    nextISSTimesForMyLocation(error, null);
//  }
//
//  console.log('IP address is: ', ip);
//});
//
//fetchCoordsByIP('142.120.88.25', (error, coordinates) => {
//  if (error) {
//    nextISSTimesForMyLocation(error, null);
//  }
//
//  console.log('Coordinates are: ',coordinates);
//});
//
//fetchISSFlyoverTimes({ latitude: '43.7489', longitude: '-79.4422' }, (error, flyovers) => {
//  if (error) {
//    nextISSTimesForMyLocation(error, null);
//  }
//
//  console.log('Time of ISS flyovers are: ', flyovers);
//});