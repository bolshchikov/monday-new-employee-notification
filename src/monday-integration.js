const fetch = require('node-fetch');

const NEW_HIRE_BOARD_ID = process.env.NEW_HIRE_BOARD_ID;
const USER_ID = process.env.USER_ID;
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;

const url = `https://api.monday.com:443/v1/boards/${NEW_HIRE_BOARD_ID}/pulses.json?api_key=${MONDAY_API_TOKEN}`;

const addNewHire = (name) => {
  return fetch(url, {
    "credentials": "omit",
    "headers": { "content-type": "application/x-www-form-urlencoded" },
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": `user_id=${USER_ID}&pulse%5Bname%5D=${name}&pulse%text20%5D=Promote&pulse%text2%5D=Vasuya&pulse%date%5D=02-Aug-2020&pulse%status2%5D=No&pulse%status9%5D=No&pulse%location%5D=Tel%20Aviv,%20Israel`,
    "method": "POST",
    "mode": "cors"
  }).then(res => res.json());

};

module.exports = {
  addNewHire
}