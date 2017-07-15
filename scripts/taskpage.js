var divlist = [];
var allclearbtn = document.createElement("button");
allclearbtn.setAttribute("class", "circlebutton");
allclearbtn.innerHTML = "Clear ALL";
var randomizebtn = document.createElement("button");
randomizebtn.setAttribute("class", "circlebutton");
randomizebtn.innerHTML = "Randomize Tasks";
document.body.appendChild(allclearbtn);
document.body.appendChild(randomizebtn);

function printspace(offset, htmltag) {
    for(var space=0; space<offset; space++) {
        htmltag.innerHTML+="&nbsp";
    }
}

function zeroarray(array) {
    for (var index = 0; index < array.length; ++index) {
        array[index] = 0;
    }
}

function createbutton(innerhtml, id){
    var buttontag = document.createElement("button");
    buttontag.setAttribute("type", "button");
    buttontag.className = "circlebutton";
    buttontag.setAttribute("id", id);
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

var weekobj = new weekcontainer(parentdiv);
document.body.appendChild(parentdiv);

function randomizetasks() {
    var numdays = weekobj.weekdays.length;
    var isassigned = [];
    for (var i=0; i < numdays; ++i) {
        isassigned[i] = 0;
    }
    clearassignment();
    var numassigned = 0;
    for (var i=0; i < weekobj.tasklist.length; ++i) {
        var divindex = Math.floor(Math.random() * numdays);
        while (isassigned[divindex]) {
            divindex = Math.floor(Math.random() * numdays);
        }
        isassigned[divindex] = 1;
        ++numassigned;
        if (numassigned % numdays == 0) {
            zeroarray(isassigned);
        }
        weekobj.divlist[divindex].appendChild(weekobj.tasklist[i]);
    }
}
function assigntasks() {
    var taskcapacity=2;
    var divlist = weekobj.divlist;
    var tasklist = weekobj.tasklist;
    var val = document.getElementById("task-box").value;
    //tasklist.push(val);
    var divindex = 0;
    var taskdiv = document.createElement("container");
    taskdiv.innerHTML+="<br>";
    printspace(5, taskdiv);
    taskdiv.innerHTML+= val;
    while (divlist[divindex].childNodes.length >= taskcapacity) {
        ++divindex;
        if (!divlist[divindex]) {
            ++taskcapacity
            divindex=0;
        }
    }
    tasklist.push(taskdiv);
    divlist[divindex].appendChild(tasklist[tasklist.length - 1]);
    for (var index=0; index < tasklist.length; index++) {
        console.log(tasklist[index]);
    }
    return false;
}

/*Set such that on clicking clear next to day of week removes all tasks from that day*/
var cleartask = function (i) {
    return function() {
        console.log("Before: " + weekobj.divlist[i].childNodes.length);
        while(weekobj.divlist[i].childNodes.length > 1) {
            weekobj.divlist[i].removeChild(weekobj.divlist[i].lastChild);
        }
        console.log("After: " + weekobj.divlist[i].childNodes.length);
    };
}

for (var i=0; i < weekobj.weekdays.length; ++i) {
    document.getElementById(weekobj.weekdays[i] + "btn").addEventListener("click", cleartask(i));
}

var clearassignment = function() {
    for (var i=0; i<weekobj.weekdays.length; ++i) {
        while(weekobj.divlist[i].childNodes.length > 1) {
            
            weekobj.divlist[i].removeChild(weekobj.divlist[i].lastChild);
        }
    }
}

var clearall = function() {
    clearassignment();
    weekobj.tasklist.length = 0;
}

allclearbtn.addEventListener("click", clearall);
randomizebtn.setAttribute("onclick", "randomizetasks();");