import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { Member, UserManagementAPIService } from '../../user-management-api.service';
import { AdminDivComponent } from '../../Dynamic-Components/admin-div/admin-div.component';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent implements OnInit {

  //Retriving an HTML element from the HTML page
  @ViewChild('adminContainer', {read: ViewContainerRef}) adminContainer;

  admins: Member[] = [];         //array containing all FABI members that are admins

  constructor(private userManagementService: UserManagementAPIService, private resolver: ComponentFactoryResolver) { }

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

  /*
  *  This function will load admin users into the section provided on the HTML page. 
  *  This function will also dynamically load elements containing information about the administrators
  *  to the HTML page dynamically
  */
  loadAdmins(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIAdmins().subscribe((response: any) => {
      if(response.success == true){
        //Populating the arrays with the returned data
        var tempAdmins = response.data.qs.admins;
        for(var i = 0; i < tempAdmins.length; i++){
          var tempMember: Member = {Name: tempAdmins[i].fname, Surname: tempAdmins[i].surname, Email: tempAdmins[i].email};
          this.admins.push(tempMember);
        }

        //Dynamically loads all the admins into the HTML page
        for(var i = 0; i < this.admins.length; i++){
          const adminDivRef = this.adminContainer.createComponent(this.resolver.resolveComponentFactory(AdminDivComponent));
          adminDivRef.instance.Name = this.admins[i].Name;
          adminDivRef.instance.Surname = this.admins[i].Surname;
          adminDivRef.instance.Email = this.admins[i].Email;
        }
      }
      else{
        //The FABI administrators could not be retrieved
      }
    });
  }

  /*
  *  This function will load the staff member's notifications into the notification section on the HTML page
  */
  loadNotifications(){}

  /*
  *  This function will remove a notification for the notification section when the user clicks on the 'exit'
  *  button/icon associated with that notification
  */
 removeNotification(){}

  ngOnInit() {
    this.loadAdmins();
    this.loadNotifications();
  }

}
