function convertDate(value) {
  var res =
    value.substring(0, 4) +
    "." +
    value.substring(4, 6) +
    "." +
    value.substring(6);

  return res;
}

module.exports = {
  convertDate,
};
