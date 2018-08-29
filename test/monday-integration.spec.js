const nock = require('nock');
const { expect } = require('chai');
const { addNewHire, setTeam, setTeamLead, setMentor } = require('../src/monday-integration');
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
    await addNewHire(name);
    expect(call.isDone()).to.be.true;
  });

  it('should set Team value', async () => {
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

  it('should set mentor name', async () => {
    const pulseId = 'pulse-id-mock';
    const mentorName = 'mentorNameMock';

    const call = nock(API_BASE_URL, {
      reqheaders: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
      .put(`/v1/boards/${NEW_HIRE_BOARD_ID}/columns/${COLUMN_IDS.mentor}/text.json`, `pulse_id=${pulseId}&text=${mentorName}`)
      .query({ api_key: MONDAY_API_TOKEN })
      .reply(200, {});
    await setMentor(mentorName, pulseId);
    expect(call.isDone()).to.be.true;
  });
});