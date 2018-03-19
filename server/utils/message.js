var generateMessage = (from, text) => {
  return {
    from,
    text,
    /* This 'createdAt' property will get generated ONLY by the Server to PREVENT a specific Client from
      SPOOFING(imbrogliare) when a message was created */
    createdAt: new Date().getTime()
  };
};

module.exports = { generateMessage };
