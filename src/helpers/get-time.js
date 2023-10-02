export const getTimeFromStamp = function (timestamp) {
  // return an empty string if there is no release_date_unix
  if (!timestamp) {
    return "";
  }

  const day = new Date(timestamp * 1000);
  const newTimestampFormat =
    day.getDate() + "/" + `${day.getMonth() + 1}` + "/" + day.getFullYear();
  return newTimestampFormat;
};
