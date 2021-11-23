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

const formatWeatherPrediccionsDB = (cityData, predData, day, i) => {
  let data = {
    cityId: cityData.id,
    cityName: cityData.name,
    country: cityData.country,
    date: day,
    weatherMainCode: predData.predTempMain[i].weatherMainCode,
    weatherMain: predData.predTempMain[i].weatherMain,
    tempMin: predData.predTempMin[i],
    tempMax: predData.predTempMax[i]
  }
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

const mainToCode = (main) => {
  switch (main) {
    case 'Thunderstorm':
      return 1;
    case 'Drizzle':
      return 2;
    case 'Rain':
      return 3;
    case 'Snow':
      return 4;
    case 'Mist':
      return 5;
    case 'Smoke':
      return 6;
    case 'Haze':
      return 7;
    case 'Dust':
      return 8;
    case 'Fog':
      return 9;
    case 'Sand':
      return 10;
    case 'Dust':
      return 11;
    case 'Ash':
      return 12;
    case 'Squall':
      return 13;
    case 'Tornado':
      return 14;
    case 'Clear':
      return 15;
    case 'Clouds':
      return 16;
  }
  return 15;
}

const codeToMain = (main) => {
  switch (main) {
    case 1:
      return 'Thunderstorm';
    case 2:
      return 'Drizzle';
    case 3:
      return 'Rain';
    case 4:
      return 'Snow';
    case 5:
      return 'Mist';
    case 6:
      return 'Smoke';
    case 7:
      return 'Haze';
    case 8:
      return 'Dust';
    case 9:
      return 'Fog';
    case 10:
      return 'Sand';
    case 11:
      return 'Dust';
    case 12:
      return 'Ash';
    case 13:
      return 'Squall';
    case 14:
      return 'Tornado';
    case 15:
      return 'Clear';
    case 16:
      return 'Clouds';
  }
  return 'Clear';
}

module.exports = {
  asyncForEach,
  formatWeatherDB,
  formatFechasPast,
  mainToCode,
  codeToMain,
  formatWeatherPrediccionsDB
}