const nock = require('nock');
const { expect } = require('chai');
const { API_BASE_URL, COLUMN_IDS, COLOR_CODE } = require('../src/monday-constants');

const NEW_HIRE_BOARD_ID = 'new-hire-board-mock';
const USER_ID = 'user-id-mock';
const MONDAY_API_TOKEN = 'api-token-mock';

describe('Monday integrations API', () => {

  before(() => {
    env = process.env;
    process.env = {
      NEW_HIRE_BOARD_ID,
      USER_ID,
      MONDAY_API_TOKEN
    };
  });

  after(() => {
    console.log(nock.pendingMocks());
  })

  it('should create a pulse', async () => {
    const { addNewHireName } = require('../src/monday-integration');
    const name = 'testName';
    const call = nock(API_BASE_URL, {
      reqheaders: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
      .post(`/v1/boards/${NEW_HIRE_BOARD_ID}/pulses.json`, `user_id=${USER_ID}&pulse%5Bname%5D=${name}`)
      .query({ api_key: MONDAY_API_TOKEN })
      .reply(200, {
        pulse: { id: 12345 },
        board_meta: {},
        column_values: []
      });
    const id = await addNewHireName(name);
    expect(call.isDone()).to.be.true;
    expect(id).to.equal(12345);
  });

  it('should set Team value', async () => {
    const { setTeam } = require('../src/monday-integration');
    const pulseId = 'pulse-id-mock';
    const testTeam = 'teamMock';

    const call = nock(API_BASE_URL, {
      reqheaders: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
      .put(`/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${COLUMN_IDS.team}/text.json`, `pulse_id=${pulseId}&text=${testTeam}`)
      .query({ api_key: MONDAY_API_TOKEN })
      .reply(200, {});
    await setTeam(testTeam, pulseId);
    expect(call.isDone()).to.be.true;
  });

  it('should set team lead name', async () => {
    const { setTeamLead } = require('../src/monday-integration');
    const pulseId = 'pulse-id-mock';
    const teamLead = 'teamLeadMock';

    const call = nock(API_BASE_URL, {
      reqheaders: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
      .put(`/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${COLUMN_IDS.team_lead}/text.json`, `pulse_id=${pulseId}&text=${teamLead}`)
      .query({ api_key: MONDAY_API_TOKEN })
      .reply(200, {});
    await setTeamLead(teamLead, pulseId);
    expect(call.isDone()).to.be.true;
  });

  it('should set the joining date', async () => {
    const { setJoinDate } = require('../src/monday-integration');
    const pulseId = 'pulse-id-mock';
    const date = '2018-09-20';

    const call = nock(API_BASE_URL, {
      reqheaders: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
      .put(`/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${COLUMN_IDS.joined_date}/date.json`, `pulse_id=${pulseId}&date_str=${date}`)
      .query({ api_key: MONDAY_API_TOKEN })
      .reply(200, {});
    await setJoinDate(date, pulseId);
    expect(call.isDone()).to.be.true;
  });

  it('should set welcome talk to No', async () => {
    const { setWelcomeTalkStatus } = require('../src/monday-integration');
    const pulseId = 'pulse-id-mock';

    const call = nock(API_BASE_URL, {
      reqheaders: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
      .put(`/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${COLUMN_IDS.welcome_talk}/status.json`, `pulse_id=${pulseId}&color_index=${COLOR_CODE.red}`)
      .query({ api_key: MONDAY_API_TOKEN })
      .reply(200, {});

    await setWelcomeTalkStatus(COLOR_CODE.red, pulseId);
    expect(call.isDone()).to.be.true;
  });

  it('should set crash course participation to No', async () => {
    const { setCrashCourseParticipationStatus } = require('../src/monday-integration');
    const pulseId = 'pulse-id-mock';

    const call = nock(API_BASE_URL, {
      reqheaders: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
      .put(`/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${COLUMN_IDS.crash_course}/status.json`, `pulse_id=${pulseId}&color_index=${COLOR_CODE.red}`)
      .query({ api_key: MONDAY_API_TOKEN })
      .reply(200, {});

    await setCrashCourseParticipationStatus(COLOR_CODE.red, pulseId);
    expect(call.isDone()).to.be.true;
  });
});