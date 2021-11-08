const { Schema, model } = require('mongoose')

const WeatherSchema = Schema({
  cityId: String,
  cityName: String,
  country: String,
  date: Date,
  temp: String,
  tempMin: String,
  tempMax: String,
  feelsLike: String,
  windSpeed: String,
  windDeg: String,
  weatherMain: String
});

WeatherSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Weather', WeatherSchema);