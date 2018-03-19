/* This 'io()' method is AVAILABLE because we just loaded the "Socket.io" library here above, when we're
CALLING this method we're actually INITIATING the request, so we're making a request from the CLIENT to Server 
to OPEN UP a "Web Socket" and KEEP that connection OPEN. So we're CREATING the connection(with the 'io()' CALL) 
and storing it inside a 'socket' variable and THIS variable is CRITICAL to communicating. It's EXACTLY what we 
need in order to LISTEN for Data from the Server AND in order to send Data to the Server. */
var socket = io();

/* REMEMBER that when we're using JavaScript INSIDE the CLIENT(like we're doing in THIS case) we want to
AVOID using ES6 Features like ARROW FUNCTION for example because even though it WILL work on Chrome it will NOT 
work on Safari, or older version of Firefox or on a mobile Phone or Internet Explorer and so on where our 
program will CRASH. So to AVOID this problem we're just going to use REGULAR Function declaration, so the ES5 
classical way. We're ALSO going to REMOVE this JavaScript code from this 'index.html' file and MOVE it to a 
SEPARATE file(to 'index.js') because THIS is the best practice */
socket.on("connect", function() {
  /* This message will SHOW inside the CONSOLE of the Chrome Browser in the Dev Tools. As soon as the Connection 
HAPPENS, the Client and the Server they BOTH had that EVENT fired, the Client pint the message "Connected to 
server" and the Server prints "New user connected"(we have this message inside the 'server.js' file) */
  console.log("Connected to server");
  /* We're using this 'socket.emit' RIGHT here inside the Callback because we DON'T want to emit the Event
  UNTIL we're CONNECTED. So in this 'emit' we pass the EVENT as first argument(so the 'createMessage') and as
  second argument we can pass in ANY Data we like, in our case we have an Object with ALL our custom Data. SO
  whit all of this we've created a CLIENT SIDE Script that CONNECTS to the Server and AS SOON as it CONNECTS it
  EMITS this 'createMessage' Event. NOW we can restart our server and AS SOON as the Browser CONNECTS it's going
  to EMIT this 'createMessage' EVENT and INSIDE our TERMINAL we could see this 'createEmail' Event PRINTED to 
  the screen with the CUSTOM Data Object and all his information printed on the TERMINAL. SO in THIS case this
  'createMessage' EVENT was EMITTED from the Client to the Server that GOT the Data  */
  // socket.emit("createMessage", {
  //   from: "Andrew",
  //   text: "Yup, that works for me."
  // });
});

/* Here below we call 'socket.on' again to LISTEN to an EVENT, the event in THIS case is the 'disconnect' and 
this 'disconnect' NAME must be correct because is a BUILT-IN Event, so it's ONLY going to work if we TYPE it 
CORRECTLY. This 'disconnect' EVENT is going to fire when ever the connection DROP, for example if the server 
goes down the CLIENT is going to be able to DO something but for NOW that something is just going to be a message 
that we print on the screen */
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

/* Here below we're LISTENING(thx to 'socket.on') to a CUSTOM EVENT named "newMessage" that we pass as FIRST 
argument, as the SECOND argument we have a REGULAR Function that is going to get called when THIS "newMessage"
Event FIRES. NOW that we've created some DATA for our message inside the 'server.js' file, HERE we can do 
something with that Data, so the Data that's EMITTED with our 'newMessage' EVENT(inside 'server.js') is PROVIDED
as the FIRST argument to our Callback Function here below, so we can pass that Data as first argument in this
Callback naming it 'message' for example, and now we can do WHATEVER we want with it but for OUR purposes right 
now we're just going to pass it as second argument to 'console.log' and rendering it to the screen. So NOW if
we save and restart our server we'll see from the CONSOLE inside the Browser that we now also have our Object
with ALL the data inside it printed to the screen, so we were able to in REAL TIME to pass NOT only an Event
BUT Event DATA from the Server to the Client which is something we could NEVER do with an HTTP API */
socket.on("newMessage", function(message) {
  console.log("newMessage", message); // This message will be visible in the CONSOLE of the Browser
});
