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
HAPPENS, the Client and the Server they BOTH had that EVENT fired, the Client print the message "Connected to 
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

  /* When a NEW message comes IN we want to ADD something INSIDE the "Ordered List"(that we have created inside
the 'index.html' file) so that it gets RENDERED to the screen. So we can do it here below by MODIFYING this
Callback Function when a NEW message arrives, the FIRST thing we're going to do is CREATE a LIST ITEM(the 'li'
variable) and we're going to do this ONCE again using JQUERY. This time THOUGH we're going to use JQUERY in a
DIFFERENT way, INSTEAD of using JQUERY to SELECT an element we're going to use JQUERY to CREATE an element and
THEN we can MODIFY that element and ADD it into the markup making it VISIBLE on the Browser */
  var li = jQuery("<li></li>");
  li.text(`${message.from}: ${message.text}`);

  /* Now that we're created that NEW element(the 'li' variable above) we can APPEND it to our 'Ordered List' with 
the 'append' method that will add our element as the LAST child, SO if there are already 3 items in the list for 
example, this NEW element will show up BELOW those three as thee FORTH item in our 'ol'(Ordered List). So all we
have to do is CALL the 'append' function and pass in our 'li' element */
  jQuery("#messages").append(li);
});

/* 'Event ACKNOWLEDGEMENTS' are a FANTASTIC feature inside the 'socket.io' Library. In order to illustrate WHAT
they are and WHY we'd ever want to use them we're going to talk about the TWO Events we have INSIDE our chat 
application. Right now we have the 'newMessage' Event that gets emitted by the Server and gets listened by the
Client, and then we've the 'createMessage' Event that is the one we're going to UPDATE, this Event gets emitted
by the Client and listened by the Server. NOW, the PROBLEM with our 'createMessage' Event is that te DATA flows
only in ONE direction(from the Client to the Server) so if the Server receives INVALID data it has NO WAY to
let the Client KNOW that something went WRONG, and so what we NEED is a way to ACKNOWLEDGE we got a request and
an OPTION to send some data BACK. So in THIS case we're going to ADD an ACKNOWLEDGEMENT for 'createMessage', IF
the Client EMITS a VALID request with valid DATA we're going to acknowledge it sending back NO ERROR message BUT
if the DATA that is sent back is actually INVALID we're going to acknowledge it by sending back the ERROR so that
the Client knows EXACTLY what he needs to DO to send VALID request. Now the DATA flowing from the Server to the
Client is going to be achieved with a CALLBACK Function, the "Acknowledgement' could be ANYHING we like, could be
a 'message' like "Was the message data valid?" OR if we're creating an email application we might ONLY send the
'Acknowledgement' back to the Client when the email was SUCCESSFULLY sent. Setting up "Acknowledgement' is not 
that bad if we already have a LISTENER in place, now in OUR case the LISTENER happens to be on the SERVER and the
emitter happens to be on the Client BUT "Acknowledgement" ALSO work in the OTHER Direction, so we can EMIT an
Event from the Server and ACKNOWLEDGE it from the CLIENT. With ALL of this in place we now have a "STANDARD Event 
Emitter" and a "Standard Event Listener", we can now go ahed and start our server with nodemon to make sure that 
everythings still works fine. From the Console we see that ALL is FINE, now the GOAL here was to send an 
"Acknowledgement" from the Server BACK to the Client that we actually GOT the DATA. In order to get this done 
we've to make a FEW changes to BOTH the Listener and the Emitter, if we ONLY make a change to ONE of these
two is NOT going to WORK as expected, in our case we're going to start with the Event EMITTER, we want a WAY to
run some code when the "Acknowledgement" has been sent from the Server BACK to the Client and in order to get
that done we're going to add a THIRD argument that is going to be a CALLBACK Function that is going to FIRE when
the "Acknowledgement" ARRIVES at the CLIENT and we can do ANYTHING we like but for now we're just going to print
a 'message' with the 'console.log'. And this was ALL we needed to do to ADD "Acknowledgement" on the CLIENT, 
let's now move on the SERVER where adding this "Acknowledgement' is also going to be pretty simple */
// socket.emit(
//   "createMessage",
//   {
//     from: "Frank",
//     text: "Hi"
//   },
//   function(data) {
//     console.log("Got it", data);
//   }
// );

