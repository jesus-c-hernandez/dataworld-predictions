var brain = require('brain.js'); // require

const predictionsWeather = async(cityId, data) => {

  const net = new brain.recurrent.LSTMTimeStep()

  let trainData = []
  data.forEach((element) => {
    trainData.push(Number(element.temp))
  })
  let hola = [trainData]
  net.train(hola)

  /* Predicción */
  var result = net.run([23, 90]);
  console.log(Math.round(result));
}

module.exports = {
  predictionsWeather
}