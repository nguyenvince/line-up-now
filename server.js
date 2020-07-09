// Create server
let port = process.env.PORT || 8000;
let express = require("express");
let app = express();
let server = require("http")
  .createServer(app)
  .listen(port, function() {
    console.log("Server listening at port: ", port);
  });

// Tell server where to look for files
app.use(express.static("public"));

// Create socket connection
let io = require("socket.io").listen(server);

//--------------------------------MASTER---------------------------

// Clients in the audience namespace
let master = io.of("/master");

// Listen for master clients to connect
master.on("connection", function(socket) {
  //receive start message and trigger the game
  socket.on("start", function() {
    for (let g = 0; g < 2; g++) {
      //Group1 operation
      if (g == 0) {
        //remove no name client
        console.log("Group1: ", group1_array.length);
        for (let i = 0; i < group1_array.length; i++) {
          console.log("Group1: ", group1_array[i][1]);
          if (group1_array[i][1] == "no name") {
            group1_array.splice(i, 1);
          }
        }

        //Create a randomized array
        let randomArray = [];
        console.log("Group1: ", group1_array.length);
        for (let j = 0; j < group1_array.length; j++) {
          randomArray[j] = j;
        }
        console.log("Group1: ", randomArray);
        var shuffledArray = shuffle(randomArray);

        //Making sure the shuffled array doesnt have element that is in the same position
        let flag = true;
        let similar = false;
        while (flag) {
          similar = false;
          for (let i = 0; i < shuffledArray.length; i++) {
            if (shuffledArray[i] == randomArray[i]) {
              similar = true;
            }
          }
          if (similar) {
            shuffledArray = shuffle(randomArray);
          } else {
            flag = false;
          }
        }
        console.log("Group1: ", shuffledArray);

        //Assign each person the first user
        for (let i = 0; i < group1_array.length; i++) {
          let randomPerson = group1_array[shuffledArray[i]];
          group1_array[i].push([randomPerson[1], randomPerson[2]]);
        }
        //Assign half of the group another user
        for (let i = 0; i < group1_array.length / 2; i++) {
          let rand = Math.floor(Math.random() * shuffledArray.length);
          let randomPerson = group1_array[rand];
          let flag = true;
          while (flag) {
            if (
              group1_array[i][1] == randomPerson[1] ||
              group1_array[i][3][0] == randomPerson[1]
            ) {
              rand = Math.floor(Math.random() * shuffledArray.length);
              randomPerson = group1_array[rand];
            } else {
              group1_array[i].push([randomPerson[1], randomPerson[2]]);
              flag = false;
            }
          }
        }
        //Print out and send to master
        for (let i = 0; i < group1_array.length; i++) {
          let socketid = group1_array[i][0].id;
          if (group1_array[i].length == 4) {
            console.log(
              "Group1: ",
              group1_array[i][1],
              group1_array[i][2],
              group1_array[i][3][0],
              group1_array[i][3][1]
            );
            master.emit("group1-1", {
              name: group1_array[i][1],
              number: group1_array[i][2],
              name1: group1_array[i][3][0],
              number1: group1_array[i][3][1]
            });

            console.log("Group1: ", socketid);
            group1.emit("clue1", {
              id: socketid,
              name1: group1_array[i][3][0],
              number1: group1_array[i][3][1]
            });
          } else {
            console.log(
              "Group1: ",
              group1_array[i][1],
              group1_array[i][2],
              group1_array[i][3][0],
              group1_array[i][3][1],
              group1_array[i][4][0],
              group1_array[i][4][1]
            );
            master.emit("group1-2", {
              name: group1_array[i][1],
              number: group1_array[i][2],
              name1: group1_array[i][3][0],
              number1: group1_array[i][3][1],
              name2: group1_array[i][4][0],
              number2: group1_array[i][4][1]
            });
            group1.emit("clue2", {
              id: socketid,
              name1: group1_array[i][3][0],
              number1: group1_array[i][3][1],
              name2: group1_array[i][4][0],
              number2: group1_array[i][4][1]
            });
          }
        }
      }
      //Group2 operation
      else if (g == 1) {
        //remove no name client
        console.log("Group2: ", group2_array.length);
        for (let i = 0; i < group2_array.length; i++) {
          console.log("Group2: ", group2_array[i][1]);
          if (group2_array[i][1] == "no name") {
            group2_array.splice(i, 1);
          }
        }

        //Create a randomized array
        let randomArray = [];
        console.log("Group2: ", group2_array.length);
        for (let j = 0; j < group2_array.length; j++) {
          randomArray[j] = j;
        }
        console.log("Group2: ", randomArray);
        var shuffledArray = shuffle(randomArray);

        //Making sure the shuffled array doesnt have element that is in the same position
        let flag = true;
        let similar = false;
        while (flag) {
          similar = false;
          for (let i = 0; i < shuffledArray.length; i++) {
            if (shuffledArray[i] == randomArray[i]) {
              similar = true;
            }
          }
          if (similar) {
            shuffledArray = shuffle(randomArray);
          } else {
            flag = false;
          }
        }
        console.log("Group2: ", shuffledArray);

        //Assign each person the first user
        for (let i = 0; i < group2_array.length; i++) {
          let randomPerson = group2_array[shuffledArray[i]];
          group2_array[i].push([randomPerson[1], randomPerson[2]]);
        }
        //Assign half of the group another user
        for (let i = 0; i < group2_array.length / 2; i++) {
          let rand = Math.floor(Math.random() * shuffledArray.length);
          let randomPerson = group2_array[rand];
          let flag = true;
          while (flag) {
            if (
              group2_array[i][1] == randomPerson[1] ||
              group2_array[i][3][0] == randomPerson[1]
            ) {
              rand = Math.floor(Math.random() * shuffledArray.length);
              randomPerson = group2_array[rand];
            } else {
              group2_array[i].push([randomPerson[1], randomPerson[2]]);
              flag = false;
            }
          }
        }
        //Print out and send to master
        for (let i = 0; i < group2_array.length; i++) {
          let socketid = group2_array[i][0].id;
          if (group2_array[i].length == 4) {
            console.log(
              "Group2: ",
              group2_array[i][1],
              group2_array[i][2],
              group2_array[i][3][0],
              group2_array[i][3][1]
            );
            master.emit("group2-1", {
              name: group2_array[i][1],
              number: group2_array[i][2],
              name1: group2_array[i][3][0],
              number1: group2_array[i][3][1]
            });

            console.log("Group2: ", socketid);
            group2.emit("clue1", {
              id: socketid,
              name1: group2_array[i][3][0],
              number1: group2_array[i][3][1]
            });
          } else {
            console.log(
              "Group2: ",
              group2_array[i][1],
              group2_array[i][2],
              group2_array[i][3][0],
              group2_array[i][3][1],
              group2_array[i][4][0],
              group2_array[i][4][1]
            );
            master.emit("group2-2", {
              name: group2_array[i][1],
              number: group2_array[i][2],
              name1: group2_array[i][3][0],
              number1: group2_array[i][3][1],
              name2: group2_array[i][4][0],
              number2: group2_array[i][4][1]
            });
            group2.emit("clue2", {
              id: socketid,
              name1: group2_array[i][3][0],
              number1: group2_array[i][3][1],
              name2: group2_array[i][4][0],
              number2: group2_array[i][4][1]
            });
          }
        }
      }
      group1.emit("done");
      group2.emit("done");
      master.emit("done");
    }

    //Send to individual player
  });
  // Listen for this audience client to disconnect
  socket.on("disconnect", function() {});
});

