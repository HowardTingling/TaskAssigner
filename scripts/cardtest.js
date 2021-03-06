Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
/* CARD MODULE */
var driver = function() {
    
    var passengercoordinates = []; //push coordinates
}
var coordinates = function() {
    
}
var card = function(fontsize, width, string, xpos, ypos) {
    this.fontsize = fontsize;
    this.height = fontsize/1.5;
    this.width = string.length * 9;
    this.string = string;
    this.xpos = xpos;
    this.ypos = ypos;
    this.focus = 0;
}

card.prototype.draw = function() {
    var cardbutton = document.createElement("div");
    cardbutton.setAttribute("style","position:absolute;top:"+this.ypos+"px;left:"+this.xpos+"px;padding-right:7px;padding-top:5px;padding-left:8px;border-radius: 5px;width:" + this.width + "px; height:" + this.height +"px; border:1px solid #000;");
    cardbutton.textContent = this.string;
    document.body.appendChild(cardbutton);
}

card.prototype.drawat = function(xpos, ypos) {
    this.xpos = xpos;
    this.ypos = ypos;
    var cardbutton = document.createElement("div");
    cardbutton.setAttribute("style","position:absolute;top:"+this.ypos+"px;left:"+this.xpos+"px;padding-right:7px;padding-top:5px;padding-left:8px;border-radius: 5px;width:" + this.width + "px; height:" + this.height +"px; border:1px solid #000;");
    cardbutton.className = 'item';
    cardbutton.textContent = this.string;
    document.body.appendChild(cardbutton);
}

var drawcards = function(cards) {
    for (var i = 0; i < cards.length; ++i) {
        cards[i].draw();
    }
}

//make card array; push onto card array
var cards = [];
cards.push(new card(30, 100, "Howard", 20, 50));
cards.push(new card(30, 100, "Jason", 20, 80));
drawcards(cards);

/*
 * NOTE: Cards need to be editable
 * Change string, then update this.string, and redraw.
 */