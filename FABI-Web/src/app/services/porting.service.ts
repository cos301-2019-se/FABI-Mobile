// https://embed.plnkr.co/DE80sO/
export class Porting{

    constructor(){}

                                            // ** HOW TO USE ** //

                // in the .html file
    //<input type='file' (change)=submitCSV(input) id='fileInput' #input>

                // in the .ts file
    // portCSV : Porting = new Porting();
    //
    // public submitCSV(input){
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         let text = reader.result;
    //         let jsonData = this.portCSV.convertToJSON(text); //converts file to JSON Object
    //         console.log(jsonData);
    //         // ** place api calls here ** //
    //     };
    //     reader.readAsText(input.files[0]);
    // }

    JSONfile : any = null;

    convertToJSON(text){ //converts file to JSON

        var lines = text.split("\n");
        var result = [];
        var headers = lines[0].split(";");
        // console.log(headers);

        for (var i = 1; i < lines.length-1; i++) {
            var obj = {};
            var currentline = lines[i].split(";");
            for (var j = 0; j < currentline.length; j++) {
                if(currentline!="" && currentline!="null"){
                    obj[headers[j]] = currentline[j];
                }
            }

            result.push(obj);
        }

        //console.log("in porting");
        //console.log(JSON.stringify(result));
        //console.log(result);
        this.JSONfile = result;
        
        return result;
    }

}