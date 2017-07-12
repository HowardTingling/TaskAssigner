var divlist = [];

function printspace(offset, htmltag) {
    for(var space=0; space<offset; space++) {
        htmltag.innerHTML+="&nbsp";
    }
}

function createbutton(innerhtml){
    var buttontag = document.createElement("button");
    buttontag.setAttribute("type", "button");
    buttontag.className = "circlebutton";
    buttontag.innerHTML=innerhtml;
    return buttontag;
}
var parentdiv = document.createElement("div");

/* Days of Week module */
var weekcontainer = function(parentdiv) {
    this.divlist = [];
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for(var i=0; i<this.weekdays.length;++i) {
        var outerdiv = document.createElement("div");
        //Set day of week
        var weekdiv = document.createElement("div");
        weekdiv.setAttribute("style", "font-size:18px;color:black;font-family:monospace;");
        weekdiv.appendChild(createbutton("clear"));
        weekdiv.innerHTML+=this.weekdays[i];
        this.divlist.push(weekdiv);
        parentdiv.appendChild(this.divlist[i]);
    }
}
var weekobj = new weekcontainer(parentdiv);
document.body.appendChild(parentdiv);


var tasklist = [];
document.getElementById("task-box").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("task-enter").click();
    }
});

function hitbutton() {
    var val = document.getElementById("task-box").value;
    tasklist.push(val);
    var divindex = Math.floor(Math.random() * 6);
    divlist[divindex].innerHTML+="<br>";
    printspace(5, divlist[divindex]);
    divlist[divindex].innerHTML+= val;
    for (var index=0; index < tasklist.length; index++) {
        console.log(tasklist[index]);
    }
}

function drawweeks() {
    
}