var generateMessage = (from, text) => {
  return {
    from,
    text,
    /* This 'createdAt' property will get generated ONLY by the Server to PREVENT a specific Client from
      SPOOFING(imbrogliare) when a message was created */
    createdAt: new Date().getTime()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime() 
  };
};

module.exports = { generateMessage, generateLocationMessage };


