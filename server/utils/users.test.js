const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
  /* We're defining this 'users' variable HERE so that it's ACCESSIBLE inside the 'beforeEach' function AND
  inside EACH of our test cases down below */
  var users;

  beforeEach(() => {
    users = new Users();
    // This 'users.users' refers to the EMPTY 'users' ARRAY inside THIS 'users' Object above
    users.users = [
      {
        id: "1",
        name: "Mike",
        room: "Node Course"
      },
      {
        id: "2",
        name: "Jen",
        room: "React Course"
      },
      {
        id: "3",
        name: "Julie",
        room: "Node Course"
      }
    ];
  });

  it("should add new user", () => {
    // Regardless of the 'users' we have in the 'beforeEach' function above HERE we can STILL use a CUSTOM 'users'
    var users = new Users();
    var user = {
      id: "123",
      name: "Andrew",
      room: "The Office Fans"
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    /* The FIRST 'users' refers to this 'users' variable above('var users = new Users()', so the 'users' OBJECT) 
    instead the SECOND 'users' refers to the EMPTY Array 'users' inside the 'users.js' file(so the 
    'this.users = []' INSIDE the 'constructor' pretty much). Then we use 'toEqual' that is used for ARRAY and 
    OBJECTS */
    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    var userId = "1";
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    /* 'toBe(2)' because INITIALLY our SEED 'users' Array above has 3 Elements,so now when we remove ONE user
    the length of the Array should be TWO */
    expect(users.users.length).toBe(2);
  });

  it("should not remove a user", () => {
    var userId = "99";
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it("should find user", () => {
    var userId = "2";
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it("should not find user", () => {
    var userId = "99";
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });

  // This TEST should return ALL the USERS that we have in the room named 'Node Course'
  it("should return names for node course", () => {
    /* This 'users' we're using here below refers to the 'users' SEED Data we DEFINED inside the 'beforeEach' so
    we DON'T need to create a CUSTOM 'user' like we've done in the TEST above */
    var userList = users.getUserList("Node Course"); // This will return ["Mike", "Julie"]

    expect(userList).toEqual(["Mike", "Julie"]);
  });

  // This TEST should return ALL the USERS that we have in the room named 'React Course', in our case is ONLY 1
  it("should return names for react course", () => {
    var userList = users.getUserList("React Course"); // This will return ["Jen"]

    expect(userList).toEqual(["Jen"]);
  });
});
