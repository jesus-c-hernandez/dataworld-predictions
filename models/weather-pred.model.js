const { Schema, model } = require('mongoose')

const WeatherPredictionTempSchema = Schema({
  cityId: String,
  cityName: String,
  country: String,
  date: Date,
  temp: String,
  tempMin: String,
  tempMax: String
});

WeatherPredictionTempSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('WeatherPrediction', WeatherPredictionTempSchema);