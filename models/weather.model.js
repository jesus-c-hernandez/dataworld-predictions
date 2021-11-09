const { Schema, model } = require('mongoose')

const WeatherSchema = Schema({
  cityId: String,
  cityName: String,
  country: String,
  date: Date,
  temp: Number,
  tempMin: Number,
  tempMax: Number,
  feelsLike: Number,
  windSpeed: Number,
  windDeg: Number,
  weatherMain: String,
  weatherMainCode: Number
});

WeatherSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('Weather', WeatherSchema);