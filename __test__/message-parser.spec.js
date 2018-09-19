const messageBody = require('./fixtures/message-body');
const messageSubject = require('./fixtures/message-subject');
const { extractName, extractBodyValues } = require('../src/message-parser');

describe('subject parser', () => {
  it('should extract name', () => {
    const testName = 'Vasya Anchlovich';
    const testSubject = messageSubject(testName);
    expect(extractName(testSubject)).toEqual(testName);
  });

  it('should extract values from body', () => {
    const {
      teamName,
      teamLeadName,
      joinDate
    } = extractBodyValues(messageBody);

    expect(teamName).toEqual('Promote');
    expect(teamLeadName).toEqual('Guy Kori');
    expect(joinDate).toEqual('2018-10-2');
  });
});