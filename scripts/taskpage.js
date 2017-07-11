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
    for (var index=0; index < tasklist.length; index++) {
        console.log(tasklist[index]);
    }
}