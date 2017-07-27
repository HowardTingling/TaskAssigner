/* CARD MODULE */
var cardscontainer = function(xpos, ypos) {
		this.xpos = xpos;
    this.ypos = ypos;
    this.containerheight = 20;
    this.containerwidth = 40;
    this.cardlist = document.createElement("div");
    this.cardlist.style.position = "relative";
    this.cardlist.style.border = "1px solid #000";
    this.cardlist.style.width = this.containerwidth + "px";
    this.cardlist.style.height = this.containerheight + "px";
    this.cardlist.style.padding = 7 + "px";
    this.cardlist.style.top = this.ypos + "px";
    this.cardlist.style.left = this.xpos + "px";
    this.cardlist.style.borderRadius = 5 + "px";
}

cardscontainer.prototype.pushcard = function(card) {
    var cardbutton = document.createElement("div");
    //cardbutton.setAttribute("style","position:absolute;padding-right:7px;padding-top:5px;padding-left:7px;border-radius: 5px;width:" + card.width + "px; height:" + card.height +"px; border:1px solid #000;");
    cardbutton.setAttribute("style","position:static;padding-right:7px;padding-top:5px;padding-left:7px;border-radius: 5px;width:" + card.width + "px; height:" + card.height +"px;margin-bottom:5px;border:1px solid #000;");
    cardbutton.textContent = card.string;
    if (this.containerwidth < card.width) {
        this.containerwidth = card.width;
        this.cardlist.style.width = this.containerwidth + 16 + "px";
    }
    if (this.containerheight < card.height) {
    		this.containerheight = card.height + 12;
    } else {
      	this.containerheight += card.height + 12;
      	this.cardlist.style.height = this.containerheight + "px";
    }
    this.cardlist.appendChild(cardbutton);
}

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
var drawcards = function(cards) {
    for (var i = 0; i < cards.length; ++i) {
        cards[i].draw();
    }
}

//make card array; push onto card array
var cardsdiv = new cardscontainer(40,20);
cardsdiv.pushcard(new card(30, 100, "Howard"));
cardsdiv.pushcard(new card(30, 100, "Jason"));
document.body.appendChild(cardsdiv.cardlist);
var cards = [];
cards.push(new card(30, 100, "Howard", 20, 50));
cards.push(new card(30, 100, "Jason", 20, 80));
//drawcards(cards);

/*
 * NOTE: Cards need to be editable
 * Change string, then update this.string, and redraw.
 */