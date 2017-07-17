var mintextsize = 16;
var maxtextsize = 20;
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
}


/* Days of Week module*/
var daycontainer = function() {
    this.tasks = []
    this.taskpositions = []
    this.daydiv;
}

var weekcontainer = function() {
    this.namelist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // use isassigned to check if random index is already used
    // if all indices have been assigned, then reset isassigned.
    this.isassigned = [];
    this.isassigned.length = this.namelist.length 
    setallzero(this.isassigned);
    this.parentdiv = document.createElement("div");
    this.parentdiv.setAttribute("id", "root");
    this.divlist = []; //list of divs containing each day of the week and related properties
    this.tasklist = []; //list of possible tasks that were inputted
    for(var i=0; i<this.namelist.length;++i) {
        //div that holds dayofweek AND (later) list of tasks
        var daydiv = document.createElement("div");
        //container with day of week as inner html
        var dayofweek = new createhtmlelement("span", this.namelist[i], "container", this.namelist[i]);
        /* BUTTON TAG
        var buttontag = createbutton("clear", this.namelist[i] + "btn");
        dayofweek.appendChild(buttontag);
           END BUTTON TAG */
        daydiv.appendChild(dayofweek.newelement);
        var dayobj = new daycontainer();
        dayobj.daydiv = daydiv;
        this.divlist.push(dayobj);
        this.parentdiv.appendChild(dayobj.daydiv);
    }
}

var nameobj = new weekcontainer();
document.body.appendChild(nameobj.parentdiv);

//numdays schema faster
function randomizetasks() {
    setallzero(nameobj.isassigned);
    var isassigned = nameobj.isassigned;
    var numdays = nameobj.divlist.length;
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
        nameobj.divlist[divindex].daydiv.appendChild(nameobj.tasklist[i]);
        nameobj.divlist[divindex].taskpositions.push(i);
        nameobj.divlist[divindex].tasks.push(nameobj.tasklist[i]);
    }
}

function assigntask() {
    var divlist = nameobj.divlist;
    var tasklist = nameobj.tasklist;
    //Create floating div with task number; to be assigned under a day of week
    var val = document.getElementById("task-box").value;
    var taskdiv = new createhtmlelement("span", "<br>" + val, "item");
    var divindex = Math.floor(Math.random() * nameobj.divlist.length);
    while (nameobj.isassigned[divindex]) {
        divindex = Math.floor(Math.random() * nameobj.divlist.length);
    }
    nameobj.isassigned[divindex] = true;
    if (isalltrue(nameobj.isassigned)) {
        setallzero(nameobj.isassigned);
    }
    tasklist.push(taskdiv.newelement);
    divlist[divindex].tasks.push(taskdiv.newelement);
    divlist[divindex].daydiv.appendChild(tasklist[tasklist.length - 1]);
    divlist[divindex].taskpositions.push(tasklist.length - 1);
    return false;
}

/*Set such that on clicking clear next to day of week removes all tasks from that day*/
var cleartask = function (i) {
    return function() {
        while(nameobj.divlist[i].daydiv.childNodes.length > 1) {
            //Clear children of daydiv, tasks and taskpositions
            nameobj.divlist[i].daydiv.removeChild(nameobj.divlist[i].daydiv.lastChild);
        }
        logarray(nameobj.divlist[i].taskpositions);
        for (var posindex = 0; posindex < nameobj.divlist[i].taskpositions.length; ++posindex) {
            nameobj.tasklist[nameobj.divlist[i].taskpositions[posindex]] = -1;
        }
        //The following two are effectively the same in clearing an array
        nameobj.divlist[i].tasks.splice(0, nameobj.divlist[i].tasks.length);
        cleararray(nameobj.divlist[i].taskpositions);
    };
}
/* BUTTONTAG
for (var i=0; i < nameobj.namelist.length; ++i) {
    document.getElementById(nameobj.namelist[i] + "btn").addEventListener("click", cleartask(i));
}
END BUTTONTAG*/
var clearassignment = function() {
    for (var i=0; i<nameobj.namelist.length; ++i) {
        while(nameobj.divlist[i].daydiv.childNodes.length > 1) {
            nameobj.divlist[i].daydiv.removeChild(nameobj.divlist[i].daydiv.lastChild);
        }
        cleararray(nameobj.divlist[i].tasks);
        cleararray(nameobj.divlist[i].taskpositions);
    }
}

var clearall = function() {
    clearassignment();
    nameobj.tasklist.length = 0;
    setallzero(nameobj.isassigned);
}

allclearbtn.addEventListener("click", clearall);
randomizebtn.setAttribute("onclick", "randomizetasks();");