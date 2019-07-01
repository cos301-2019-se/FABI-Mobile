/**
 * File Name: porting.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services\porting.service.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Tuesday, June 25th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


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

        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(";");
            for (var j = 0; j < currentline.length; j++) {
                //if(currentline!="" && currentline!="null"){
                    obj[headers[j]] = currentline[j];
                //}
            }

            result.push(obj);
        }

        //console.log("in porting");
        //console.log(JSON.stringify(result));
        console.log(result);
        this.JSONfile = result;
        
        return result;
    }

}