socket.on("newLocationMessage", function(message) {
  var li = jQuery("<li></li>");
  // The 'target='_blank' will open this link in a NEW Tab on the Browser when clicked
  var a = jQuery("<a target='_blank'>My current location</a>");

  li.text(`${message.from}: `);
  /* We can SET and FETCH attributes on a JQUERY Selected Element using this 'attr' METHOD, if we specify TWO
  arguments(inside this 'attr' method) we'll actually SET the value of the "href" attribute to the 'message.url'
  VALUE */
  a.attr("href", message.url);
  li.append(a);
  jQuery("#messages").append(li);
});

/* Here below we're SELECTING our 'form'(the one we have created inside the 'index.html' file) with 'jQuery' 
and then we're calling the 'on' function where we pass as the FIRST argument the NAME of the "Event Listener"
that in our case is 'submit' and as SECOND argument a FUNCTION that is going to FIRE when a USER tries to SUBMIT
the FORM. This function will take ONE argument, an 'e' Event argument and we're going to ACCESS it to PREVENT 
the DEFAULT behavior of the FORM that causes the page to REFRESH(when we click the button to submit the form)
inside the Browser */
jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();

  var messageTextbox = jQuery("[name=message]");

  socket.emit(
    "createMessage",
    {
      from: "User",
      /* Here below we're SELECTING our 'input' element(inside the 'index.html' file) by HIS 'name' that is
    'message' in our case, so this JQUERY Selector will select ALL the element that has a 'name' attribute EQUAL
    to 'message' which in our case is JUST one, and THEN we use the 'val' METHOD to GET his VALUE. With this in
    place we can now go ahead and ADD our CALLBACK Function for our 'Acknowledgement'(that for now doesn't really 
    do anything and this is fine) BUT we HAVE to ADD it in order to FULFILL(soddisfare) the "Acknowledgement" 
    setup we currently have in place */
      text: messageTextbox.val()
    },
    function() {
      // Here below we're CLEARING the 'input' element AFTER an user has SUBMITTED his message to the chat
      messageTextbox.val("");
    }
  );
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
  /* This 'navigator.geolocation' below is a GLOBAL Object available INSIDE the Browser and IF this Object EXISTS
  (because not ALL Browser have it) the geolocation SERVICES are available. So all we're doing here below is
  verifying if the user has ACCESS to the 'Geolocation API' pretty much */
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser.");
  }

  /* Here below we're setting the 'disabled' ATTRIBUTE of the "Send Location" BUTTON equal to the 'disabled'
  VALUE. A disabled button is unusable and un-clickable and we're doing this to PREVENT a User from SPAMMING
  this button WHILE the process(of sending the URL with our LOCATION to the chat) is OCCURRING, we're also
  CHANGING the TEXT of this button to 'Sending location..." WHILE the process of sending our url location to
  the chat is in PROCESS */
  locationButton.attr("disabled", "disabled").text("Sending location...");

  /* This 'getCurrentPosition' method(available on the 'geolocation' Object) below is used to OBTAIN the User's 
   CURRENT location(if he ACCEPTS to give those information), so the COORDINATES of his Location based off of 
   the BROWSER. The 'getCurrentPosition' takes TWO Functions as arguments, the FIRST one is our SUCCESS Function
   that is going to get called with the LOCATION Information, and the SECOND Function is the one we use in case
   or ERRORS, so if something goes WRONG and we're not able to fetch his location */
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // This command will REMOVE the 'disabled' attribute we defined above from the BUTTON, re-enabling it
      locationButton.removeAttr("disabled").text("Sending location");
      /* Now that we've created this NEW 'createLocationMessage' EVENT, we can go ahead and LISTEN for it over
      in the Server and when we GET it we're going to pass THIS Data(so the 'latitude' and 'longitude') along
      to ALL the CONNECTED Users */
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationButton.removeAttr("disabled").text("Sending location");
      alert("Unable to fetch location.");
    }
  );
});
