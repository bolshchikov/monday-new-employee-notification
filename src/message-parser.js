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
  const year = date.getFullYear();
  const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
}

const extractBodyValues = (bodyHTMLString) => {
  const TEAM_INDEX = 3;
  const TEAM_LEAD_INDEX = 5;
  const JOIN_DATE_INDEX = 6;

  const $ = cheerio.load(bodyHTMLString);
  const allImportantTags = $('b');

  const teamName = $(allImportantTags[TEAM_INDEX]).text();
  const teamLeadName = $(allImportantTags[TEAM_LEAD_INDEX]).text();
  const joinDate = normalizeDate($(allImportantTags[JOIN_DATE_INDEX]).text());

  return {
    teamName,
    teamLeadName,
    joinDate
  };
}

module.exports = {
  extractName,
  extractBodyValues
};