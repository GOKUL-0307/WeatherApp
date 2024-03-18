const request = require('request');

const openWeatherMap = {
    BASE_URL: "http://api.weatherapi.com/v1/current.json?",
    SECRET_KEY: "69b2e2b66cfb43159a961102241103"
}

const weatherData = (address, callback) => {
    const url = openWeatherMap.BASE_URL +"key=" + openWeatherMap.SECRET_KEY + '&q='+ address; 

    //console.log("URL:", url);

    request({ url, json: true }, (error, response) => {
        console.log(response)
        if (error) {
            callback(true, "Unable to fetch data, please try again" + error);
        } else {
            callback(false, response.body);
        }
    });
};


module.exports = weatherData;
