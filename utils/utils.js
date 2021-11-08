var moment = require('moment');

const asyncForEach = async(array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const formatWeatherDB = (weatherData) => {
  let data = []
  weatherData.forEach((element) => {
    data.push(element._doc);
  })
  return data
}

module.exports = {
  asyncForEach,
  formatWeatherDB
}