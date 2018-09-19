const driver = require('./drivers/monday');
const { COLOR_CODE } = require('../src/monday-constants');

describe('Monday integrations API', () => {
  beforeAll(() => driver.registerEnvVariables());

  it('should create a pulse', async () => {
    const { addNewHireName } = require('../src/monday-integration');
    const name = 'testName';

    const call = driver.buildCreateNewPulseRequest(name)
      .reply(200, {
        pulse: { id: 12345 },
        board_meta: {},
        column_values: []
      });

    const id = await addNewHireName(name);
    expect(call.isDone()).toBeTruthy();
    expect(id).toEqual(12345);
  });

  it('should set Team value', async () => {
    const { setTeam } = require('../src/monday-integration');
    const pulseId = 'pulse-id-mock';
    const testTeam = 'teamMock';

    const call = driver.buildSetTeamColumnValueRequest(testTeam, pulseId).reply(200, {});

    await setTeam(testTeam, pulseId);
    expect(call.isDone()).toBeTruthy();
  });

  it('should set team lead name', async () => {
    const { setTeamLead } = require('../src/monday-integration');
    const pulseId = 'pulse-id-mock';
    const teamLead = 'teamLeadMock';

    const call = driver.buildSetTeamLeadColumnRequest(teamLead, pulseId).reply(200, {});

    await setTeamLead(teamLead, pulseId);
    expect(call.isDone()).toBeTruthy();
  });

  it('should set the joining date', async () => {
    const { setJoinDate } = require('../src/monday-integration');
    const pulseId = 'pulse-id-mock';
    const date = '2018-09-20';

    const call = driver.buildSetJoinDateColumnRequest(date, pulseId).reply(200, {});

    await setJoinDate(date, pulseId);
    expect(call.isDone()).toBeTruthy();
  });

  it('should set welcome talk to No', async () => {
    const { setWelcomeTalkStatus } = require('../src/monday-integration');
    const pulseId = 'pulse-id-mock';

    const call = driver.buildSetCrashCourseColumnRequest(pulseId).reply(200, {});

    await setWelcomeTalkStatus(COLOR_CODE.red, pulseId);
    expect(call.isDone()).toBeTruthy();
  });

  it('should set crash course participation to No', async () => {
    const { setCrashCourseParticipationStatus } = require('../src/monday-integration');
    const pulseId = 'pulse-id-mock';

    const call = driver.buildSetWelcomeTalkColumnRequest(pulseId).reply(200, {});

    await setCrashCourseParticipationStatus(COLOR_CODE.red, pulseId);
    expect(call.isDone()).toBeTruthy();
  });
});