const { expect } = require('chai');
const mondayDriver = require('./drivers/monday');
const serverDriver = require('./drivers/server');
const messageBody = require('./fixtures/message-body');
const messageSubject = require('./fixtures/message-subject');

describe('Server integration tests', () => {

  beforeEach(() => {
    mondayDriver.registerEnvVariables();
  });

  afterEach(async () => await serverDriver.stopServer());

  it('should return pong', async () => {
    await serverDriver.startServer();
    const result = await serverDriver.makePingRequest();
    expect(await result.text()).to.equal('pong');
  });

  it('should return 401 without credentials', async () => {
    await serverDriver.startServer();
    const result = await serverDriver.makeAddRequestWithoutCredentials();
    expect(await result.status).to.equal(401);
  });

  it('should return 500 is bad answer from Monday', async () => {
    const name = 'testName';
    serverDriver.registerEnvVariables();
    await serverDriver.startServer();
    mondayDriver.buildCreateNewPulseRequest(name).reply(200, {});
    const result = await serverDriver.makeAddRequest(messageSubject(name), messageBody);
    expect(await result.status).to.equal(500)
  });

  it('should extract data and hit monday endpoints', async () => {
    const name = 'testName';
    const pulseId = '12345';
    const teamName = 'Promote';
    const teamLeadName = 'Guy Kori';
    const joinDate = '2018-10-2';

    serverDriver.registerEnvVariables();
    await serverDriver.startServer();

    mondayDriver.buildCreateNewPulseRequest(name).reply(200, {
      pulse: { id: pulseId },
      board_meta: {},
      column_values: []
    });
    mondayDriver.buildSetJoinDateColumnRequest(joinDate, pulseId).reply(200, {});
    mondayDriver.buildSetTeamColumnValueRequest(teamName, pulseId).reply(200, {});
    mondayDriver.buildSetTeamLeadColumnRequest(teamLeadName, pulseId).reply(200, {});
    mondayDriver.buildSetCrashCourseColumnRequest(pulseId).reply(200, {});
    mondayDriver.buildSetWelcomeTalkColumnRequest(pulseId).reply(200, {});

    const request = await serverDriver.makeAddRequest(messageSubject(name), messageBody);
    const data = await request.json();
    expect(data).to.deep.equal({
      name,
      teamName,
      teamLeadName,
      joinDate
    });
  });
});
