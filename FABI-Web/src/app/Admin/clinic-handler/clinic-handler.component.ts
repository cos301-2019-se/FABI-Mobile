import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clinic-handler',
  templateUrl: './clinic-handler.component.html',
  styleUrls: ['./clinic-handler.component.scss']
})
export class ClinicHandlerComponent implements OnInit {

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

}
