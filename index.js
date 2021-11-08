require("dotenv").config();
const CronJob = require("cron").CronJob;
const { cityList } = require("./lists/city.list.filtered.json");
const { asyncForEach, formatWeatherDB } = require("./utils/utils");
const { dbConnection } = require("./database/config");
const { getWeather } = require("./repositories/weather.repository");
const { predictionsWeather } = require("./services/weather.service");
let isDBOnline = false;
let start = 1604019600; // 29/10/2020 01:00:00
let counter = 0;

const initWeatherPredictions = async() => {
  // Obtener el arreglo de las ciudades
  await asyncForEach(cityList, async(city) => {
    // Hacer la peticion al bd para tener los datos de los 5 días atras
    const weatherDB = await getWeather(city.id)

    // Dar formato al resultado de la bd
    const weatherDBFormat = formatWeatherDB(weatherDB)
      // Predecir el clima de los proximos 5 días
    const prediciones = predictionsWeather(city.id, weatherDBFormat)

    // Guardar los datos en db
    // await saveWeather(city.id, city.name, city.country, listWeather);
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