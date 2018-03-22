[
  {
    id: "/#12poiajdspfoif",
    name: "Andrew",
    room: "The Office Fans"
  }
];

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }
  getUser(id) {
    return this.users.filter(user => user.id === id)[0];
  }
  getUserList(room) {
    /* The 'this.users' refers to the 'users' EMPTY Array we have inside the CONSTRUCTOR above, the 'filter'
    function will return an ARRAY of OBJECTS */
    var users = this.users.filter(user => user.room === room);
    /* The NEXT step is to take that Array of Objects(so the 'users' variable above) and CONVERT it to an Array
    of STRINGS because ALL we care about in this function is to get that LIST of NAMES, so for doing this we're 
    going to use the 'map' method */
    var namesArray = users.map(user => user.name); // This will return something like '["Mike", "Jen", "Julie"]'

    return namesArray;
  }
}

module.exports = { Users };
