var divlist = [];

function printspace(offset, htmltag) {
    for(var space=0; space<offset; space++) {
        htmltag.innerHTML+="&nbsp";
    }
}

function createbutton(innerhtml, weekobj){
    var buttontag = document.createElement("button");
    buttontag.setAttribute("type", "button");
    buttontag.onclick = weekobj.clearday();
    buttontag.className = "circlebutton";
    buttontag.innerHTML=innerhtml;
    return buttontag;
}
var parentdiv = document.createElement("div");

/* Days of Week module */
var weekcontainer = function(parentdiv) {
    this.divlist = [];
    this.tasklist = [];
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for(var i=0; i<this.weekdays.length;++i) {
        //Set day of week
        var weekdiv = document.createElement("div");
        weekdiv.setAttribute("style", "font-size:18px;color:black;font-family:monospace;");
        weekdiv.appendChild(createbutton("clear", this));
        weekdiv.innerHTML+=this.weekdays[i];
        this.divlist.push(weekdiv);
        parentdiv.appendChild(this.divlist[i]);
    }
}
weekcontainer.prototype.clearday = function() {
    for (var i=0; i < this.weekdays; ++i) {
        this.innerHTML = "";
        this.divlist[i] = "";
        this.divlist[i].appendChild(createbutton("clear"));
        this.divlist[i].innerHTML = this.weekdays[i];
    }
}
var weekobj = new weekcontainer(parentdiv);
document.body.appendChild(parentdiv);

document.getElementById("task-box").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("task-enter").click();
    }
});

var displaycount = 0;
function hitbutton() {
    var divlist = weekobj.divlist;
    var tasklist = weekobj.tasklist;
    var val = document.getElementById("task-box").value;
    tasklist.push(val);
    var divindex = Math.floor(Math.random() * 6);
    if (displaycount == 7) {
        displaycount=0;
    }
    divindex = displaycount;
    displaycount += 1;
    var taskdiv = document.createElement("container");
    taskdiv.innerHTML+="<br>";
    printspace(5, taskdiv);
    taskdiv.innerHTML+= val;
    divlist[divindex].appendChild(taskdiv);
    for (var index=0; index < tasklist.length; index++) {
        console.log(tasklist[index]);
    }
}