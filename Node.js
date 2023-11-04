class Node {
    
    constructor(_transaction, _position) {
        
        this.transaction = _transaction; 
        this.position = _position;
        this.size = map(this.transaction.value,0,300,5,300); 

    }

    render(_originAddress) {

        let c;
        
        if(this.transaction.to.toLowerCase() == _originAddress.toLowerCase()) {
            c = color(0,255,0,100);
        } else if(this.transaction.from.toLowerCase() == _originAddress.toLowerCase()) {
            c = color(255,0,0,100);
        }

        push();
            fill(c);
            stroke(255,100);
            circle(this.position.x,this.position.y, this.size);
                push();
                    stroke(c,30);
                    line(globalTranslation.x,globalTranslation.y,this.position.x,this.position.y);
                pop();
        pop();
    }
}