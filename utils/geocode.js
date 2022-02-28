const request = require("request");
const geocode = (adrress, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    adrress +
    ".json?access_token=pk.eyJ1IjoibW9odGhyIiwiYSI6ImNremEweWUyZzBjc2cybnMyZXUwZXh0d3YifQ.uOQibBXXa4HID9MZWlF9sA&limit=1";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Error in get map box api", undefined);
    } else if (response.body.error) {
      callback("Unable to find correct info", undefined);
    } else if (response.body.message) {
      callback("there was an error : " + response.body.message, undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find this location try again", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