//---------------------------------PLAYER-----------------------------
//2D Array containing the socket and its associated user name, number, other user
//Eg: [[socket,name,number,[name,number],[name,number]]]
let group1_array = [];

// Clients in the group1 namespace
let group1 = io.of("/group1");
// Listen for player clients to connect
group1.on("connection", function(socket) {
  group1_array.push([socket, "no name", Math.round(Math.random() * 100)]); // 2D array containing the socket and its associated user name, number

  //Listen for name submission and set name
  socket.on("user name 1", function(userName) {
    for (let i = 0; i < group1_array.length; i++) {
      if (group1_array[i][0].id == socket.id) {
        group1_array[i][1] = userName;
        master.emit("new name 1", {
          name: group1_array[i][1],
          number: group1_array[i][2]
        });
      }
    }
  });

  //Listen for mouse position update and send back to the group
  socket.on("mouseDragged", function(data) {
    group1.emit("update", {
      id: socket.id,
      userName: data.userName,
      x: data.x,
      y: data.y
    });
  });

  // Listen for this player client to disconnect
  // Tell all of the audience clients this client disconnected
  socket.on("disconnect", function() {
    io.sockets.emit("disconnected", socket.id);

    // Remove socket
    for (let s = 0; s < group1_array.length; s++) {
      if (group1_array[s][0].id == socket.id) {
        group1_array.splice(s, 1);
      }
    }
  });
});

let group2_array = [];
// Clients in the group1 namespace
let group2 = io.of("/group2");
// Listen for player clients to connect
group2.on("connection", function(socket) {
  group2_array.push([socket, "no name", Math.round(Math.random() * 100)]); // 2D array containing the socket and its associated user name, number

  //Listen for name submission and set name
  socket.on("user name 2", function(userName) {
    for (let i = 0; i < group2_array.length; i++) {
      if (group2_array[i][0].id == socket.id) {
        group2_array[i][1] = userName;
        master.emit("new name 2", {
          name: group2_array[i][1],
          number: group2_array[i][2]
        });
      }
    }
  });

  //Listen for mouse position update and send back to the group
  socket.on("mouseDragged", function(data) {
    group2.emit("update", {
      id: socket.id,
      userName: data.userName,
      x: data.x,
      y: data.y
    });
  });

  // Listen for this player client to disconnect
  // Tell all of the audience clients this client disconnected
  socket.on("disconnect", function() {
    io.sockets.emit("disconnected", socket.id);

    // Remove socket
    for (let s = 0; s < group2_array.length; s++) {
      if (group2_array[s][0].id == socket.id) {
        group2_array.splice(s, 1);
      }
    }
  });
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array.splice(array);
}
