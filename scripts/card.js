/* CARD MODULE */
var mouseDown = 0;
var onMouseHold = function(card) {
	return function(e) {
        if (mouseDown == 1) {
            console.log(e);
            card.style.position = "absolute";
            var cardCoordinates = card.getBoundingClientRect();
            console.log(cardCoordinates.top, cardCoordinates.right, cardCoordinates.bottom, cardCoordinates.left);
            var topPos = e.clientY - ((cardCoordinates.bottom - cardCoordinates.top)/2) + "px"
            var leftPos = e.clientX - ((cardCoordinates.right - cardCoordinates.left)/2) + "px"
            card.style.top = topPos;
            card.style.left = leftPos;
        } else {
        }
    }
}

window.onmousedown = function() { 
    ++mouseDown;
}
window.onmouseup = function() {
    --mouseDown;
}
var cards = document.querySelectorAll('.card');
window.addEventListener("mousemove", onMouseHold(cards[0]));