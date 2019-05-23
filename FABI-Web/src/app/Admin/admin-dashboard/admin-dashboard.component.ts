import { Component, OnInit } from '@angular/core';
//import { SidenavComponent } from '../../sidenav/sidenav.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {
  //sidenav : boolean;
  constructor() { }

  //public SidenavComponent:SidenavComponent
  
  /*sideNavBtnToggle(){
    if(this.sidenav == false)
    {
      this.sidenav = true;
    }
    else{
      this.sidenav = false;
    } 
  }*/

  ngOnInit() { }

}
