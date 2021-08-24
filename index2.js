const { nextISSTimesForMyLocation } = require('./iss_promised');


//fetchMyIP()
//.then(fetchCoordsByIP)
//.then(fetchISSFlyoverTimes)
//.then 
//.then(body => console.log(body));

const printFlyoverTimes = function(passTimes) {
  for( const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
.then((passTimes) => {
  printFlyoverTimes(passTimes);
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});