/* startCard component */
const { VRComponent, ViewR } = require("../../../core/viewr");
const data = require("../intro.data.json");
//const axios = require("axios");

class TextListCard extends VRComponent {
    queryOptions = {
        /* url for data request via http request (axios) */
        url: "http://localhost:4000/intro",
    }
    /*   
    //you can define a data wrapper object and pass it to base class methods.
    //default is 
    dataReceiver={data:undefined};
    /*
  
    //property that stores ViewR string from component File
     viewr="";
     //property that stores in-construction HTML string
    constructedView="";
     */
    constructor() {
        /* super constructor needs script path for ViewR to access component files */
        super(TextListCard.queryOptions, __dirname);
        this.data = data;
        //console.log(this.data,data);
    }

    async queryData() {
        this.constructedView = await this.constructWith(data);
    }
    constructWith = (data) => {
        let constructStr = this.viewr;
        constructStr = this.transformation(constructStr, data);
        console.log(data, `${this.path}/${this.dirname}`);
        console.log(data.title);
        let cards = [];
        for (const el of data) {
            cards.push(ViewR.renderSync(`${this.path}/${this.dirname}`, el));
        };
        // const replacementResult = ViewR.renderSync(`${this.path}/${this.dirname}`, { data:data[0] });

        return cards.join();
    }
    /*   You can override methods and pnoperties :
      async queryData(dataReceiver) {
        // Performs HTTP.get query via axios in order to fetch data, 
        // and launch constructWith() in order to inject data into viewR string
      };
    
    
      constructWith=(data)=> { 
    
       // transform viewR string into a HTML string with data incorporated if any.
       // returns an HTML string. 
       };
    
      transformation=(viewRstring,data=undefined)=>{ 
    //    is executed inside this.constructWith();
      //  performs custom operations before constructWith() returns its string.
      //  returns an HTML string. 
      };
      async render(){
        // Async method called inside ViewR.render();
        // Calls this.queryData()
        // and returns final value of this.constructedView
      }
    */
}

module.exports = TextListCard;