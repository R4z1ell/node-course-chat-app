/* The 'path' below is a built-in MODULE of Node.js that provides utilities for working with file and directory
PATHS. So we just need to import him like below, we DON'T need to install ANYTHING through npm in the terminal */
const path = require("path");
const http = require("http"); // It's a built-in Node.js MODULE
const express = require("express");
/* Now in order to setup "Web Sockets" we're going to be using a library called "Socket.IO", just like "Express"
makes it REALLY easy to setup an HTTP Server, "Socket.IO" makes it dead SIMPLE to setup a Server that supports
"Web Sockets" and create a Front end that COMMUNICATES with the Server. "Socket.IO" is a back AND front end 
library and we're going to use BOTH to setup "Web Sockets" */
const socketIO = require("socket.io");

var { generateMessage } = require("./utils/message");
/* This 'path.join' below is a method that JOIN ALL given PATH segments TOGETHER and then NORMALIZES the 
resulting PATH.  */
const publicPath = path.join(__dirname, "../public");
/* To SETUP this application we just created for HEROKU, we NEED to CREATE an "Environment Variable" like 
below, NOW the NEXT thing that we NEED to CHANGE in order to get our app set up for HEROKU is to UPDATE the 
'package.json' file by ADDING a "start" SCRIPT where we need to SPECIFY the VERSION of Node.js we want to USE.
We're also going to add(always inside the 'package.json') the "engines" that will TELL to HEROKU which version of
Node.js to USE, so this "engine" will let us taking advantage of some features ONLY available in the latest 
version of Node.js */
const port = process.env.PORT || 3000;
/* REMEMBER that we DON'T configure 'Express' by passing IN an argument but INSTEAD we configure it by calling
methods on the 'app' to create Routes or add Middleware or start up the server */
var app = express();
/* This 'http.createServer' is WHAT behind the scenes gets CALLED when we use 'app.listen', it takes a Function
that is really SIMILAR to one of our "Express" Callbacks and gets called with a 'req' and 'res', NOW as we 
mentioned the 'http' module is actually used behind the scenes for "Express" and they're INTEGRATED so much that
instead of the Callback we can ACTUALLY provide the 'app' itself as the argument like we're doing here below. */
var server = http.createServer(app);
// This is how we INTEGRATE our 'server' with "Socket.io"
var io = socketIO(server);

app.use(express.static(publicPath));

