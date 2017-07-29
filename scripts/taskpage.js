var mintextsize = 16;
var maxtextsize = 20;
var allclearbtn = document.getElementById("allclearbtn");
var randomizebtn = document.getElementById("randomizebtn");
var testbtn = document.getElementById("testbtn");
var tasktopeople = document.getElementById("tasktopeople");
var peopletotask = document.getElementById("peopletotask");
var taskslist = document.getElementById("tasks");
var peoplelist = document.getElementById("people");

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
/*
|r0,c0|r0,c1|
|r1,c0|r1,c1|

| 0,0 | 0,1 | 0,2 | 0,3 | 0,4 |
| 1,0 | 1,1 | 1,2 | 1,3 | 1,4 |
| 2,0 | 2,1 | 2,2 | 2,3 | 2,4 |
| 3,0 | 3,1 | 3,2 | 3,3 | 3,4 |

1. Create table
2. Add first table row
3. Under each table row, add a person (th) separated by a space (td)
4. The next row is the first assignment to each person 
	"row1col" + divindex
*/
//createTable(nameobj.names, nameobj.tasks)
//createTable(stringlist1, stringlist2);\
//returns a table
function createTable(containerlist,containeelist) {
    var tablehead = document.createElement("table");
    tablehead.className = "tablehead";
    /* Add first row with group heads */
    var firstrow = document.createElement("tr");
    firstrow.setAttribute("id", "headrow");
    tablehead.appendChild(firstrow);
    for (var i = 0; i < containerlist.length; ++i) {
        var container = document.createElement("th");
        container.innerHTML = containerlist[i];
        firstrow.appendChild(container);
        if (i != containerlist.length - 1) {
            firstrow.appendChild(document.createElement("td"));
        }
    }
    /* Finished first row group head creation */
    /* add rows of empty td's */
    var numrows = Math.ceil(containeelist.length / containerlist.length);
    for (var row = 0; row < numrows; ++row) {
        var tablerow = document.createElement("tr");
        tablerow.id = "row" + row;
        for (var col = 0; col < containerlist.length; ++col) {
            var column = document.createElement("td");
            column.innerHTML = "";
            column.setAttribute("id", "row" + row + "col" + col);
            tablerow.appendChild(column);
            if (col != containerlist.length - 1) {
                var emptytd = document.createElement("td");
                tablerow.appendChild(emptytd);
            }
        }
        tablehead.appendChild(tablerow);
    }
    return tablehead;
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
    childhtmlobj.offset = parenthtmlobj.offset + 1;
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
    this.tasktopeople = tasktopeople.checked;
    this.peopletotask = peopletotask.checked;
    this.peopletotask = document.getElementById("peopletotask");
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

function randomizetasks() {
    var isassigned = nameobj.isassigned;
    setallzero(isassigned);
    var numpeople = nameobj.names.length;
    var numtasks = nameobj.tasks.length;
    erasediv(nameobj.parentdiv);
    var numassigned = 0;
    if (nameobj.tasktopeople) {
        /* Create table */
        var tablehead = createTable(nameobj.names, nameobj.tasks);
        nameobj.parentdiv.appendChild(tablehead);
        document.body.appendChild(nameobj.parentdiv);
        //find random index and assign if available repeatedly
        var row = 0;
        for (var i=0; i < nameobj.tasks.length; ++i) {
            var col = Math.floor(Math.random() * numpeople);
            while (isassigned[col]) {
                col = Math.floor(Math.random() * numpeople);
            }
            var rowcolumn = document.getElementById("row" + row + "col" + col);
            console.log("ID: row" + row + "col" + col);
            rowcolumn.innerHTML = nameobj.tasks[i];
            isassigned[col] = 1;
            ++numassigned;
            if (numassigned % numpeople == 0) {
                setallzero(isassigned);
                ++row;
            }
        }
    } else {
        /* Create table */
        var tablehead = createTable(nameobj.tasks, nameobj.names);
        nameobj.parentdiv.appendChild(tablehead);
        document.body.appendChild(nameobj.parentdiv);
        //find random index and assign if available repeatedly
        var row = 0;
        for (var i=0; i < nameobj.names.length; ++i) {
            var col = Math.floor(Math.random() * numtasks);
            while (isassigned[col]) {
                col = Math.floor(Math.random() * numtasks);
            }
            var rowcolumn = document.getElementById("row" + row + "col" + col);
            console.log("ID: row" + row + "col" + col);
            rowcolumn.innerHTML = nameobj.names[i];
            isassigned[col] = 1;
            ++numassigned;
            if (numassigned % numtasks == 0) {
                setallzero(isassigned);
                ++row;
            }
        }
    }
}
    

function assigntask() {
    var val = document.getElementById("task-box").value;
    if (val == "") {
        return false;
    }
    var namelist = nameobj.namelist;
    var tasklist = nameobj.tasklist;
    nameobj.tasks.push(val);
    taskslist.innerHTML += "(" + val + ")" + "&nbsp";
    console.log(nameobj.tasks[nameobj.tasks.length-1]);
    return false;
}

function assignnames() {
    var val = document.getElementById("name-box").value;
    if (val == "") {
        return false;
    }
    var namelist = nameobj.namelist;
    var tasklist = nameobj.tasklist;
    nameobj.names.push(val);
    peoplelist.innerHTML += "(" + val + ")" + "&nbsp";
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
    taskslist.innerHTML = "Tasks: ";
    peoplelist.innerHTML = "People: ";
}

var loglists = function(namelist, tasklist) {
    logarray(namelist);
    logarray(tasklist);
}

var updateAssignSchema = function() {
    nameobj.peopletotask = peopletotask.checked;
    nameobj.tasktopeople = tasktopeople.checked;
    console.log(nameobj.peopletotask);
}

allclearbtn.addEventListener("click", clearall);
randomizebtn.setAttribute("onclick", "randomizetasks();");
tasktopeople.addEventListener("click", updateAssignSchema);
peopletotask.addEventListener("click", updateAssignSchema);