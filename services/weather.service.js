require('dotenv').config();
const axios = require('axios');
let counter = 0;

const getWeather = async(cityId, start) => {
  try {
    const resp = await axios.get(`${process.env.OPW_DIR}id=${cityId}&type=hour&appid=${process.env.API_KEY_OP_1}&start=${start}&cnt=24`);
    return resp.data.list;
  } catch (error) {
    try {
      const resp = await axios.get(`${process.env.OPW_DIR}id=${cityId}&type=hour&appid=${process.env.API_KEY_OP_2}&start=${start}&cnt=24`);
      return resp.data.list;
    } catch (error) {
      const resp = await axios.get(`${process.env.OPW_DIR}id=${cityId}&type=hour&appid=${process.env.API_KEY_OP_3}&start=${start}&cnt=24`);
      return resp.data.list;
    }
  }
}

module.exports = {
  getWeather
}