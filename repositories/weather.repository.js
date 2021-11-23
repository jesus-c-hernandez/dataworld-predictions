const Weather = require('../models/weather.model')
const WeatherPrediction = require('../models/weather-pred.model')
const { formatFechasPast } = require('../utils/utils');

const createWeatherPrediction = async(auxWeather) => {
  try {
    const weatherPrediction = new WeatherPrediction({...auxWeather });
    await weatherPrediction.save();
  } catch (error) {
    console.log(error);
  }
}

const getWeatherDB = async(cityId) => {
  try {
    let dateRange = formatFechasPast()
    let dataCruda = await Weather.find({
      // cityId: cityId,
      date: { "$gte": new Date(dateRange[0]) },
      "$lte": new Date(dateRange[dateRange.length - 1])
    });
    return dataCruda
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createWeatherPrediction,
  getWeatherDB
}