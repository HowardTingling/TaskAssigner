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

function setallzero(array) {
    for (var index = 0; index < array.length; ++index) {
        array[index] = 0;
    }
}


function isalltrue(array) {
    var result = 0;
    for (var index = 0; index < array.length; ++index) {
        if (array[index]) {
            result += 1;
        }
    }
    return (result === array.length);
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
    this.weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // use isassigned to check if random index is already used
    // if all indices have been assigned, then reset isassigned.
    this.isassigned = [];
    this.isassigned.length = this.weekdays.length 
    setallzero(this.isassigned);
    this.parentdiv = document.createElement("div");
    this.parentdiv.setAttribute("id", "root");
    this.divlist = []; //list of divs containing each day of the week and related properties
    this.tasklist = []; //list of possible tasks that were inputted
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
        this.parentdiv.appendChild(dayobj.daydiv);
    }
}

var weekobj = new weekcontainer();
document.body.appendChild(weekobj.parentdiv);

function randomizetasks() {
    setallzero(weekobj.isassigned);
    var isassigned = weekobj.isassigned;
    var numdays = weekobj.divlist.length;
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
            setallzero(isassigned);
        }
        weekobj.divlist[divindex].daydiv.appendChild(weekobj.tasklist[i]);
    }
}

function assigntasks() {
    var divlist = weekobj.divlist;
    var tasklist = weekobj.tasklist;
    //Create floating div with task number; to be assigned under a day of week
    var taskdiv = document.createElement("container");
    taskdiv.innerHTML+="<br>";
    printspace(5, taskdiv);
    var val = document.getElementById("task-box").value;
    taskdiv.innerHTML+= val;
    var divindex = Math.floor(Math.random() * weekobj.divlist.length);
    while (weekobj.isassigned[divindex]) {
        divindex = Math.floor(Math.random() * weekobj.divlist.length);
    }
    weekobj.isassigned[divindex] = true;
    if (isalltrue(weekobj.isassigned)) {
        setallzero(weekobj.isassigned);
    }
    tasklist.push(taskdiv);
    divlist[divindex].tasks.push(taskdiv);
    divlist[divindex].daydiv.appendChild(tasklist[tasklist.length - 1]);
    divlist[divindex].taskpositions.push(tasklist.length - 1);
    return false;
}

/*Set such that on clicking clear next to day of week removes all tasks from that day*/
var cleartask = function (i) {
    return function() {
        while(weekobj.divlist[i].daydiv.childNodes.length > 1) {
            //Clear children of daydiv, tasks and taskpositions
            weekobj.divlist[i].daydiv.removeChild(weekobj.divlist[i].daydiv.lastChild);
        }
        for (var posindex = 0; posindex < weekobj.divlist[i].taskpositions.length; ++posindex) {
            //weekobj.tasklist[weekobj.divlist[i].taskpositions[posindex]] = null;
            console.log(weekobj.divlist[i].taskpositions[posindex]);
        }
        weekobj.divlist[i].tasks.splice(0, weekobj.divlist[i].tasks.length)
        weekobj.divlist[i].taskpositions.length = 0;
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