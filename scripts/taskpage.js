var mintextsize = 16;
var maxtextsize = 20;
var allclearbtn = document.getElementById("allclearbtn");
var randomizebtn = document.getElementById("randomizebtn");
var testbtn = document.getElementById("testbtn");
function printspace(offset, htmltag) {
    for(var space=0; space<offset; space++) {
        htmltag.innerHTML+="&nbsp";
    }
}

function logarray(array) {
    for (var index = 0; index < array.length; ++index) {
        console.log(index + ": " + array[index]);
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

function cleararray(array) {
    console.log("length: " + array.length);
    for (var iter = 0; iter < array.length; ++iter) {
        console.log(iter + ": " + array.pop());
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
    this.htmlelement = document.createElement(tagname);
    this.childrenhtml = [];
    //default attributes
    this.htmlelement.setAttribute("style", "font-family=monospace;color:black;");
    this.htmlelement.style.fontSize=this.fontsize + "px";
    if (classname) {
        this.htmlelement.className = classname;
        //htmlelement.setAttribute("class", classname);
    }
    if (idname) {
        this.htmlelement.id = idname;
    }
    this.htmlelement.innerHTML = innerHTML;
}

function erasediv(divelem) {
    while(divelem.firstChild) {
        divelem.removeChild(divelem.firstChild);
    }
}

var setparent = function(parenthtmlobj, childhtmlobj) {
    this.tasks = [];
    this.taskpositions = [];
    this.namediv;
    childhtmlobj.fontsize = parenthtmlobj.fontsize - 1;
    if (childhtmlobj.fontsize < mintextsize) {
        childhtmlobj.fontsize = mintextsize;
    }
    childhtmlobj.offset = parenthtmlobj.offset + 3;
    childhtmlobj.htmlelement.style.fontSize = childhtmlobj.fontsize + "px";
    var childhtml = childhtmlobj.htmlelement.innerHTML;
    childhtmlobj.htmlelement.innerHTML = "";
    printspace(childhtmlobj.offset, childhtmlobj.htmlelement);
    childhtmlobj.htmlelement.innerHTML += childhtml;
    parenthtmlobj.childrenhtml.push(childhtmlobj.htmlelement);
    parenthtmlobj.htmlelement.appendChild(childhtmlobj.htmlelement);
}

/* Days of Week module*/
var namecontainer = function() {
    this.tasks = [];
    this.taskpositions = [];
    this.namediv;
}

var htmlcontainer = function() {
    this.parentdiv =  document.createElement("div");
    this.nameshtmllist = []; //contains html elems of names
    this.taskshtmllist = []; //contains html elems of tasks
    this.tasks = []; //contains list of strings of tasks
    this.names = []; //contains list of strings of names
    // use isassigned to check if random index is already used
    // if all indices have been assigned, then reset isassigned.
    this.isassigned = [];
    this.isassigned.length = this.names.length 
    setallzero(this.isassigned);
    this.resultdiv = document.createElement("div");
    this.resultdiv.setAttribute("id", "root");
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
        namediv.appendChild(dayofweek.htmlelement);
        var dayobj = new namecontainer();
        dayobj.namediv = namediv;
        this.namelist.push(dayobj);
        this.resultdiv.appendChild(dayobj.namediv);
    }
}

var nameobj = new htmlcontainer();
document.body.appendChild(nameobj.parentdiv);
//numdays schema faster
function randomizetasks() {
    var isassigned = nameobj.isassigned;
    setallzero(isassigned);
    var numpeople = nameobj.names.length;
    console.log(nameobj.nameshtmllist);
    /*
    for (var i = 0; i < nameobj.nameshtmllist.length; ++i) {
        var temp = document.getElementById("names" + i);
        temp.parentNode.removeChild(temp);
    }
    */
    console.log(nameobj.parentdiv);
    erasediv(nameobj.parentdiv);
    nameobj.nameshtmllist.length = 0;
    nameobj.taskshtmllist.length = 0;
    //clearassignment();
    var numassigned = 0;
    //create html divs for each person and push onto nameshtmllist
    for (var i=0; i < nameobj.names.length; ++i) {
        nameobj.nameshtmllist.push(new createhtmlelement("div", nameobj.names[i], "container", "names" + i));
    }
    //create html tags for each task and push onto taskshtmllist
    for (var i = 0; i < nameobj.tasks.length; ++i) {
        nameobj.taskshtmllist.push(new createhtmlelement("div", nameobj.tasks[i], "item", "items" + i));
    }
    for (var i=0; i < nameobj.tasks.length; ++i) {
        var divindex = Math.floor(Math.random() * numpeople);
        while (isassigned[divindex]) {
            divindex = Math.floor(Math.random() * numpeople);
        }
        isassigned[divindex] = 1;
        ++numassigned;
        if (numassigned % numpeople == 0) {
            setallzero(isassigned);
        }
        setparent(nameobj.nameshtmllist[divindex], nameobj.taskshtmllist[i]);
    }
    for (var i = 0; i < nameobj.nameshtmllist.length; ++i) {
        nameobj.parentdiv.appendChild(nameobj.nameshtmllist[i].htmlelement);
        for (var j = 0; j < nameobj.nameshtmllist[i].childrenhtml.length; ++j) {
            //nameobj.nameshtmllist[i].childrenhtml[j]
        }
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
    erasediv(nameobj.parentdiv);
    nameobj.names.length = 0;
    nameobj.tasks.length = 0;
}

var clearall = function() {
    clearassignment();
    nameobj.tasklist.length = 0;
    setallzero(nameobj.isassigned);
}

var loglists = function(namelist, tasklist) {
    logarray(namelist);
    logarray(tasklist);
}

allclearbtn.addEventListener("click", clearall);
randomizebtn.setAttribute("onclick", "randomizetasks();");
testbtn.addEventListener("click", function() {
    loglists(nameobj.names, nameobj.tasks);
});