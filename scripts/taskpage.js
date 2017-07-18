var mintextsize = 16;
var maxtextsize = 20;
var namelist = [];
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

function logarray(array) {
    for (var index = 0; index < array.length; ++index) {
        console.log("index: " + array[index]);
    }
    console.log("SEPARATOR");
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

function cleararray(array) {
    for (var iter = 0; iter < array.length; ++iter) {
        array.pop();
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

function createhtmlelement(tagname, innerHTML, classname, idname) {
    this.offset = 0;
    this.fontsize = 22;
    this.newelement = document.createElement(tagname);
    //default attributes
    this.newelement.setAttribute("style", "font-family=monospace;color:black;");
    this.newelement.style.fontSize=this.fontsize + "px";
    if (classname) {
        this.newelement.className = classname;
        //newelement.setAttribute("class", classname);
    }
    if (idname) {
        this.newelement.setAttribute("id", idname);
    }
    this.newelement.innerHTML = innerHTML;
}


var setparent = function(parenthtmlobj, childhtmlobj) {
    this.tasks = []
    this.taskpositions = []
    this.namediv;
    childhtmlobj.fontsize = parenthtmlobj.fontsize - 1;
    if (childhtmlobj.fontsize < mintextsize) {
        childhtmlobj.fontsize = mintextsize;
    }
    childhtmlobj.offset = parenthtmlobj.offset + 3;
    childhtmlobj.newelement.style.fontSize = childhtmlobj.fontsize + "px";
    var childhtml = childhtmlobj.newelement.innerHTML + 8;
    childhtmlobj.newelement.innerHTML = "";
    printspace(childhtmlobj.offset, childhtmlobj.newelement);
    childhtmlobj.newelement.innerHTML += childhtml;
    parenthtmlobj.appendChild(childhtmlobj);
}



/* Days of Week module*/
var namecontainer = function() {
    this.tasks = []
    this.taskpositions = []
    this.namediv;
}

var namecontainer = function() {
    this.namelist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.tasks = [];
    this.names = [];
    // use isassigned to check if random index is already used
    // if all indices have been assigned, then reset isassigned.
    this.isassigned = [];
    this.isassigned.length = this.namelist.length 
    setallzero(this.isassigned);
    this.parentdiv = document.createElement("div");
    this.parentdiv.setAttribute("id", "root");
    this.namelist = []; //list of divs containing name objects
    this.tasklist = []; //list of possible tasks that were inputted
    for(var i=0; i<this.namelist.length;++i) {
        //div that holds dayofweek AND (later) list of tasks
        var namediv = document.createElement("div");
        //container with day of week as inner html
        var dayofweek = new createhtmlelement("span", this.namelist[i], "container", this.namelist[i]);
        /* BUTTON TAG
        var buttontag = createbutton("clear", this.namelist[i] + "btn");
        dayofweek.appendChild(buttontag);
           END BUTTON TAG */
        namediv.appendChild(dayofweek.newelement);
        var dayobj = new namecontainer();
        dayobj.namediv = namediv;
        this.namelist.push(dayobj);
        this.parentdiv.appendChild(dayobj.namediv);
    }
}

var nameobj = new namecontainer();
document.body.appendChild(nameobj.parentdiv);

//numdays schema faster
function randomizetasks() {
    setallzero(nameobj.isassigned);
    var isassigned = nameobj.isassigned;
    var numdays = nameobj.namelist.length;
    clearassignment();
    var numassigned = 0;
    for (var i=0; i < nameobj.tasklist.length; ++i) {
        var divindex = Math.floor(Math.random() * numdays);
        while (isassigned[divindex]) {
            divindex = Math.floor(Math.random() * numdays);
        }
        isassigned[divindex] = 1;
        ++numassigned;
        if (numassigned % numdays == 0) {
            setallzero(isassigned);
        }
        nameobj.namelist[divindex].namediv.appendChild(nameobj.tasklist[i]);
        nameobj.namelist[divindex].taskpositions.push(i);
        nameobj.namelist[divindex].tasks.push(nameobj.tasklist[i]);
    }
}

function assigntask() {
    var namelist = nameobj.namelist;
    var tasklist = nameobj.tasklist;
    //Create floating div with task number; to be assigned under a day of week
    var val = document.getElementById("task-box").value;
    nameobj.tasks.push(val);
    console.log(nameobj.tasks[nameobj.tasks.length-1]);
    return false;
}

function assignnames() {
    var namelist = nameobj.namelist;
    var tasklist = nameobj.tasklist;
    //Create floating div with task number; to be assigned under a day of week
    var val = document.getElementById("name-box").value;
    nameobj.names.push(val);
    console.log(nameobj.names[nameobj.names.length-1]);
    return false;
}

/*Set such that on clicking clear next to day of week removes all tasks from that day*/
var cleartask = function (i) {
    return function() {
        while(nameobj.namelist[i].namediv.childNodes.length > 1) {
            //Clear children of namediv, tasks and taskpositions
            nameobj.namelist[i].namediv.removeChild(nameobj.namelist[i].namediv.lastChild);
        }
        logarray(nameobj.namelist[i].taskpositions);
        for (var posindex = 0; posindex < nameobj.namelist[i].taskpositions.length; ++posindex) {
            nameobj.tasklist[nameobj.namelist[i].taskpositions[posindex]] = -1;
        }
        //The following two are effectively the same in clearing an array
        nameobj.namelist[i].tasks.splice(0, nameobj.namelist[i].tasks.length);
        cleararray(nameobj.namelist[i].taskpositions);
    };
}
/* BUTTONTAG
for (var i=0; i < nameobj.namelist.length; ++i) {
    document.getElementById(nameobj.namelist[i] + "btn").addEventListener("click", cleartask(i));
}
END BUTTONTAG*/
var clearassignment = function() {
    for (var i=0; i<nameobj.namelist.length; ++i) {
        while(nameobj.namelist[i].namediv.childNodes.length > 1) {
            nameobj.namelist[i].namediv.removeChild(nameobj.namelist[i].namediv.lastChild);
        }
        cleararray(nameobj.namelist[i].tasks);
        cleararray(nameobj.namelist[i].taskpositions);
    }
}

var clearall = function() {
    clearassignment();
    nameobj.tasklist.length = 0;
    setallzero(nameobj.isassigned);
}

allclearbtn.addEventListener("click", clearall);
randomizebtn.setAttribute("onclick", "randomizetasks();");