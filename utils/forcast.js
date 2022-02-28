const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const urlGeo = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=fcd73a3597bfd2d1e0a7bf76a147a393`;
  request({ url: urlGeo, json: true }, (error, { body }) => {
    let city;
    if (error) {
      callback("Problem in get the long and lat ", undefined);
    } else if (body.code) {
      callback(body.code + body.message);
    } else if (body.length === 0) {
      callback("this geolocation is not valid it may be on milkway", undefined);
    } else {
      try {
        if (body[0].name) {
          city = body[0].name;
          console.log(city);
        }
      } catch (e) {
        console.log("The BullShit API cant find that city from lon lat");
      }
    }
    if (city !== undefined) {
      console.log("dick");
      const urlForcast = `https://api.weatherapi.com/v1/forecast.json?key=122473ea8c4b4cec923164030220402&q=${city}&days=1&aqi=yes&alerts=no&lang=ar`;
      request({ url: urlForcast, json: true }, (error, response) => {
        if (error) {
          callback(
            "Some Error happend in finding weather of city : " + city,
            undefined
          );
        } else if (response.body.error) {
          callback("Unable to find location", undefined);
        } else {
          callback(
            undefined,
            `the weather of ${response.body.location.name} is ${response.body.current.condition.text} & the degree is : ${response.body.current.temp_c}C`
          );
        }
      });
    }
  });
};

module.exports = forecast;
