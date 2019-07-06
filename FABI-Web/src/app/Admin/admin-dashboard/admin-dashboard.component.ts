import { Component, OnInit, ViewChild, ElementRef, isDevMode, Inject, Output, EventEmitter, TemplateRef,
  ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef} from '@angular/core';
import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { DomSanitizer } from '@angular/platform-browser';
import { sharedStylesheetJitUrl } from '@angular/compiler';

import { Member, UserManagementAPIService } from '../../user-management-api.service';
import { DiagnosticClinicAPIService } from '../../diagnostic-clinic-api.service';
import { AdminDivComponent } from '../../Dynamic-Components/admin-div/admin-div.component'; 
import { StaffDivComponent } from '../../Dynamic-Components/staff-div/staff-div.component';

/**
 *
 *
 * @export
 * @class AdminDashboardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {

  //Retriving an HTML element from the HTML page
  @ViewChild('adminContainer', {read: ViewContainerRef}) adminContainer;
  @ViewChild('staffContainer', {read: ViewContainerRef}) staffContainer;
  
  //Global string variables to dynamically load the HTML statistic elements
  userStats: string;
  sampleStats: string;

  admins: Member[] = [];                         //array containing all FABI members that are admins
  staff: Member[] = [];                          //array containing all the members of FABI with the user type of 'staff'
  databaseAdmins: Member[] = [];                 //array containing all the members of FABI with the user type of 'databaseAdmins'
  cultureCurators: Member[] = [];                //array containing all the members of FABI with the user type of 'cultureCurators'
  diagnosticClinicAdmins: Member[] = [];         //array containing all the members of FABI with the user type of 'diagnosticClinicAdmins'
  samples: Object[] = [];                        //array containing all current samples for FABI
  completedSamples: Object[] = [];               //array containing all completed samples for FABI
  
  numberOfFABIMembers: number;                   //a variable holding the total number of FABI members
  numberOfSamples: number;                       //a variable holding the total number of samples

  constructor(public sanitizer: DomSanitizer, private userManagementService: UserManagementAPIService,
    private diagnosticClinicService: DiagnosticClinicAPIService, private resolver: ComponentFactoryResolver) { }

  /*
  *  This function will use an API service to get all the members of FABI. These members will be read into the
  *  'members' Object. The function does not receive any parameters but it will populate a 'heading' element on the
  *  HTML page with the number of members belonging to FABI. This function will also use API calls to populate
  *  the admins object.
  * 
  *  This function will also dynamically create elements and load them with information about the adminstrators
  *  and other FABI staff members. These dynamic elements will be loaded into the HTML page
  */
  getNumberOfFABIMembers(){
    //Subscribing to the UserManagementAPIService to get a list containing all the FABI members
    this.userManagementService.getAllFABIMembers().subscribe((response: any) => {
      if(response.success == true){
        //Populating the arrays with the returned data
        var tempAdmins = response.data.qs.admins;
        for(var i = 0; i < tempAdmins.length; i++){
          var tempMember: Member = {Name: tempAdmins[i].fname, Surname: tempAdmins[i].surname, Email: tempAdmins[i].email};
          this.admins.push(tempMember);
        }

        var tempStaff = response.data.qs.staff;
        for(var i = 0; i < tempStaff.length; i++){
          var tempMember: Member = {Name: tempStaff[i].fname, Surname: tempStaff[i].surname, Email: tempStaff[i].email};
          this.staff.push(tempMember);
        }

        var tempDatabaseAdmins = response.data.qs.databaseAdmins;
        for(var i = 0; i < tempDatabaseAdmins.length; i++){
          if(!tempDatabaseAdmins[i].fname){
            var tempMember: Member = {Name: '', Surname: '', Email: tempDatabaseAdmins[i].email};
          }
          else{
            var tempMember: Member = {Name: tempDatabaseAdmins[i].fname, Surname: tempDatabaseAdmins[i].surname, Email: tempDatabaseAdmins[i].email};
          }
          this.databaseAdmins.push(tempMember);
        }
        
        var tempCultureCurators = response.data.qs.cultureCurators;
        for(var i = 0; i < tempCultureCurators.length; i++){
          if(!tempCultureCurators[i].fname){
            var tempMember: Member = {Name: '', Surname: '', Email: tempCultureCurators[i].email};
          }
          else{
            var tempMember: Member = {Name: tempCultureCurators[i].fname, Surname: tempCultureCurators[i].surname, Email: tempCultureCurators[i].email};
          }
          this.databaseAdmins.push(tempMember);
        }

        var tempDiagnosticClinicAdmins = response.data.qs.diagnosticClinicAdmins;
        for(var i = 0; i < tempDiagnosticClinicAdmins.length; i++){
          if(!tempDiagnosticClinicAdmins[i].fname){
            var tempMember: Member = {Name: '', Surname: '', Email: tempDiagnosticClinicAdmins[i].email};
          }
          else{
            var tempMember: Member = {Name: tempDiagnosticClinicAdmins[i].fname, Surname: tempDiagnosticClinicAdmins[i].surname, Email: tempDiagnosticClinicAdmins[i].email};
          }
          this.databaseAdmins.push(tempMember);
        }

        this.numberOfFABIMembers = this.admins.length + this.staff.length + this.databaseAdmins.length + this.cultureCurators.length + this.diagnosticClinicAdmins.length;
        this.userStats = this.numberOfFABIMembers.toString();

        //Dynamically loads all the admins into the HTML page
        for(var i = 0; i < this.admins.length; i++){
          const adminDivRef = this.adminContainer.createComponent(this.resolver.resolveComponentFactory(AdminDivComponent));
          adminDivRef.instance.Name = this.admins[i].Name;
          adminDivRef.instance.Surname = this.admins[i].Surname;
          adminDivRef.instance.Email = this.admins[i].Email;
        }

        //Dynamically loads all the staff into the HTML page
        for(var i = 0; i < this.staff.length; i++){
          const staffDivRef = this.staffContainer.createComponent(this.resolver.resolveComponentFactory(StaffDivComponent));
          staffDivRef.instance.Name = this.staff[i].Name;
          staffDivRef.instance.Surname = this.staff[i].Surname;
          staffDivRef.instance.Email = this.staff[i].Email;
        }
      }
      else{
        //The FABI members could not be retrieved
      }
    });
  }

  /*
  *  This function will use an API service to get all the samples of FABI. These samples will be read into the
  *  'samples' Object. The function does not receive any parameters but it will populate a 'heading' element on the
  *  HTML page with the number of samples belonging to FABI.
  */
  getNumberOfFABISamples(){
    //Subscribing to the DiagnosticClinicAPIService to get a list containing all of FABI's samples
    this.diagnosticClinicService.getAllSamples().subscribe((response: any) => {
      if(response.success == true){
        //Populating the arrays with the returned data
        this.samples = response.data.samples;

        this.numberOfSamples = this.samples.length;
        this.sampleStats = this.numberOfSamples.toString();
      }
      else{
        //The FABI members could not be retrieved
      }
    });
  }

  /*
  *  This function will use an API service to get all the completed (processed) samples of FABI. These 
  *  samples will be read into the 'completedSamples' Object. The function does not receive any parameters but it will 
  *  populate a 'heading' element on the HTML page with the percentage of completed samples belonging to FABI.
  */
  getNumberOfCompletedFABISamples(){}

  /*
  *  This function will load the admin's notifications into the notification section on the HTML page
  */
  loadNotifications(){}

  ngOnInit() { 
    this.getNumberOfFABIMembers();
    this.getNumberOfFABISamples();
    this.loadNotifications();
  }
}
