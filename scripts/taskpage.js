function printspace(offset, htmltag) {
    for(var space=0; space<offset; space++) {
        htmltag.innerHTML+="&nbsp";
    }
}
/* Days of Week module */
var weeks = function() {
    
}
var divlist = [];
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function creatediv(divhtml) {
    var fontoffset = 9-divhtml.length
    var newdiv = document.createElement("div");
    newdiv.setAttribute("style", "font-size:20px; color:black;font-family:monospace;");
    printspace(fontoffset, newdiv);
    newdiv.innerHTML+=(divhtml + ":&nbsp");
    divlist.push(newdiv);
    document.body.appendChild(newdiv);
}
for (var index=0; index < weekdays.length; index++) {
    creatediv(weekdays[index]);
}

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