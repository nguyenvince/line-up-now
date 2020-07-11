// Open and connect input socket
let socket = io("/group1");

// Listen for confirmation of connection
socket.on("connect", function() {
    console.log("Connected");
});

//Random function
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//marquee
let fontSize = 100;
for (let i = 0; i < Math.floor(window.innerHeight / fontSize) + 1; i++) {
    let div = document.createElement("div");
    div.className = "marquee";
    div.style.color =
        "rgba(" +
        rand(150, 255).toString() +
        "," +
        rand(150, 255).toString() +
        "," +
        rand(150, 255).toString() +
        ",0.35)";
    div.style.fontSize = fontSize.toString() + "px";
    div.style.lineHeight = fontSize.toString() + "px";
    div.style.top = ((i - 1) * fontSize).toString() + "px";
    document.body.appendChild(div);
}
let marquees = document.getElementsByClassName("marquee");

function updateMarquee() {
    for (let i = 0; i < marquees.length; i++) {
        let marquee = marquees[i];
        let array = [];
        for (let i = 0; i < 50; i++) {
            array.push(rand(10, 99).toString() + " ");
        }
        marquee.textContent = array.join("");
        marquee.style.color =
            "rgba(" +
            rand(125, 255).toString() +
            "," +
            rand(125, 255).toString() +
            "," +
            rand(125, 255).toString() +
            ",0.35)";
    }
}
var updateInterval = setInterval(updateMarquee, 250);

let nameForm = document.forms[0];
let nameInput = nameForm.elements["name"];
let userName = "";
// listen for the form to be submitted and send the name to the server
nameForm.onsubmit = function(event) {
    // stop our form submission from refreshing the page
    event.preventDefault();

    // get name
    userName = nameInput.value;
    if (userName === "") {
        alert("Empty field. Please input your name before pressing start");
        return;
    }
    socket.emit("user name 1", userName);

    // turn off form
    $("#name-form").css("display", "none");
    $("#submit").css("display", "none");
    //clear interval
    clearInterval(updateInterval);
    //waiting:
    $("p")[0].innerHTML += "<br>Waiting for Other Teammates..."

};

let name1, number1, name2, number2;

//Receive clue
socket.on("clue1", function(data) {
    if (socket.id == data.id) {
        name1 = data.name1;
        number1 = data.number1;
        $("#clue").css("display", "block");
        $("#name1").html(name1);
        $("#number1").html(number1);
    }

});
socket.on("clue2", function(data) {
    if (socket.id == data.id) {
        name1 = data.name1;
        number1 = data.number1;
        name2 = data.name2;
        number2 = data.number2;
        $("#clue").css("display", "block");
        $("#name1").html(name1);
        $("#number1").html(number1);
        $("#name2").html(name2);
        $("#number2").html(number2);
    }


});

function setup() {
    // myFont = loadFont("https://cdn.glitch.com/62bbae8f-1402-4417-b5af-d20bdb643775%2FOswald-Medium.ttf?v=1576039122254");
    createCanvas(windowWidth, windowHeight);
    // textFont(myFont,20);
}

let x, y;
let users = {};
let waiting = true;
socket.on("update", function(data) {
    // Update user's data
    if (data.id in users) {
        let user = users[data.id];
        user.x = data.x;
        user.y = data.y;
    }
    // Or create a new user
    else {
        users[data.id] = {
            x: data.x,
            y: data.y,
            userName: data.userName
        };
    }
});

socket.on("done", function() {
    waiting = false;
    //lineup now
    $(".marquee").css("display", "none");
    $("p")[0].innerHTML = "Line Up, Now!"
    socket.emit("mouseDragged", {
        userName: userName,
        x: Math.random(),
        y: 0.5
    });
});

function draw() {
    noStroke();
    if (!waiting) {
        background(0);
        let cnt = 0;
        textAlign(CENTER);

        for (let u in users) {
            let user = users[u];
            if (user.userName == userName) {
                fill(255, 0, 0);
            } else {
                fill(255);
            }

            rectMode(RADIUS);
            //De-normalize x and y data
            rect(user.x * width, user.y * height, 25, 25);

            textSize(20);
            text(user.userName, user.x * width, user.y * height - 40);
            cnt++;
        }
        for (let i = 1; i < cnt; i++) {
            stroke(255);
            line((i * width) / cnt, height / 4, (i * width) / cnt, (3 * height) / 4);
        }
        noStroke();
        fill(255);
        text("smallest", (0.5 * width) / cnt, height / 4);
        text("biggest", ((cnt - 0.5) * width) / cnt, height / 4);
    }
}

function mouseDragged() {
    if (!waiting) {
        //Normalize mouseX and mouseY data

        socket.emit("mouseDragged", {
            userName: userName,
            x: mouseX / width,
            y: mouseY / height
        });
    }
}