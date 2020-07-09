// Open and connect input socket
let socket = io("/master");

// Listen for confirmation of connection
socket.on("connect", function() {
  console.log("Connected");
});
let group1_array = [];
let tmp1 = [];
let group2_array = [];
let tmp2 = [];
let startButton = document.getElementById("start-button");
function setup() {
  createCanvas(windowWidth, windowHeight);
  //send start message to server
  startButton.addEventListener("click", function() {
    socket.emit("start");
    group1_array = [];
    group2_array = [];
  });

  //receive the new name inputed by users
  socket.on("new name 1", function(data) {
    tmp1.push([data.name, data.number]);
    console.log("Group1: ",tmp1);
  });
  socket.on("new name 2", function(data) {
    tmp2.push([data.name, data.number]);
    console.log("Group2: ",tmp2);
  });
  
  //receive the group number from the server after the start event
  socket.on("group1-1", function(data) {
    group1_array.push([data.name, data.number, [data.name1, data.number1]]);
    console.log("Group1: ",group1_array);
   
  });
  socket.on("group1-2", function(data) {
    group1_array.push([
      data.name,
      data.number,
      [data.name1, data.number1],
      [data.name2, data.number2]
    ]);
    console.log("Group1: ",group1_array);
   
  });
  socket.on("group2-1", function(data) {
    group2_array.push([data.name, data.number, [data.name1, data.number1]]);
    console.log("Group2: ",group2_array);
  });
  socket.on("group2-2", function(data) {
    group2_array.push([
      data.name,
      data.number,
      [data.name1, data.number1],
      [data.name2, data.number2]
    ]);
    console.log("Group2: ",group1_array);
  });
  
  
  //receive done signal, update list of people on html file
  socket.on("done",function(){
    $("#group1,#group2").append("<ul></ul>");
    for (let i=0;i<group1_array.length;i++){
      let item = group1_array[i][0] + group1_array[i][1].toString();//concaternate name and number
      $("#group1 ul").append("<li>"+item+"</li>")
    }
    for (let i=0;i<group2_array.length;i++){
      let item = group2_array[i][0] + group2_array[i][1].toString();//concaternate name and number
      $("#group2 ul").append("<li>"+item+"</li>")
    }
    
  });
}
