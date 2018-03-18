/* The 'path' below is a built-in MODULE of Node.js that provides utilities for working with file and directory
PATHS. So we just need to import him like below, we DON'T need to install ANYTHING through npm in the terminal */
const path = require("path");
const express = require("express");

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

app.use(express.static(publicPath));

/* This below is the old way of using a PATH, in this case the result is the following as we can see from the
terminal 'C:\Users\creaw\OneDrive\Desktop\Utility PC\Code\Node.js Complete Course\node-chat-app\server/../public'
SO from THIS 'server.js' file we want to go into the 'public' folder, for doing so we enter the 'server' folder
in the FIRST place, THEN we leave this folder going out and ENTERING inside the 'public' folder, with the 'join'
method INSTEAD we can go DIRECTLY inside the 'public' folder WITHOUT passing for server and then going out */
// console.log(__dirname + "/../public");
/* As we can see from the terminal in THIS case INSTEAD of going into the 'server' folder and then going OUT like
we do with the console.log ABOVE, we go RIGHT into the 'public' directory which is IDEAL and THIS is the PATH we
want to provide to the 'Express' Static Middleware */
// console.log(publicPath);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
