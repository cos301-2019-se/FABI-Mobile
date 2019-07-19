import { Component, Injectable } from '@angular/core';

/**
 * File Name: porting.service.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\services\porting.service.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Monday, July 8th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */

@Injectable({
    providedIn: 'root'
})

export class Porting{

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                             CONSTRUCTOR
  /**
   * Creates an instance of Porting.
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor(){}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   /** Holds the CSV file as a JSONfile - @type {any} */
    JSONfile : any = null;       

 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                CONVERT_TO_JSON
  /**
   *  This function is used to convert the text sent from the file into JSON
   *  @param {string} text 
   *  @memberof Porting
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    convertToJSON(text){
        if(text == ""){
            return null;
        }
        var lines = text.split("\n");
        var result = [];
        var headers = lines[0].split(";");

        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(";");
            for (var j = 0; j < currentline.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }

        this.JSONfile = result;
        
        return result;
    }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                EXTRACT_DATABASE
  /**
   *  This function is used to perform reverse porting
   *  @param {string} dbName
   *  @memberof Porting
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    extractDatabase(dbJSON , dbName:String){
        var CSVdata = "";
        if(dbJSON == null){
            return CSVdata;
        }
        var headings = [];

        var columnsIn = dbJSON[0];
        for(var key in columnsIn){
          CSVdata += key+";";
          headings.push(key);
        }

        CSVdata += "\r\n";
        
        for(var i =0; i<dbJSON.length; i++){
            var columnsIn = dbJSON[i];
            for(var key in headings){
               // console.log(key);
                if(dbJSON[i][ headings[key] ] != null){
                    CSVdata += dbJSON[i][ headings[key] ] +";";
                }
                else{
                    CSVdata += "  ;";
                }     
            }

            CSVdata += "\r\n";
        }

        //console.log(CSVdata);
        return CSVdata;
        
    }
}