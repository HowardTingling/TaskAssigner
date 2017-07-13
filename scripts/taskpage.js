var divlist = [];
var allclearbtn = document.createElement("button");
allclearbtn.setAttribute("class", "circlebutton");
allclearbtn.innerHTML = "Clear ALL";
document.body.appendChild(allclearbtn);

function printspace(offset, htmltag) {
    for(var space=0; space<offset; space++) {
        htmltag.innerHTML+="&nbsp";
    }
}

function createbutton(innerhtml, id){
    var buttontag = document.createElement("button");
    buttontag.setAttribute("type", "button");
    buttontag.className = "circlebutton";
    buttontag.setAttribute("id", id);
    console.log(id);
    buttontag.innerHTML=innerhtml;
    return buttontag;
}
var parentdiv = document.createElement("div");
parentdiv.setAttribute("id", "root");

/* Days of Week module */
var weekcontainer = function(parentdiv) {
    this.divlist = []; //list of divs containing each day of the week and related properties
    this.tasklist = []; //list of possible tasks that were inputted
    this.taskcount = [];
    for (var i = 0; i < 7; ++i) {
        this.taskcount.push(i);
    }
    function clearday() {
        console.log("CALLED");
        for(var i=0; i<this.divlist.length; ++i) {
            //Set day of week
            console.log(this.divlist[i]);
        }
        console.log(this.divlist.length);    
    }
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for(var i=0; i<this.weekdays.length;++i) {
        
        //div that holds dayofweek AND (later) list of tasks
        var weekdiv = document.createElement("div");
        //container with day of week as inner html
        var dayofweek = document.createElement("span");
        var buttontag = createbutton("clear", this.weekdays[i] + "btn");
        dayofweek.setAttribute("style", "font-size:18px;color:black;font-family:monospace;");
        dayofweek.appendChild(buttontag);
        dayofweek.innerHTML+=this.weekdays[i];
        weekdiv.setAttribute("id", this.weekdays[i]);
        weekdiv.appendChild(dayofweek);
        
        this.divlist.push(weekdiv);
        //console.log(this.divlist[i]);
        parentdiv.appendChild(this.divlist[i]);
    }

}
weekcontainer.prototype.clearday = function() {
    
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

var createfn = function (i) {
    return function() {
      console.log(i + " IN LISTENER");
    };
}

for (var i=0; i < weekobj.weekdays.length; ++i) {
    console.log(weekobj.weekdays[i] + "btn");
    console.log(i + "before eventlistener");
    document.getElementById(weekobj.weekdays[i] + "btn").addEventListener("click", createfn(i));
}