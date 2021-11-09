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

const formatFechasPast = () => {
  const days = []
    // Días atras
  for (let i = 2; i > 0; i--) {
    let d = new Date(new Date() - (1000 * 60 * 60 * 24 * i)).setFullYear(2020)
    days.push(new Date(d));
  }
  //Hoy
  days.push(new Date(new Date()).setFullYear(2020))

  // Días futuro
  let i = 1
  do {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + i)
    days.push(new Date(tomorrow.setFullYear(2020)))
    i++
  } while (i <= 2);

  //Formato
  let dateRange = []
  days.forEach((element) => {
    dateRange.push(new Date(element))
  })
  return dateRange
}

module.exports = {
  asyncForEach,
  formatWeatherDB,
  formatFechasPast
}