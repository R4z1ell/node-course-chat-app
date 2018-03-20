/* We KNOW that 'Timestamp' are nothing more than INTEGERS, whether positive or negative or EVEN the zero number
is a perfectly VALID 'Timpestamp'. ALL of these numbers are RELATIVE to a certain moment in history referred to
as the 'UNIX Epoch' that DEFINES the number of seconds that have ELAPSED since the 1 January 1970 at MIDNIGHT,
so since  00:00:00(zero hours, zero minuts and zero seconds) and it's stored in UTC(Coordinated Universal Time) 
which means it's TIME Zone INDEPENDENT. So a 'Timestamp' value of ZERO actually represents this moment in history 
PERFECTLY(so Jan 1st 1970 00.00.00), POSITIVE numbers instead represents a moment in the FUTURE while NEGATIVE 
numbers represents a moment into the PAST. NOW, these 'Timestamp' in JavaScript are stored in MILLISECONDS which
means that a 'Timestamp' with a value of 1000 for example represents ONE second into January 1st, a value of
10000 would be 10 seconds into January 1st and so on and so forth. The problem for us was NOT getting the 
'Timestamp', that was really easy, all we had to do was calling the 'new Date().getTime()' method BUT things get
a LOT harder when we want to FORMAT this 'Timestamp' in a human READABLE value, and for this reason we're going
to use a Library called 'Moment' that will help us to formate our Data how we like */

var moment = require("moment");

/* Inside this 'date' variable we're creating a NEW 'moment' Object that represents the CURRENT point in time */
var date = moment();
date.add(100, "year").subtract(9, "months");
/* The REAL power of this 'format' method comes when we pass a STRING inside of it and what we PASS inside is 
called PATTERN(or TOKEN), which means that we have access to a SPECIFIC set of VALUES we can use to output 
certain THINGS. There are a LOT of these PATTERN but for now let's start by using the 'MMM' TRIPLE Uppercase 
Pattern, when 'moment'(the Library) SEES this Pattern inside of the 'format' method, it's going to go ahead and 
GRAB the shorthand version of the MONTH. From what we can see below by using this 'moment' Library we have a LOT
of FLEXIBILITY on how we want to FORMAT the Date */
console.log(date.format("MMM")); // Mar 
console.log(date.format("MMM YYYY")); // Mar 2018
console.log(date.format("MMM Do YYYY")); // Mar 20th 2018
console.log(date.format("MMM Do, YYYY")); // Mar 20th, 2018
console.log(date.format("h:mm a")); // 11:16 pm 

// This is HOW we create a 'Timestamp' with the 'moment' Library, it will return a 'Timestamp' in MILLISECONDS
var someTimestamp = moment().valueOf();
console.log(someTimestamp); // 1521584873141 (This is the 'Timestamp')