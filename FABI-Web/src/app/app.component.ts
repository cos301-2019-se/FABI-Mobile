import { Component } from '@angular/core';
import { Porting } from './porting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FABI-Web';

  constructor(){
  }

  // portCSV : Porting = new Porting();

  // public submitCSV(input){
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //       let text = reader.result;
  //       let jsonData = this.portCSV.convertToJSON(text); //converts file to JSON Object
  //       console.log(jsonData);
  //         // ** place api calls here ** //
  //     };
  //   reader.readAsText(input.files[0]);
  // }



}


