
function getMonth(month) {
  return month < 10 ? '0' + month : month;
}

function getDay(day) {
  return day < 10 ? '0' + day : day;
}

function YYYYMMDD(dateStr) {
  let date = new Date(dateStr);
  return date.getFullYear() + '-' + getMonth(date.getMonth() + 1) + '-' + getDay(date.getDate());
}

export {
  YYYYMMDD
}