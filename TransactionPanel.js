class TransactionPanel { 

    constructor(_key,_value, _position,_w,_h,_c) {
        this.w = _w;
        this.h = _h;
        this.key = _key;
        this.value = _value;

        this.position = _position
        this.windowColour = _c;
        this.strokeColour = color(255);
       
    }

    render() {

        push();
            this.renderPanelBoarder();
            this.renderText();
        pop();
       
    }

    renderPanelBoarder() {

        push();
            if(this.isMouseOver() == true) {
                this.strokeColour = color(0,255,255);
            } else {
                this.strokeColour = color(255);
            }
            stroke(this.strokeColour);
            fill(this.windowColour);
            rect(this.position.x,this.position.y , this.w, this.h);
        pop();
    }

    renderText() {

        push();
            fill(255);
            text(`${this.key}: ${this.value}`, this.position.x + 5, this.position.y+15);

        pop();

    }
    
    isMouseOver() {

        if(mouseX > this.position.x && mouseX < this.position.x + this.w
            && mouseY > this.position.y && mouseY < this.position.y + this.h){
            return true;
        }
    }

    isClicked(_addressURLBase,_hashURLBase) {

        console.log(this.values);
      
       if(this.key === "to") {
            window.open(`${_addressURLBase}${this.value}`,"_blank");
       } else if(this.key === "from") {
            window.open(`${_addressURLBase}${this.value}`,"_blank");
       } else if(this.key === "hash") {
            window.open(`${_hashURLBase}${this.value}`,"_blank");
       } else {
            return;
       }

    }
  
}