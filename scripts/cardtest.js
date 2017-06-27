/* CARD MODULE */
var card = function(fontsize, width, string, xpos, ypos) {
    this.fontsize = fontsize;
    this.height = fontsize/1.5;
    this.width = string.length * 9;
    this.string = string;
    this.xpos = xpos;
    this.ypos = ypos;
}

card.prototype.draw = function() {
    var cardbutton = document.createElement("div");
    cardbutton.setAttribute("style","position:absolute;top:"+this.ypos+"px;left:"+this.xpos+"px;padding-right:7px;padding-top:5px;padding-left:8px;border-radius: 5px;width:" + this.width + "px; height:" + this.height +"px; border:1px solid #000;");
    cardbutton.textContent = this.string;
    document.body.appendChild(cardbutton);
}
//make card array; push onto card array
var cards = [];
cards.push(new card(30, 100, "Howard", 20, 50));
cards[0].draw();