/* 'io.on' let use REGISTER an "Event Listener", we can listen for a SPECIFIC event and DO something when THAT
even happens. One built-in EVENT that we're going to use, one of the MOST popular is called 'connection' and let
us LISTEN for a NEW connection(meaning that a Client connected to the server) and let us do something when that
connection comes in, in order to DO something we provide a Callback Function as the SECOND argument and THIS
Callback is going to get CALLED with a 'socket' argument that is REALLY similar to the 'socket' argument we have
ACCESS inside the second SCRIPT in our 'index.html' file(so where we have the 'socket' variable). "Web Sockets"
as we mentioned are a PERSISTENT technology, meaning that the CLIENT and the SERVER they BOTH keep the
communication channel OPEN for as long as both of them want to, IF the Server shuts down, the Client doesn't
really have a choice and the SAME thing for the opposite, so if we close a Browser tab the Server CANNOT force
us to KEEP the connection open. NOW, when a connection DROPS, the Client it's STILL going to try to RECONNECT
when we RESTART the Server with 'Nodemon' because there is a very small window of time where the Server is DOWN
and the Client NOTICES that, so the Client TRIES to RECONNECT and EVENTUALLY it reconnects. IF we try to SHUT
DOWN our Server(so we disconnect from the the Server using the terminal) and we go on the CLIENT(so the Browser
in our case) we see that there are NETWORK REQUEST that are STILL being made, so the CLIENT is TRYING to
reconnect to the SERVER, as we can see though ALL of these connection are FAILING because the server is DOWN. So
now if we RECONNECT the Server and we go BACK on the Client we'll see that the Connection request goes well and
we ALSO see this "New user connected" message INSIDE the Terminal */
io.on("connection", socket => {
  console.log("New user connected");

  /* Here below we're using our newly created 'generateMessage' method that create a new Object for us, so now 
  we have the SAME exact functionality as before BUT now we're using a the 'generateMessage' function to GENERATE
  that Object for US which is going to make SCALING a LOT easier and it's ALSO going to make updating what is
  inside of a message much easier as well */
  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

  /* We're going to use this 'emit' method on BOTH the Client AND the Server to EMIT Events, 'emit' is REALLY
  similar to the listeners Events BUT in this case we're NOT listening to an Event, we're CREATING the Event.
  The FIRST argument is going to be the NAME of Event we want to EMIT and we have to match it EXACTLY as we
  specified it inside the 'index.js' file(so it's should be EXACTLY 'newEmail'), NOW this is NOT a listener so
  we're NOT going to provide a Callback Function BUT what we want to do is to SPECIIFY the DATA. By DEFAULT we
  don't have to specify ANY Data, maybe we just want to emit a new email WITHOUT anything BUT if we want to PASS
  some CUSTOM Data is super easy, ALL we have to do is provide a SECOND argument an OBJECT because in most cases
  we want to send MULTIPLE pieces of Data across, in this way we can specify ANYTHING we like. This Data we have
  inside our Object will be sent ALONG with the 'newEmail' EVENT from the Server to the Client */
  // socket.emit("newMessage", {
  //   from: "John",
  //   text: "See you then",
  //   createdAt: 123123 // This is a TIMESTAMP of when the server GOT this email
  // });

  /* Currently ALL we do here below is LOG the Data to the screen BUT instead we actually want to EMIT a NEW 
  message Event to EVERYBODY, so EVERY single connected user gets the message that was sent from a SPECIFIC user. 
  In order to get this done we're going to call 'io.emit', while 'socket.emit' EMITS an Event to a SINGLE 
  Connection, 'io.emit' EMITS an Event to EVERY SINGLE Connection. With this in place we can now restart our
  Server and open TWO new tab in our Browser BOTH connected to 'localhost:3000', NOW from one of these two tab
  we can SEND a new message from INSIDE the DEV TOOL Console, for example we can write something like this
  'socket.emit('createMessage', {from: 'Andrew', text: 'This should worl!'});' and push enter to send it, NOW
  this message will be sent to EVERY single user CONNECTED to our application, in our case we would see this
  messaged printend on BOTH the page(so EVEN on the page of the user who SENT the "message") */
  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    /* This is HOW we add "Acknowledgement" in the SERVER, inside the Callback we add as SECOND argument a 
    FUNCTION named 'callback' and THEN we call this function here below to "Acknowledge" that we got THAT 
    request. When we CALL this Function(so this 'callback'), the Function itself is going to SEND an EVENT back 
    to the CLIENT and is going to call the FUNCTION as we have it inside the the 'socket.emit' of the 'index.js'
    file(so pretty much THIS 'callback' function is going to EXECUTE the 'function () { console.log("Got it")}
    we have INSIDE the 'socket.emit'). Now if we restart our Server we see from the Browser Console that we have
    the message 'Got it' printed to the screen, and THIS means that our DATA successfully WENT to the SERVER,
    and we can PROVE this by seeing that INSIDE the TERMINAL we have the 'createMessage'. So the server
    ACKNOWLEDGED it got the DATA by calling the 'callback' function and RIGHT inside the Console of the Browser
    we have the 'Got it' message. NOW "Acknowledgments" are pretty useful BUT they're EVEN more useful when we
    send DATA back, if the DATA was for example INVALID we probably want to send some ERRORS back, and we can
    send DATA back by providing ONE argument this 'callback' Function below, if we want to add MULTIPLE things
    we simply specify an OBJECT and we can then add as many things we want, in OUR case though we can send as
    this ONLY argument a STRING(a simple message). THIS string is going to end up INSIDE the CALLBACK that we
    have INSIDE the 'socket.emit' in the 'index.js' file, which means that we can create a VARIABLE for THAT
    value called 'data'(or anything we like) and we can PRINT it to the screen(like we're doing) for example.
    So NOW inside the CONSOLE of the Browser we see 'Got it This is from server', meaning we GOT the
    "Acknowledgement" and ALSO the data that was sent from the SERVER(so the 'This is from the server' message)
    to the CLIENT. So ACKNOWLEDGEMENTS allow the 'Request LISTENER' to SEND something BACK to the
    'Request EMITTER' */
    callback("This is from the server.");
    /* BROADCASTING is the term for EMITTING an Event to EVERYBODY(so to all the user CONNECTED to our Server)
    EXCEPT for OURSELF(so the User who SENT the actual EVENT). To "BROADCAST" we have to SPECIFY the individual
    SOCKET, and this lets the 'Socket.io' library KNOW which user SHOULDN'T get the EVENT, NOW this 'broadcast'
    has its OWN 'emit' FUNCTION that is like the 'emit' we used on the 'socket' OR on 'io' with the DIFFERENCE
    to WHO the Event gets SENT, because this 'emit' is going to send the Event to EVERYBODY but THIS socket,
    which means that if we FIRE a 'createMessage' EVENT, the 'newMessage' Event will fire to EVERYBODY but 
    ourself and THAT is EXACTLY what we're doing here. So NOW with all of this in place we're NOT going to see
    the 'message' we send BUT everybody else WILL, so if we now restart the Server and send a message from the
    DEV TOOL Console we will see EXACTLY this, so that the user who SENT the actual message will NOT see it BUT
    everybody ELSE will and this happen because we BROADCASTED the Event, which means that it ONLY got received
    by OTHER connections */
    // socket.broadcast.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  // 'connection' and 'disconnect' are BUILT-IN Events
  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

/* NOW we're using this http 'server'(the 'server' variable above) as OPPOSED to the 'Express' server(the 'app' 
variable above) and INSTEAD of calling 'app.listen' we're going to use 'server.listen'. Now with all of this in 
place we HAVEN'T changed anything in our app FUNCTIONALITY, our server is still going to work on port 3000  */
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
