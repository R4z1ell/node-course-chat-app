/* This 'isRealString' below is a FUNCTION that will VERIFY if a value is of a type STRING and that it's not 
just a bunch of spaces BUT that it actually have REAL characters inside of it */
var isRealString = str => {
  // the 'trim' method will remove ANY white space that we MAY have inside our 'str'(string)
  return typeof str === "string" && str.trim().length > 0;
};

module.exports = { isRealString };
