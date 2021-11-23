require("dotenv").config();
const CronJob = require("cron").CronJob;
const { cityList } = require("./lists/city.list.filtered.json");
const { asyncForEach, formatWeatherDB } = require("./utils/utils");
const { dbConnection } = require("./database/config");
const { getWeather, saveWeatherPrediction } = require("./services/db.service");
const { predictionsMinWeather, predictionsMaxWeather, predictionsMainWeather, getWeatherPast } = require("./services/weather.service");
let isDBOnline = false;
let c = 0

const initWeatherPredictions = async() => {
  // Obtener el arreglo de las ciudades
  // Hacer la peticion al bd para tener los datos de los 5 días atras
  // let newCities = cityList.filter(w => w.id === 3435907)
  let newCities = cityList.slice(0, 100)
  const weatherDB = await getWeather()
  await asyncForEach(newCities, async(city) => {
    console.log('ID: ' + city.id + ' - Name: ' + city.name);
    // Dar formato al resultado de la bd
    const weatherDBFormat = formatWeatherDB(weatherDB)

    // Predecir el clima de los proximos 5 días
    let n = weatherDBFormat.filter(w => Number(w.cityId) === city.id)
    let daysPast = await getWeatherPast(city.id)
    const predTempMin = await predictionsMinWeather(city.id, n, daysPast)
    const predTempMax = await predictionsMaxWeather(city.id, n, daysPast)
    const predTempMain = await predictionsMainWeather(city.id, n, daysPast)
    const predictions = {
      predTempMin,
      predTempMax,
      predTempMain
    }
    console.log(predictions);
    // Guardar los datos en db
    await saveWeatherPrediction(city, predictions);
  });
};

const initDB = async() => {
  // Inicializar la base de datos
  await dbConnection();
};

// Pone el valor de cada ciclo según la config, si no lo pone cada 60segs
const seconds = Number(process.env.LOOP_EVERY_SECONDS) ?
  Number(process.env.LOOP_EVERY_SECONDS) :
  60;

// * * * * * * = 1 segundo
const stringTimes = {
  60: "* * * * *",
  30: "*/30 * * * * *",
  120: "*/2 * * * *",
  15: "*/15 * * * * *",
  10: "*/10 * * * * *",
  20: "*/20 * * * * *",
  1: "*/1 * * * * *"
};

const Job = new CronJob(stringTimes[seconds], async() => {
  try {
    console.log('Inicio de tarea', new Date());
    if (!isDBOnline) {
      await initDB();
      isDBOnline = true;
    }
    Job.stop();
    await initWeatherPredictions();
    Job.start();
    console.log("Tarea finalizada", new Date().toISOString());
  } catch (error) {
    console.log(new Date(), error);
  }
});

Job.start();