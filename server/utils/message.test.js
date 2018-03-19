var expect = require("expect");

var { generateMessage } = require("./message");

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
