import { Component, OnInit } from '@angular/core';

//Import the porting service for DB creation
import { Porting } from '../../porting.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-database-handler',
  templateUrl: './database-handler.component.html',
  styleUrls: ['./database-handler.component.scss']
})
export class DatabaseHandlerComponent implements OnInit {

  /**
   *  GLOBALS
   */

  portCSV: Porting = new Porting();

  constructor() { }

  sidenavToggle(){
    if(document.getElementById("sidenav_div").style.width == "22%")
    {
      document.getElementById("sidenav_div").style.width = "0";
    }
    else{
      document.getElementById("sidenav_div").style.width = "22%";
    } 
  }

  closeNav(){
    document.getElementById("sidenav_div").style.width = "0";
  }

  ngOnInit() {
  }

  public submitCSV(input) {
    const reader = new FileReader();
    reader.onload = () => {
      let text = reader.result;
      let jsonData = this.portCSV.convertToJSON(text); //converts file to JSON Object
      console.log(jsonData);
      // ** place api calls here ** //
    };
    reader.readAsText(input.files[0]);
  }

}
