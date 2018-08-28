const axios = require('axios');
const FormData = require('form-data');

const NEW_HIRE_BOARD_ID = process.env.NEW_HIRE_BOARD_ID;
const USER_ID = process.env.USER_ID;
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;

const url = `https://api.monday.com:443/v1/boards/${NEW_HIRE_BOARD_ID}/pulses.json?api_key=${MONDAY_API_TOKEN}`;

const addNewHire = (name) => {
  const form = new FormData();
  form.append("user_id", USER_ID);
  form.append("pulse[name]", name);

  return axios.post(url, form);
};

module.exports = {
  addNewHire
}