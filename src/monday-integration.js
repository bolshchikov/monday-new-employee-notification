const fetch = require('node-fetch');
const { API_BASE_URL, COLUMN_IDS } = require('./monday-constants');

const NEW_HIRE_BOARD_ID = process.env.NEW_HIRE_BOARD_ID;
const USER_ID = process.env.USER_ID;
const MONDAY_API_TOKEN = process.env.MONDAY_API_TOKEN;

const addNewHireName = (name) => {
  const url = `${API_BASE_URL}/v1/boards/${NEW_HIRE_BOARD_ID}/pulses.json?api_key=${MONDAY_API_TOKEN}`;

  return fetch(url, {
    credentials: 'omit',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `user_id=${USER_ID}&pulse%5Bname%5D=${name}`,
    method: 'POST',
    mode: 'cors'
  }).then(res => res.json());
};

const setColumnValue = ([path, bodyParam], columnId, value, pulseId) => {
  const url = `${API_BASE_URL}/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${columnId}/${path}.json?api_key=${MONDAY_API_TOKEN}`;

  return fetch(url, {
    credentials: 'omit',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: `pulse_id=${pulseId}&${bodyParam}=${value}`,
    method: 'PUT',
    mode: 'cors'
  }).then(res => res.json());
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

const setMentor = (mentorName, pulseId) => {
  return setTextColumnValue(COLUMN_IDS.mentor, mentorName, pulseId);
}

const setJoinDate = (date, pulseId) => {
  return setColumnValue(['date', 'date_str'], COLUMN_IDS.date, date, pulseId);
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
  setMentor,
  setJoinDate,
  setWelcomeTalkStatus,
  setCrashCourseParticipationStatus
}