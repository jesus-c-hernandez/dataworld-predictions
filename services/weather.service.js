const { createWeatherPrediction } = require("../repositories/weather.repository");
const brain = require('brain.js'); // require
require('dotenv').config();
const axios = require('axios');
const dayjs = require('dayjs')

const predictionsWeather = async(cityId, data) => {
  // Declarar la neurona
  const net = new brain.recurrent.LSTMTimeStep()

  // Temperatura. 
  // let trainDataTemp = []
  // data.forEach((element) => {
  //   trainDataTemp.push(Number(element.temp))
  // })
  // net.train([trainDataTemp])

  const daysPast = []
    // Días atras
  for (let i = 2; i > 0; i--) {
    let d = new Date(new Date() - (1000 * 60 * 60 * 24 * i)).getTime() / 1000
    daysPast.push(d);
  }
  console.log(daysPast);

  let dataAPI = []
  daysPast.forEach(async(element) => {
    let data = await getWeather(cityId, Math.round(element))
    dataAPI.push(data)
  })

  let i = 0
  do {
    /* Predicción */
    var temp = net.run(dataAPI);
    console.log(Math.round(temp));
    trainDataTemp.push(Math.round(temp))
    i++
  } while (i < 5);
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