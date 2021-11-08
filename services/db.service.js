require('dotenv').config()
var dayjs = require('dayjs')
const { asyncForEach, formatCovidAux, formatCovidPast: formatCovidSum } = require('../utils/utils')
const { createWeather } = require('../repositories/weather.repository')

const saveWeather = async(cityId, name, country, weatherList) => {

  await asyncForEach(weatherList, async(weather) => {
    let date = dayjs.unix(weather.dt).toDate();
    date = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    const auxWeather = {
      cityId: cityId,
      cityName: name,
      country: country,
      date: date,
      temp: Math.round(weather.main.temp - 273),
      tempMin: Math.round(weather.main.temp_min - 273),
      tempMax: Math.round(weather.main.temp_max - 273),
      feelsLike: Math.round(weather.main.feels_like - 273),
      windSpeed: weather.wind.speed, // meter/sec
      windDeg: weather.wind.deg, // degrees (meteorological)
      weatherMain: weather.weather[0].main
    }
    await createWeather(auxWeather);
  });
}


const saveCovidCases = async(covidData) => {
  let newData = formatCovidAux(covidData)
  await createCovidCases(newData)
}

const saveCovidDeaths = async(covidData) => {
  let newData = formatCovidAux(covidData)
  await createCovidDeaths(newData)
}

const saveCovidActiveCasesSum = async(covidData) => {
  let newData = await formatCovidAux(covidData)
  await createCovidActiveCasesSum(newData)
}

const saveCovidActiveCasesDay = async(covidDataCurrent, covidDataPast) => {
  let newData = await formatCovidSum(covidDataCurrent, covidDataPast)
  await createCovidActiveCasesDay(newData)
}

const saveCovidRecoveredSum = async(covidData) => {
  let newData = await formatCovidAux(covidData)
  await createCovidRecoveredSum(newData)
}

const saveCovidRecoveredDay = async(covidDataCurrent, covidDataPast) => {
  let newData = await formatCovidSum(covidDataCurrent, covidDataPast)
  await createCovidRecoveredDay(newData)
}

const saveCovidTestSum = async(covidData) => {
  let newData = await formatCovidAux(covidData)
  await createCovidTestSum(newData)
}

const saveCovidTestDay = async(covidDataCurrent, covidDataPast) => {
  let newData = await formatCovidSum(covidDataCurrent, covidDataPast)
  await createCovidTestDay(newData)
}

module.exports = {
  saveWeather,
  saveCovidCases,
  saveCovidDeaths,
  saveCovidActiveCasesSum,
  saveCovidActiveCasesDay,
  saveCovidRecoveredSum,
  saveCovidRecoveredDay,
  saveCovidTestSum,
  saveCovidTestDay
}