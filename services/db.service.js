require('dotenv').config()
var dayjs = require('dayjs')
const { formatWeatherPrediccionsDB } = require('../utils/utils')
const { createWeatherPrediction, getWeatherDB } = require('../repositories/weather.repository')

const saveWeatherPrediction = async(cityData, predData) => {
  let i = 1
  do {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + i)
    let newData = formatWeatherPrediccionsDB(cityData, predData, tomorrow, (i - 1))
    await createWeatherPrediction(newData)
    i++
  } while (i <= 5);

}

const getWeather = async() => {
  return await getWeatherDB()
}
module.exports = {
  saveWeatherPrediction,
  getWeather
}