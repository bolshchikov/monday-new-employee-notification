const cheerio = require('cheerio');

const extractName = (subject) => {
  const space = 1;
  const keyword = 'Hire';
  const firstIndex = subject.indexOf(keyword);
  const secondIndex = subject.indexOf('(');

  return subject.substring(firstIndex + keyword.length + space, secondIndex - space);
};

const normalizeDate = (raw) => {
  const date = new Date(raw);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const extractBodyValues = (bodyHTMLString) => {
  const TEAM_INDEX = 3;
  const TEAM_LEAD_INDEX = 5;
  const JOIN_DATE_INDEX = 6;

  const $ = cheerio.load(bodyHTMLString);
  const allImportantTags = $('b');

  return {
    teamName: $(allImportantTags[TEAM_INDEX]).text(),
    teamLeadName: $(allImportantTags[TEAM_LEAD_INDEX]).text(),
    joinDate: normalizeDate($(allImportantTags[JOIN_DATE_INDEX]).text())
  };
}

module.exports = {
  extractName,
  extractBodyValues
};