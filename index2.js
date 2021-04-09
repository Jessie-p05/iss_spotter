const { nextISSTimesForMyLocation} = require('./iss_promised');


// fetchMyIP()
// .then(response => fetchCoordsByIP(response))
// .then(response => fetchISSFlyOverTimes(response))
// .then(response =>console.log(response))


const printPassTimes = function(passTimes) {
  // console.log(passTimes)
  for (const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

// nextISSTimesForMyLocation((printPassTimes));

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });