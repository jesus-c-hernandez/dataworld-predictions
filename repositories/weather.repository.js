const Weather = require('../models/weather.model')
const WeatherPrediction = require('../models/weather-pred.model')
const mongoose = require('mongoose');

const createWeatherPrediction = async(auxWeather) => {
  try {
    const weatherPrediction = new WeatherPrediction({...auxWeather });
    await weatherPrediction.save();
  } catch (error) {
    console.log(error);
  }
}

const getWeather = async(cityId) => {
  try {
    // let d = new Date(new Date() - (1000 * 60 * 60 * 24 * 5)).setFullYear(2020)
    // let dateRange = new Date(d)
    let d = new Date("2020-10-29T12:00:00.000+00:00")
      // let dateRange = new Date(d)
    return Weather.find({ cityId: cityId, date: { "$gte": d } });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createWeatherPrediction,
  getWeather
}