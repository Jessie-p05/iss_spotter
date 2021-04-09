const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json')
};

const fetchCoordsByIP = function(body) {
  const data = JSON.parse(body);
  return request(`https://freegeoip.app/json/${data.ip}`)
};

const fetchISSFlyOverTimes = function(body) {
  const coords = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`)
}

// const nextISSTimesForMyLocation = function(callback) {
//   fetchMyIP()
//   .then(response => fetchCoordsByIP(response))
//   .then(response => fetchISSFlyOverTimes(response))
//   .then((response) => {
//     const data = JSON.parse(response).response;
//     callback(data);
//   })
// }  

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


module.exports = {nextISSTimesForMyLocation}