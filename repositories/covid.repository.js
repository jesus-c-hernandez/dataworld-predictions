const CovidCase = require('../models/covid-cases.model')
const CovidDeath = require('../models/covid-deaths.model')
const CovidActiveCaseSum = require('../models/covid-active-cases-sum.model')
const CovidActiveCasesDay = require('../models/covid-active-cases-day.model')
const CovidRecoveredSum = require('../models/covid-recovered-cases-sum.model')
const CovidRecoveredDay = require('../models/covid-recovered-cases-day.model')
const CovidTestSum = require('../models/covid-test-sum.model')
const CovidTestDay = require('../models/covid-test-day.model')
var moment = require('moment');

const createCovidCases = async(auxCovid) => {
  try {
    const covidData = new CovidCase({...auxCovid });
    await covidData.save();
  } catch (error) {
    console.log(error);
  }
}

const createCovidDeaths = async(auxCovid) => {
  try {
    const covidData = new CovidDeath({...auxCovid });
    await covidData.save();
  } catch (error) {
    console.log(error);
  }
}

const createCovidActiveCasesSum = async(auxCovid) => {
  try {
    const covidData = new CovidActiveCaseSum({...auxCovid });
    await covidData.save();
  } catch (error) {
    console.log(error);
  }
}

const createCovidActiveCasesDay = async(auxCovid) => {
  try {
    const covidData = new CovidActiveCasesDay({...auxCovid });
    await covidData.save();
  } catch (error) {
    console.log(error);
  }
}

const createCovidRecoveredSum = async(auxCovid) => {
  try {
    const covidData = new CovidRecoveredSum({...auxCovid });
    await covidData.save();
  } catch (error) {
    console.log(error);
  }
}

const createCovidRecoveredDay = async(auxCovid) => {
  try {
    const covidData = new CovidRecoveredDay({...auxCovid });
    await covidData.save();
  } catch (error) {
    console.log(error);
  }
}

const createCovidTestSum = async(auxCovid) => {
  try {
    const covidData = new CovidTestSum({...auxCovid });
    await covidData.save();
  } catch (error) {
    console.log(error);
  }
}

const createCovidTestDay = async(auxCovid) => {
  try {
    const covidData = new CovidTestDay({...auxCovid });
    await covidData.save();
  } catch (error) {
    console.log(error);
  }
}

const getCovidActiveCasesDay = async(country) => {
  try {
    let yesterday = moment(new Date(new Date() - (1000 * 60 * 60 * 24))).format("DD-MM-YYYY")
    return CovidActiveCaseSum.findOne({ dateQuery: yesterday, country: country });
  } catch (error) {
    console.log(error);
  }
}

const getCovidRecoveredDay = async(country) => {
  try {
    let yesterday = moment(new Date(new Date() - (1000 * 60 * 60 * 24))).format("DD-MM-YYYY")
    return CovidRecoveredSum.findOne({ dateQuery: yesterday, country: country });
  } catch (error) {
    console.log(error);
  }
}

const getCovidTestDay = async(country) => {
  try {
    let yesterday = moment(new Date(new Date() - (1000 * 60 * 60 * 24))).format("DD-MM-YYYY")
    return CovidTestSum.findOne({ dateQuery: yesterday, country: country });
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  createCovidCases,
  createCovidDeaths,
  createCovidActiveCasesSum,
  createCovidActiveCasesDay,
  getCovidActiveCasesDay,
  createCovidRecoveredSum,
  createCovidRecoveredDay,
  getCovidRecoveredDay,
  createCovidTestSum,
  createCovidTestDay,
  getCovidTestDay
}