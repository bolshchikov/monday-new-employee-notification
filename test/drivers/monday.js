const nock = require('nock');
const { API_BASE_URL, COLUMN_IDS, COLOR_CODE } = require('../../src/monday-constants');

const NEW_HIRE_BOARD_ID = 'new-hire-board-mock';
const USER_ID = 'user-id-mock';
const MONDAY_API_TOKEN = 'api-token-mock';

const getEnvVariables = () => {
  return {
    NEW_HIRE_BOARD_ID,
    USER_ID,
    MONDAY_API_TOKEN
  };
};

const registerEnvVariables = () => {
  process.env['NEW_HIRE_BOARD_ID'] = NEW_HIRE_BOARD_ID;
  process.env['USER_ID'] = USER_ID;
  process.env['MONDAY_API_TOKEN'] = MONDAY_API_TOKEN;
};

const buildRequestObject = (method, url, encodedBody) => {
  return nock(API_BASE_URL, {
    reqheaders: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })[method.toLowerCase()](url, encodedBody)
    .query({ api_key: MONDAY_API_TOKEN })
};

const buildCreateNewPulseRequest = (name) => {
  return buildRequestObject(
    'POST',
    `/v1/boards/${NEW_HIRE_BOARD_ID}/pulses.json`,
    `user_id=${USER_ID}&pulse%5Bname%5D=${encodeURIComponent(name)}`
  );
};

const buildSetTeamLeadColumnRequest = (teamLead, pulseId) => {
  return buildRequestObject(
    'PUT',
    `/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${COLUMN_IDS.team_lead}/text.json`,
    `pulse_id=${pulseId}&text=${encodeURIComponent(teamLead)}`
  );
};

const buildSetJoinDateColumnRequest = (date, pulseId) => {
  return buildRequestObject(
    'PUT',
    `/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${COLUMN_IDS.joined_date}/date.json`,
    `pulse_id=${pulseId}&date_str=${encodeURIComponent(date)}`
  );
};

const buildSetTeamColumnValueRequest = (teamName, pulseId) => {
  return buildRequestObject(
    'PUT',
    `/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${COLUMN_IDS.team}/text.json`,
    `pulse_id=${pulseId}&text=${encodeURIComponent(teamName)}`
  );
};

const buildSetCrashCourseColumnRequest = (pulseId) => {
  return buildRequestObject(
    'PUT',
    `/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${COLUMN_IDS.welcome_talk}/status.json`,
    `pulse_id=${pulseId}&color_index=${COLOR_CODE.red}`
  );
};

const buildSetWelcomeTalkColumnRequest = (pulseId) => {
  return buildRequestObject(
    'PUT',
    `/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${COLUMN_IDS.crash_course}/status.json`,
    `pulse_id=${pulseId}&color_index=${COLOR_CODE.red}`
  )
};

module.exports = {
  getEnvVariables,
  registerEnvVariables,
  buildRequestObject,
  buildCreateNewPulseRequest,
  buildSetTeamLeadColumnRequest,
  buildSetJoinDateColumnRequest,
  buildSetTeamColumnValueRequest,
  buildSetCrashCourseColumnRequest,
  buildSetWelcomeTalkColumnRequest,
};