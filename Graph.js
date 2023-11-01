const ETHERSCAN_API = "KWX82VSSWWB9IYSS4QPSBKACMU5MQHVJFR";
const provider = new ethers.providers.WebSocketProvider("wss://eth-mainnet.g.alchemy.com/v2/0o__XlLs-0iVYrPeLCk1cbD9D4_5oNZu");

class Graph {

    constructor() {

        this.address;
        this.entryNumber = 1000;
        this.transactionsLoaded = false;
        this.transactions = []
        this.infoWindowBuffer = [];
        this.etherscanAddressURLBase = "https://etherscan.io/address/";
        this.etherscanHashURLBase = "https://etherscan.io/tx/";

    }


    requestAccountHistory(_address) {
        fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${_address}&startblock=0&endblock=99999999&page=1&offset=${this.entryNumber}&sort=asc&apikey=${ETHERSCAN_API}`)
            .then((response)=>{
                response.json()
                    .then((data)=> {
                        // console.log(data);
                        this.sortTransactions(data.result);
                        // console.log(this.transactions);
                    })
            })
    }

    sortTransactions(_array) {

        let theta = 0.1;
        let r = 50;

        for(let i = 0; i < _array.length; i++) {
          
            const transcation = {
                from: _array[i].from,
                to: _array[i].to,
                functionName: _array[i].functionName,
                contractAddress: _array[i].contractAddress,
                value: ethers.utils.formatEther(_array[i].value),
                timeStamp: _array[i].timeStamp,
                transactionIndex: _array[i].transactionIndex,
                hash: _array[i].hash,
                date: new Date(parseInt(_array[i].timeStamp.trim()*1000))
            }

            const position = createVector(r*cos(theta),r*sin(theta));
            const spiralPos = position.add(globalTranslation);
            const timeMapping = map(_array[i].timeStamp, _array[_array.length-1].timeStamp, _array[0].timeStamp,0,width);

            r += width/_array.length/2;
            theta += width/_array.length + timeMapping;
            // theta += timeMapping;

            this.transactions.push(new Node(transcation,spiralPos));
        }

        this.transactionsLoaded = true;

    }

    render() {

        push();
            this.renderOrigin();
            this.renderNodes();
            this.renderInfoWindows();
        pop();

    }

    renderOrigin() {

        const short = this.createShortHand(this.address)
        push(); 
            stroke(255);
            fill(0,255,255,200);
            text(short, globalTranslation.x -short.length*2.8, globalTranslation.y -short.length);
           
            circle(globalTranslation.x,globalTranslation.y,20);
        pop();

    }

    renderNodes() {

        for(let i = 0; i < this.transactions.length; i++) {
            const n = this.transactions[i];
            push();
                n.render(this.address);
                fill(255);
                text(i,n.position.x,n.position.y - 10)
            pop();
        }
        
    }

    renderInfoWindows() {

        for(let i = 0; i < this.infoWindowBuffer.length; i++) {
            const windows = this.infoWindowBuffer[i];

            windows.render();
        }

    }

    createShortHand(_address) {
        const short = `${_address.slice(0,4)}...${_address.slice(_address.length-4,_address.length)}`
        return short
    }

    selectNode(_offSet) {
        const mouseLoc = createVector(mouseX+_offSet.x,mouseY+_offSet.y);
    
        for(let i = 0; i < this.transactions.length; i++) {
            const nodes = this.transactions[i];

            const distance = dist(mouseLoc.x,mouseLoc.y, nodes.position.x + _offSet.x,nodes.position.y + _offSet.y);
            const sizeMapping = map(nodes.transaction.value,0,300,5,300);
        
            if(distance < sizeMapping) {

               if(this.checkDuplicateInfoWindow(nodes, this.infoWindowBuffer) && this.infoWindowBuffer.length > 0) {
                    console.log("This is a duplicate, cannot add it to the array");
                    for(let j = 0; j < this.infoWindowBuffer.length; j++) {
                        
                        this.infoWindowBuffer[j].toggleVisibility();
                        return;

                    }
            
               } else if(this.checkDuplicateInfoWindow(nodes, this.infoWindowBuffer) != true) {
                //Remove the element in the array before adding a new one,
                //this way there is only one transaction window up at once
                this.infoWindowBuffer.splice(0,1);

                const info = new InfoWindow(nodes.transaction,nodes.position);
                this.infoWindowBuffer.push(info);

               }
                
            }
     
        }

    }

    checkDuplicateInfoWindow(instance, array) {
        for(let i = 0; i < array.length; i++) {
            if(array[i].data == instance.transaction) {
                return true;
            }
        }
    }

    selectPanel() {
        if(this.transactionsLoaded === true) {
            const activeInfoWindow = this.infoWindowBuffer[0];

            const panels = activeInfoWindow.panels;
            // console.log(activeInfoWindow);
            // console.log(panels);

                for(let i = 0; i < panels.length; i++) {
                    const p = panels[i];
                    
                    if(p.isMouseOver() === true) {
                        p.isClicked(this.etherscanAddressURLBase, this.etherscanHashURLBase);
                        console.log(`Mouse was over ${p.value}`);
                    }
                     
                }
        }
    }
}