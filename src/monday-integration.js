const fetch = require('node-fetch');
const { API_BASE_URL, COLUMN_IDS } = require('./monday-constants');

const encodeBody = (body) => {
  return Object.keys(body).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&');
}

const mondayRequest = (url, method, body) => {
  const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;
  const signedUrl = `${url}?api_key=${MONDAY_API_TOKEN}`;
  return fetch(signedUrl, {
    credentials: 'omit',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: encodeBody(body),
    method,
    mode: 'cors'
  })
  .then(res => res.json())
}

const addNewHireName = (name) => {
  const USER_ID = process.env.USER_ID;
  const NEW_HIRE_BOARD_ID = process.env.NEW_HIRE_BOARD_ID;
  const url = `${API_BASE_URL}/v1/boards/${NEW_HIRE_BOARD_ID}/pulses.json`;
  return mondayRequest(url, 'POST', {
    'user_id': USER_ID,
    'pulse[name]': name
  }).then(data => data.pulse.id);
};

const setColumnValue = ([path, bodyParam], columnId, value, pulseId) => {
  const NEW_HIRE_BOARD_ID = process.env.NEW_HIRE_BOARD_ID;
  const url = `${API_BASE_URL}/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${columnId}/${path}.json`;
  return mondayRequest(url, 'PUT', {
    'pulse_id': pulseId,
    [bodyParam]: value
  });
}

const setTextColumnValue = (columnId, value, pulseId) => {
  return setColumnValue(['text', 'text'], columnId, value, pulseId);
}

const setStatusColumnValue = (columnId, colorCode, pulseId) => {
  return setColumnValue(['status', 'color_index'], columnId, colorCode, pulseId);
}

const setTeam = (teamName, pulseId) => {
  return setTextColumnValue(COLUMN_IDS.team, teamName, pulseId);
};

const setTeamLead = (teamLead, pulseId) => {
  return setTextColumnValue(COLUMN_IDS.team_lead, teamLead, pulseId);
};

const setJoinDate = (date, pulseId) => {
  return setColumnValue(['date', 'date_str'], COLUMN_IDS.joined_date, date, pulseId);
};

const setWelcomeTalkStatus = (colorCode, pulseId) => {
  return setStatusColumnValue(COLUMN_IDS.welcome_talk, colorCode, pulseId);
};
const setCrashCourseParticipationStatus = (colorCode, pulseId) => {
  return setStatusColumnValue(COLUMN_IDS.crash_course, colorCode, pulseId);
}

module.exports = {
  addNewHireName,
  setTeam,
  setTeamLead,
  setJoinDate,
  setWelcomeTalkStatus,
  setCrashCourseParticipationStatus
}