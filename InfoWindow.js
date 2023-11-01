class InfoWindow {


    constructor(_data, _position) {

        this.data = _data;
        this.windowOffset = 20;
        this.position = createVector(_position.x + this.windowOffset ,_position.y - this.windowOffset);
        this.displayed = true;
        this.panelsLoaded = false;
        this.windowColour = color(20,200);
      
        this.panels = [];
        this.yPanelOffset = 20;
        this.longesKeyString;
        this.longestValueString;
      
        this.calculateLengthToLongestString();
        this.windowW = this.findInfoWindowWidth();
        this.windowH = JSON.stringify(this.data,null,2).length/1.7;

        this.initPannels();
    }

    render() {

        if(this.displayed == true) {
            this.renderWindow();
            this.renderPanels();            
        }
    }

    renderPanels() {
        for(let i = 0;  i < this.panels.length; i++) {
            const p = this.panels[i];
            push();
                p.render();
            pop();
        } 
    }

    initPannels() {
        const keys = Object.keys(this.data);
        console.log(keys);
        const values = Object.values(this.data);
        let yAccumulation = this.position.y;
        for(let i = 0; i < keys.length; i++) {
            const pannelPosition = createVector(this.position.x,yAccumulation);
            const panel = new TransactionPanel(keys[i],values[i],pannelPosition,this.windowW,this.yPanelOffset,this.windowColour);
            this.panels.push(panel);
            yAccumulation += this.yPanelOffset;
        }
        this.panelsLoaded = true;
    }

    calculateLengthToLongestString() {

        const keys = Object.keys(this.data);
        const values = Object.values(this.data);
        let highestKeysLength = 0;
        let highestValuesLength = 0;
    
        for(let i = 0; i < keys.length; i++) {

            if(keys[i].length > highestKeysLength) {
                highestKeysLength = keys[i].length;
                this.longesKeyString = keys[i];
                 
            }

            if(values[i].length > highestValuesLength) {
                highestValuesLength = values[i].length;
                this.longestValueString = values[i];
             
            }
        }
    }

    renderWindow() {       
        push();
            stroke(255)
                fill(this.windowColour);
                // console.log(this.windowW);
                rect(this.position.x, this.position.y, this.windowW, this.windowH -  this.windowOffset);
            pop();
    }

    toggleVisibility() {
        if(this.displayed == false) {
            this.displayed = true;
        } else if(this.displayed = true) {
            this.displayed = false;
        }
    }

    findInfoWindowWidth() {
        
        const keyW = textWidth(this.longesKeyString);
        const valueW = textWidth(this.longestValueString);
        const additionalW = 0;

        return keyW + valueW + additionalW;

    }

   

}