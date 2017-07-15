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

/* Days of Week module */
var daycontainer = function(daydiv) {
    this.tasks = []
    this.taskpositions = []
    this.daydiv = daydiv;
}

var weekcontainer = function() {
    this.parentdiv = document.createElement("div");
    this.parentdiv.setAttribute("id", "root");
    this.divlist = []; //list of divs containing each day of the week and related properties
    this.tasklist = []; //list of possible tasks that were inputted
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for(var i=0; i<this.weekdays.length;++i) {
        //div that holds dayofweek AND (later) list of tasks
        var daydiv = document.createElement("div");
        //container with day of week as inner html
        var dayofweek = document.createElement("span");
        var buttontag = createbutton("clear", this.weekdays[i] + "btn");
        dayofweek.setAttribute("style", "font-size:18px;color:black;font-family:monospace;");
        dayofweek.appendChild(buttontag);
        dayofweek.innerHTML+=this.weekdays[i];
        daydiv.setAttribute("id", this.weekdays[i]);
        daydiv.appendChild(dayofweek);
        var dayobj = new daycontainer(daydiv);
        this.divlist.push(dayobj);
        
        this.parentdiv.appendChild(this.divlist[i].daydiv);
    }
}

var weekobj = new weekcontainer();
document.body.appendChild(weekobj.parentdiv);

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
        weekobj.divlist[divindex].daydiv.appendChild(weekobj.tasklist[i]);
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
    while (divlist[divindex].daydiv.childNodes.length >= taskcapacity) {
        ++divindex;
        if (!divlist[divindex].daydiv) {
            ++taskcapacity
            divindex=0;
        }
    }
    tasklist.push(taskdiv);
    divlist[divindex].daydiv.appendChild(tasklist[tasklist.length - 1]);
    for (var index=0; index < tasklist.length; index++) {
        console.log(tasklist[index]);
    }
    return false;
}

/*Set such that on clicking clear next to day of week removes all tasks from that day*/
var cleartask = function (i) {
    return function() {
        console.log("Before: " + weekobj.divlist[i].daydiv.childNodes.length);
        while(weekobj.divlist[i].daydiv.childNodes.length > 1) {
            weekobj.divlist[i].daydiv.removeChild(weekobj.divlist[i].daydiv.lastChild);
        }
        console.log("After: " + weekobj.divlist[i].daydiv.childNodes.length);
    };
}

for (var i=0; i < weekobj.weekdays.length; ++i) {
    document.getElementById(weekobj.weekdays[i] + "btn").addEventListener("click", cleartask(i));
}

var clearassignment = function() {
    for (var i=0; i<weekobj.weekdays.length; ++i) {
        while(weekobj.divlist[i].daydiv.childNodes.length > 1) {
            
            weekobj.divlist[i].daydiv.removeChild(weekobj.divlist[i].daydiv.lastChild);
        }
    }
}

var clearall = function() {
    clearassignment();
    weekobj.tasklist.length = 0;
}

allclearbtn.addEventListener("click", clearall);
randomizebtn.setAttribute("onclick", "randomizetasks();");