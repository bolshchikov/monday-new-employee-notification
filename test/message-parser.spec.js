const { expect } = require('chai');
const messageBody = require('./fixtures/message-body');
const { extractName, extractBodyValues } = require('../src/message-parser');

describe('subject parser', () => {
  it('should extract name', () => {
    const testName = 'Vasya Anchlovich';
    const testSubject = `HR Notification - New Hire ${testName} (123456)`;
    expect(extractName(testSubject)).to.equal(testName);
  });

  it('should extract values from body', () => {
    const {
      teamName,
      teamLeadName,
      joinDate
    } = extractBodyValues(messageBody);

    expect(teamName).to.equal('Promote');
    expect(teamLeadName).to.equal('Guy Kori');
    expect(joinDate).to.equal('2018-10-2');
  });
});