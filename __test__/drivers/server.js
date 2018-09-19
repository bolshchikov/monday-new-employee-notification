const base64 = require('base-64');
const fetch = require('node-fetch');

let USER_NAME = 'fake-user-name';
let USER_PASSWORD = 'fake-user-password';

module.exports = {
  registerEnvVariables: (userName = USER_NAME, password = USER_PASSWORD) => {
    process.env['USER_NAME'] = userName;
    process.env['USER_PASSWORD'] = password;
    USER_NAME = userName;
    USER_PASSWORD = password;
  },
  startServer: () => {
    return require('../../src/server').start();
  },
  stopServer: () => {
    return require('../../src/server').stop();
  },
  makePingRequest: () => {
    return fetch('http://localhost:1337/ping');
  },
  makeAddRequestWithoutCredentials: () => {
    return fetch('http://localhost:1337/api/add', {
      method: 'POST'
    });
  },
  makeAddRequest: (subject, body) => {
    return fetch('http://localhost:1337/api/add', {
      credentials: 'omit',
      mode: 'cors',
      method: 'POST',
      headers: { 
        'content-type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(USER_NAME + ":" + USER_PASSWORD)
      },
      body: JSON.stringify({
        subject,
        body
      })
    });
  }
};