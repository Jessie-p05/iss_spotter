/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const ip = data.ip;
    callback(error, ip);
  });
};


const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    // console.log(data)
    // const ip = data.ip;
    const geoInfo = JSON.parse(body);
    callback(null, geoInfo);

  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    // console.log(data)
    // const ip = data.ip;
    const flyoverTime = data.response;
    callback(null, flyoverTime);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error,ip) =>{
    if (error) {
          callback(error,null)
        } 
    fetchCoordsByIP(ip,(error,geoInfo) => {
      if (error) {
        callback(error,null)
      } 
      fetchISSFlyOverTimes(geoInfo,(error,flyoverTime) =>{
        if (error) {
          callback(error,null)
        } 
        callback (error,flyoverTime)
      })
    })      
        
  })

}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation};
