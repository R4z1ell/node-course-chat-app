var expect = require("expect");

var { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  // This TEST is going to be SYNCHRONOUS so there is NO need to use 'done' in the Callback Function
  it("should generate correct message object", () => {
    var from = "Jen";
    var text = "Some message";
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, text });
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location object", () => {
    var from = "Mark";
    var latitude = 15;
    var longitude = 19;
    var url = "https://www.google.com/maps?q=15,19";
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, url});
  });
});