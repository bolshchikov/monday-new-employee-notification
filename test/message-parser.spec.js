const { extractName } = require('../src/message-parser');
const { expect } = require('chai');

describe('subject parser', () => {
  it('should extract name', () => {
    const testName = 'Vasya Anchlovich';
    const testSubject = `HR Notification - New Hire ${testName} (123456)`;
    expect(extractName(testSubject)).to.equal(testName);
  })
});