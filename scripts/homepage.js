var gotclicked = 0;
var onMouseHold = function(buttonarg) {
	return function(e) {
    if (gotclicked == 1) {
      buttonarg.textContent = "IN";
      buttonarg.style.position = "absolute";
      var bcoords = buttonarg.getBoundingClientRect();
      console.log(bcoords.top, bcoords.right, bcoords.bottom, bcoords.left);
      var topPos = e.clientY - ((bcoords.bottom - bcoords.top)/2) + "px"
      var leftPos = e.clientX - ((bcoords.right - bcoords.left)/2) + "px"
      buttonarg.style.top = topPos;
      buttonarg.style.left = leftPos;
    } else {
      buttonarg.textContent = "OUT";
    }
  }
  
}
        var buttons = document.querySelectorAll('.MyButton');
        buttons[0].addEventListener("mousedown", function() {
            gotclicked = !gotclicked;
        });
        window.addEventListener("mousemove", onMouseHold(buttons[0]));

