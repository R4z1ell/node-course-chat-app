/* This 'io()' method is AVAILABLE because we just loaded the "Socket.io" library here above, when we're
CALLING this method we're actually INITIATING the request, so we're making a request from the CLIENT to Server 
to OPEN UP a "Web Socket" and KEEP that connection OPEN. So we're CREATING the connection(with the 'io()' CALL) 
and storing it inside a 'socket' variable and THIS variable is CRITICAL to communicating. It's EXACTLY what we 
need in order to LISTEN for Data from the Server AND in order to send Data to the Server. */
var socket = io();

// This function is used to AUTOMATICALLY scroll the chat page when we're at the BOTTOM of it(so AUTOSCROLLING)
function scrollToBottom() {
  // Selectors
  var messages = jQuery("#messages");
  // Here we're selecting the LAST 'li' children, so  the LAST message in our CHAT pretty much
  var newMessage = messages.children("li:last-child");
  /* This 'clientHeight' variable is what the User ACTUALLY see, so the VISIBLE Area of the CONTAINER. Instead
  the 'clientHeight' we're PASSING inside the 'prop' method is an HTML DOM Property that returns the VIEWABLE 
  height of an element in pixels, INCLUDING padding, but NOT the border, scrollbar or margin. */
  var clientHeight = messages.prop("clientHeight");
  /* This 'scrollTop' property we're passing inside the 'prop' method is an HTML DOM Property that returns the 
  NUMBER of pixels an element's content is scrolled vertically */
  var scrollTop = messages.prop("scrollTop");
  /* This 'scrollHeight' variable is the ENTIRE height of our messages CONTAINER(that contains ALL the messages
  present in the chat) regardless of how MUCH is actually visible inside of the Browser, this means that if we
  have messages BEFORE and AFTER what the User can see they're STILL going to be accounted for the TOTAL height
  of this CONTAINER. The 'scrollHeight' property we're passing inside the 'prop' method is an HTML DOM Property
  that returns the ENTIRE height of an element in PIXELS, including padding, but NOT the border, scrollbar or 
  margin.*/
  var scrollHeight = messages.prop("scrollHeight");
  /* This 'innerHeight' is a JQUERY method that will CALCULATE the HEIGHT of this 'newMessage' taking into
  account the element height AND the PADDING(but not an eventual BORDER) */
  var newMessageHeight = newMessage.innerHeight();
  /* This 'prev' is a JQUERY method that select the IMMEDIATELY preceding sibling, in our case will select the
  preciding sibling of the 'newMessage' and calculate his HEIGHT with the 'innerHeight' method */
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    /* Here we're pretty much moving to the BOTTOM of the chat using the 'scrollTop' JQUERY function that SET
    the CURRENT vertical position of the Scrollbar for EACH matched element. The VERTICAL Scroll Position is
    pretty much the NUMBER of Pixels that are HIDDEN from the view ABOVE the scrollable area, so in our case
    we're SETTING the POSITION of the 'messages' CONTAINER */
    messages.scrollTop(scrollHeight);
  }
}

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

  /* This 'deparam' below is a FUNCTION that comes from the 'deparam.js' file inside our 'libs' folder that 
  will help us CREATING an Object from query string parameters(so the one we have INSIDE the URL), in our case
  we've joined the 'Node Course' ROOM with a name of 'Andrew' so in the URL we had the following 
  'http://localhost:3000/chat.html?name=Andrew&room=Node+Course'. NOW this 'deparam' FUNCTION below will TAKE
  our Query String parameters(?name=Andrew&room=Node+Course) and CONVERT it INTO the following Object
  '{ name: "Andrew, room: "Node Course"}'. So NOW that we've this OBJECT we can go ahead and EMIT an EVENT,
  the 'location' inside the 'windows.location.search' code is an OBJECT available on the GLOBAL 'window' Object,
  this 'location' Object has MANY properties and ONE of those is the 'search' property that STORES the QUERY 
  that we have INSIDE our URL(so this one in our case '?name=Andrew&room=Node+Course') */
  var params = jQuery.deparam(window.location.search);

  /* The CUSTOM EVENT that we're EMITTING here below is called 'join' and will be emitted from the CLIENT and
  it's going to be LISTENED by the SERVER, when the Server HEARS this 'join' Event it's going to go through the
  process of SETTING up the ROOM. Inside the 'emit' function we ALSO pass in the 'params' OBJECT we just created
  above AND we also pass the "Acknowledgement" because if someone enter the ROOM we WANT to know THAT and if
  someone DOESN'T we ALSO want to know that because if they DON'T join the ROOM it's most likely because they
  provided INVALID Data which means that we want to KICK them BACK to our FORM, FORCING them to provide VALID
  Data(so a valid name and a valid room name) */
  socket.emit("join", params, function(err) {
    if (err) {
      alert(err);
      /* IF there is an ERROR we're going to send the User BACK to the ROOT of our Application, we can do this
      by CHANGING the 'href' property INSIDE the 'location' OBJECT(that we have inside the GLOBAL 'window' 
      Object). There(so on this 'href' property) we can MANIPULATE which page the User is ON, so pretty much 
      we're going to REDIRECT the User BACK to the ROOT page of our Application(that what the '/' means) */
      window.location.href = "/";
    } else {
      console.log("No error");
    }
  });
});

/* Here below we call 'socket.on' again to LISTEN to an EVENT, the event in THIS case is the 'disconnect' and 
this 'disconnect' NAME must be correct because is a BUILT-IN Event, so it's ONLY going to work if we TYPE it 
CORRECTLY. This 'disconnect' EVENT is going to fire when ever the connection DROP, for example if the server 
goes down the CLIENT is going to be able to DO something but for NOW that something is just going to be a message 
that we print on the screen */
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

socket.on("updateUserList", function(users) {
  var ol = jQuery("<ol></ol>");

  users.forEach(function (user) {
    ol.append(jQuery("<li></li>").text(user));
  });

  jQuery("#users").html(ol);
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
  var formattedTime = moment(message.createdAt).format("h:mm a");
  /* The 'html()' function will RETURN the markup we have INSIDE the 'message-template' element in our index.html
  file and in our case we've a PARAGRAPH element there */
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery("#messages").append(html);
  scrollToBottom();
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
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery("#messages").append(html);
  scrollToBottom();
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
