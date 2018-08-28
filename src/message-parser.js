const extractName = (subject) => {

  const space = 1;
  const keyword = 'Hire';
  const firstIndex = subject.indexOf(keyword);
  const secondIndex = subject.indexOf('(');

  return subject.substring(firstIndex + keyword.length + space, secondIndex - space);

};

module.exports = {
  extractName
};