var moment = require("moment");

var generateMessage = (from, text) => {
  return {
    from,
    text,
    /* This 'createdAt' property will get generated ONLY by the Server to PREVENT a specific Client from
      SPOOFING(imbrogliare) when a message was created */
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    // This code below will return the 'Timestamp', so a value(that is a NUMBER) like this 1521584873141
    createdAt: moment().valueOf()
  };
};

module.exports = { generateMessage, generateLocationMessage };


