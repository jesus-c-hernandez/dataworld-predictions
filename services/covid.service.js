const axios = require('axios');
require('dotenv').config();
// var moment = require('moment');
// const FilterPropertiesService = require('./filter-properties.service.js')

let config = {
  headers: {
    'Authorization': 'Bearer ' + process.env.API_KEY_COVID
  }
}

class CovidService {
  async getTodayCases(country) {
    const resp = await axios.get(`${process.env.COVID_DIR}/todayCases?country=${country}`, config)
      // console.log(resp);
      // const data = {
      //   "date": moment(new Date()), //.format("2021-10-27T10:12:00.000Z"),
      //   "country": country,
      //   "data": Math.floor(Math.random(10000, 800) * 1000)
      // }
    return resp.data;
  }

  async getTodayDeaths(country) {
    const resp = await axios.get(`${process.env.COVID_DIR}/todayDeaths?country=${country}`, config)
      // console.log(resp.data);
      // const data = {
      //   "date": moment(new Date()), //.format("2021-10-27T10:12:00.000Z"),
      //   "country": country,
      //   "data": Math.floor(Math.random(10000, 800) * 1000)
      // }
    return resp.data;
  }

  async getActiveCasesSum(country) {
    const resp = await axios.get(`${process.env.COVID_DIR}/active?country=${country}`, config)
      // console.log(resp.data);
      // const data = {
      //   "date": moment(new Date()), //.format("2021-10-27T10:12:00.000Z"),
      //   "country": country,
      //   "data": Math.floor(Math.random(10000, 800) * 1000)
      // }
    return resp.data;
  }

  async getRecoveredCases(country) {
    const resp = await axios.get(`${process.env.COVID_DIR}/recovered?country=${country}`, config)
      // console.log(resp.data);
      // const data = {
      //   "date": moment(new Date()), //.format("2021-10-27T10:12:00.000Z"),
      //   "country": country,
      //   "data": Math.floor(Math.random(10000, 800) * 1000)
      // }
    return resp.data;
  }

  async getTestTotals(country) {
    const resp = await axios.get(`${process.env.COVID_DIR}/totalTests?country=${country}`, config)
      // console.log(resp.data);
      // const data = {
      //   "date": moment(new Date()), //.format("2021-10-27T10:12:00.000Z"),
      //   "country": country,
      //   "data": Math.floor(Math.random(10000, 800) * 1000)
      // }
    return resp.data;
  }

}

module.exports = new CovidService()