const Weather = require('../models/weather.model')

const createWeather = async(auxWeather) => {
  try {
    const weather = new Weather({...auxWeather });
    await weather.save();
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
  createWeather
}