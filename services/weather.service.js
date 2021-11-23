const { createWeatherPrediction } = require("../repositories/weather.repository");
const { mainToCode, codeToMain } = require("../utils/utils");
const brain = require('brain.js'); // require
require('dotenv').config();
const axios = require('axios');
const dayjs = require('dayjs')

const predictionsMinWeather = async(cityId, data, daysPast) => {
  // Declarar la neurona
  const net = new brain.recurrent.LSTMTimeStep()

  // Temperatura. 
  let trainDataTemp = []
  data.forEach((element) => {
    trainDataTemp.push(Number(element.tempMin))
  })

  net.train([trainDataTemp])

  let result = []
  let i = 0
  let dayPastTempMin = []
  daysPast.forEach((e) => {
    dayPastTempMin.push(e.temp_min)
  })
  do {
    /* Predicción Temp Minima */
    var temp = net.run(dayPastTempMin);
    dayPastTempMin.push(Math.round(temp))
    result.push(Math.round(temp))
    i++
  } while (i < 5);
  return result
}

const predictionsMaxWeather = async(cityId, data, daysPast) => {
  // Declarar la neurona
  const net = new brain.recurrent.LSTMTimeStep()

  // Temperatura. 
  let trainDataTemp = []
  data.forEach((element) => {
    trainDataTemp.push(Number(element.tempMax))
  })

  net.train([trainDataTemp])

  let result = []
  let i = 0
  let dayPastTempMax = []
  daysPast.forEach((e) => {
    dayPastTempMax.push(e.temp_max)
  })
  do {
    /* Predicción Temp Minima */
    var temp = net.run(dayPastTempMax);
    result.push(Math.round(temp))
    i++
  } while (i < 5);
  return result
}

const predictionsMainWeather = async(cityId, data, daysPast) => {
  // Declarar la neurona
  const net = new brain.recurrent.LSTMTimeStep()

  // Temperatura. 
  let trainDataTemp = []
  data.forEach((element) => {
    trainDataTemp.push(Number(element.weatherMainCode))
  })

  net.train([trainDataTemp])

  let result = []
  let i = 0
  let dayPastTempMain = []
  daysPast.forEach((e) => {
    let code = mainToCode(e.wheatherMain)
    dayPastTempMain.push(code)
  })

  do {
    /* Predicción Temp Minima */
    var main = net.run(dayPastTempMain);
    let res = {
      weatherMain: codeToMain(Math.round(main)),
      weatherMainCode: Math.round(main)
    }
    result.push(res)
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
        temp_min: Math.round(element.main.temp_min - 273),
        wheatherMain: element.weather[0].main
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
  predictionsMinWeather,
  predictionsMaxWeather,
  predictionsMainWeather,
  getWeatherPast
}