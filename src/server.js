const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const { COLOR_CODE } = require('./monday-constants');
const { extractName, extractBodyValues } = require('./message-parser');
const { 
  addNewHireName,
  setJoinDate,
  setTeam,
  setTeamLead,
  setWelcomeTalkStatus,
  setCrashCourseParticipationStatus 
} = require('./monday-integration');

const app = express();

const PORT = process.env.PORT || 1337;

const start = () => {
  app.use(bodyParser.json());

  app.use('/api', basicAuth({
    users: {
      [process.env.USER_NAME]: process.env.USER_PASSWORD
    }
  }));

  app.post('/api/add', (req, res) => {
    const { subject, body } = req.body;
    const name = extractName(subject);
    const { joinDate, teamLeadName, teamName } = extractBodyValues(body);
    addNewHireName(name).then(pulseId => {
      return Promise.all([
        setJoinDate(joinDate, pulseId),
        setTeam(teamName, pulseId),
        setTeamLead(teamLeadName, pulseId),
        setWelcomeTalkStatus(COLOR_CODE.red, pulseId),
        setCrashCourseParticipationStatus(COLOR_CODE.red, pulseId)
      ]);
    }, (err) => {
      console.log(err);
      res.sendStatus(500);
    })
  });

  app.get('/ping', (req, res) => res.send('pong'));

  app.listen(PORT, () => console.log(`The app is running at ${PORT}`));
};

module.exports = {
  start
};
