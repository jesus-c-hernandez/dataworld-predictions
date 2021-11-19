const { createWeatherPrediction } = require("../repositories/weather.repository");
const { asyncForEach } = require("../utils/utils");
const brain = require('brain.js'); // require
require('dotenv').config();
const axios = require('axios');
const dayjs = require('dayjs')

const predictionsWeather = async(cityId, data) => {
  // Declarar la neurona
  const net = new brain.recurrent.LSTMTimeStep()

  // Temperatura. 
  let trainDataTemp = []
  data.forEach((element) => {
    trainDataTemp.push(Number(element.tempMin))
  })

  net.train([trainDataTemp])


  let daysPast = await getWeatherPast(cityId)
  let result = []
  let i = 0
  let dayPastTempMin = []
  daysPast.forEach((e) => {
    dayPastTempMin.push(e.temp_min)
  })
  do {
    /* Predicción Temp Minima */
    var temp = net.run(dayPastTempMin);
    console.log(Math.round(temp))
    dayPastTempMin.push(Math.round(temp))
    result.push(temp)
    i++
  } while (i < 5);
  return result
}

const getWeatherPast = async(cityId) => {
  const dataDays = []
  const dataWeather = []
    //2  Días atras
  for (let i = 2; i > 0; i--) {
    let dt = new Date(new Date() - (1000 * 60 * 60 * 24 * i))
    let dtEpoch = Math.floor(dt / 1000)
    dataDays.push(dtEpoch);
  }
  for (let i = 0; i < dataDays.length; i++) {
    let data = await getWeather(cityId, dataDays[i])
    data.forEach((element) => {
      let obj = {
        temp_max: Math.round(element.main.temp_max - 273),
        temp_min: Math.round(element.main.temp_min - 273)
      }
      dataWeather.push(obj)
    })
  }
  return dataWeather
}

const getWeather = async(cityId, start) => {
  try {
    const resp = await axios.get(`${process.env.OPW_DIR}id=${cityId}&type=hour&appid=${process.env.appid}&start=${start}&cnt=24`);
    return resp.data.list;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  predictionsWeather
}