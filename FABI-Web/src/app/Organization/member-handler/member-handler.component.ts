/**
 * File Name: member-handler.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\Organization\member-handler\member-handler.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, June 23rd 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Thursday, October 10th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as http from '@angular/common/http';
import * as core from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Include Material Components
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserManagementAPIService } from 'src/app/_services/user-management-api.service';
import * as Interface from "../../_interfaces/interfaces";
import { LoadingComponent } from "../../_loading/loading.component";
import { AuthenticationService } from '../../_services/authentication.service';


@core.Component({
  selector: 'app-member-handler',
  templateUrl: './member-handler.component.html',
  styleUrls: ['./member-handler.component.scss'],
  encapsulation: core.ViewEncapsulation.None
})
export class MemberHandlerComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /** Object for defining the Add Member form -  @type {FormGroup} */
  addMemberForm: FormGroup;
  /** To check if form has been submitted - @type {boolean} */
  submitted: boolean = false;
  /** To check if form has been submitted correctly - @type {boolean} */
  valid: boolean = false;
  /** If page is busy loading something - @type {boolean} */
  loading: boolean = false;
  /** Selected Member from the table - @type {Interface.OrganisationMember} */
  selectedMember: Interface.OrganisationMember = { fname: '', surname: '', email: '' };
  /** Array of Organization objects - @type {Organisation[]} */
  organizations: Interface.Organisation[];
  /** Array of Member objects - @type {OrganisationMember[]} */
  orgMembers: Interface.OrganisationMember[];
  /** Object array for holding all of the logs -  @type {any[]} */
  allNotifications: any[] = [];
  /** Object array for holding all of the logs that have not been read -  @type {any[]} */
  newNotifications: any[] = [];

  @core.ViewChild(MatPaginator) paginator: MatPaginator;

  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */
  notificationsTab: boolean = false;
  /** Indicates if the profile tab is hidden/shown - @type {boolean} */
  profileTab: boolean = false;
  /** Indicates if the save button is hidden/shown on the profile tab- @type {boolean} */
  saveBtn: boolean = false;
  /** Indicates if the confirm password tab is hidden/shown on the profile tab - @type {boolean} */
  confirmPasswordInput: boolean = false;
  /** Indicates if the help tab is hidden/shown - @type {boolean} */
  helpTab: boolean = false;
  /** The staff member's email address -  @type {string} */
  email: string = '';
  /** The staff member's organization -  @type {string} */
  organization: string = '';
  /** The staff member's id -  @type {string} */
  id: string = '';
  /** The staff member's name -  @type {string} */
  name: string = '';
  /** The staff member's surname -  @type {string} */
  surname: string = '';
  /** The staff member's user type -  @type {string} */
  userType: string = '';
  /** The staff member's password -  @type {string} */
  password: string = '';
  /** The staff member's confirmed password -  @type {string} */
  confirmPassword: string = '';
  /** The form to display the admin member's details -  @type {FormGroup} */
  adminProfileForm: FormGroup;
  deleteData: Interface.Confirm = { title: '', message: '', info: '', cancel: '', confirm: '' };
  /** Indicates if the notifications tab is hidden/shown - @type {boolean} */
  private toggle_status: boolean = false;
  /** The user that is currently logged in -  @type {any} */
  currentUser: any;
  /** Specifies if the list of members have been retreived to disable the loading spinner - @type {boolean} */
  memberTableLoading: boolean = true;
  /** The search item the user is looking for in the table -  @type {string} */
  public searchMember: string = "";
  /** The column headings to be displayed in the member table -  @type {string[]} */
  displayedColumns: string[] = ['First Name', 'Surname', 'Email', 'Remove', 'Action'];
  dataSource = new MatTableDataSource([]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          FORM VALIDATORS
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  add_member_validators = {
    'member_email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Invalid email' }
    ],
    'member_name': [
      { type: 'required', message: 'Name is required' }
    ],
    'member_surname': [
      { type: 'required', message: 'Surname is required' }
    ],
    'member_phone': [
      { type: 'required', message: 'Phone No. is required' },
      { type: 'pattern', message: 'Please enter a valid number' }
    ]
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of MemberHandlerComponent.
   * @param {FormBuilder} formBuilder For creating the login form
   * @param {MatSnackBar} snackBar For snack-bar pop-up messages
   * @param {MatDialog} dialog For dialog pop-up messages
   * @param {Router} router for routing/navigating to other components
   * @param {MatDialog} dialog
   * @param {AuthenticationService} authService for calling the *authentication* service
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService,
    private userManagementService: UserManagementAPIService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.addMemberForm = this.formBuilder.group({
      member_name: ['', Validators.required],
      member_surname: ['', Validators.required],
      member_email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      member_phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^(([\+]{1}[0-9]{1,3}[\ ]{1}[0-9]{1,2}[\ ]{1}[0-9]{4}[\ ]{1}[0-9]{4})|([0]{1}[0-9]{1}[\ ]{1}[0-9]{4}[\ ]{1}[0-9]{4})|([0]{1}[0-9]{1}[\-]{1}[0-9]{4}[\-]{1}[0-9]{4})|([\(]{1}[0]{1}[0-9]{1}[\)]{1}[\ ]{1}[0-9]{4}([\ ]|[\-]){1}[0-9]{4})|([0-9]{4}([\ ]|[\-])?[0-9]{4})|([0]{1}[0-9]{3}[\ ]{1}[0-9]{3}[\ ]{1}[0-9]{3})|([0]{1}[0-9]{9})|([\(]{1}[0-9]{3}[\)]{1}[\ ]{1}[0-9]{3}[\-]{1}[0-9]{4})|([0-9]{3}([\/]|[\-]){1}[0-9]{3}[\-]{1}[0-9]{4})|([1]{1}[\-]?[0-9]{3}([\/]|[\-]){1}[0-9]{3}[\-]{1}[0-9]{4})|([1]{1}[0-9]{9}[0-9]?)|([0-9]{3}[\.]{1}[0-9]{3}[\.]{1}[0-9]{4})|([\(]{1}[0-9]{3}[\)]{1}[0-9]{3}([\.]|[\-]){1}[0-9]{4}(([\ ]?(x|ext|extension)?)([\ ]?[0-9]{3,4}))?)|([1]{1}[\(]{1}[0-9]{3}[\)]{1}[0-9]{3}([\-]){1}[0-9]{4})|([\+]{1}[1]{1}[\ ]{1}[0-9]{3}[\.]{1}[0-9]{3}[\-]{1}[0-9]{4})|([\+]{1}[1]{1}[\ ]?[\(]{1}[0-9]{3}[\)]{1}[0-9]{3}[\-]{1}[0-9]{4}))$')
      ])]

    });

    this.adminProfileForm = this.formBuilder.group({
      organization_name: '',
      admin_name: '',
      admin_surname: '',
      admin_email: '',
      admin_type: '',
      admin_password: '',
      admin_confirm: ''
    });
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            NG ON INIT()
  /**
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    // Set current user logged in
    this.currentUser = this.authService.getCurrentSessionValue.user;
    // Calling the neccessary functions as the page loads
    this.viewMembers();
    this.resetMemberFields();

  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                    TOGGLE NOTIFICATIONS TAB
  /**
   *  This function is used to toggle the notifications tab.
   *  
   *  If set to true, a class is added which ensures that the notifications tab is displayed. 
   *  If set to flase, a class is removed which hides the notifications tab.
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificaitonsTab() {
    this.toggle_status = !this.toggle_status;
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          ADD MEMBER
  /**
   * This function calls the *http* service to add a new Organization Member
   *
   * @returns
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  addMember() {
    this.submitted = true;

    if (this.addMemberForm.invalid) {
      return;
    }

    this.valid = true;
    this.loading = true;

    const LmemberName = this.addMemberForm.controls.member_name.value;
    const LmemberSurname = this.addMemberForm.controls.member_surname.value;
    const LmemberEmail = this.addMemberForm.controls.member_email.value;
    const LmemberPhone = this.addMemberForm.controls.member_phone.value;

    const org_details: Interface.Organisation = { orgName: this.currentUser.organisation };
    const member_details: Interface.OrganisationMember = { fname: LmemberName, surname: LmemberSurname, email: LmemberEmail };

    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Adding Member" } });

    this.userManagementService.addOrgMember(org_details, member_details).subscribe((response: any) => {

      loadingRef.close();
      this.resetMemberFields();

      this.loading = false;

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        this.notificationService.showSuccessNotification('Member Added', '');
        this.refreshDataSource();
      } else {
        //POPUP MESSAGE
        this.notificationService.showErrorNotification('Add Member Failed', 'An error occurred while adding the member');
      }
    }, (err: http.HttpErrorResponse) => {
      loadingRef.close();
      if(err.error.code == 400 && err.error.message == "User email already exists") {
        this.notificationService.showErrorNotification('Add Member Failed', 'User email already exists');
      } else {
        this.notificationService.showErrorNotification('Add Member Failed', 'An error occurred while adding the member');
      }
      this.resetMemberFields();
      //Handled in error-handler
      
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SELECT ORGANIZATION
  /**
   * This function sets the Member selected by the user in the table
   *
   * @param {Interface.OrganisationMember} member
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  selectMember(member: Interface.OrganisationMember) {
    this.selectedMember = member;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                     REMOVE MEMBER PROMPT
  /**
   * This function prompts the user to confirm if they wish to remove the selected Member
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeMemberPrompt(member: Interface.OrganisationMember) {
    const memberDetails = member.fname + " " + member.surname + " " + member.email;

    this.selectedMember = member;

    this.deleteData = {
      title: "Remove Member",
      message: "Are you sure you want to remove this Member?",
      info: memberDetails,
      cancel: "Cancel",
      confirm: "Remove"
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            LOGOUT 
  /**
   * This function will log the user out of the web application and clear the authentication data stored in the local storage
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           REMOVE MEMBER   
  /**
   * This function calls the *http* service to remove the selected Organisation 
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  removeMember() {
    let loadingRef = this.dialog.open(LoadingComponent, { data: { title: "Removing Member" } });

    this.userManagementService.removeOrganizationMember(this.selectedMember).subscribe((response: any) => {

      loadingRef.close();

      if (response.success == true && response.code == 200) {
        //POPUP MESSAGE
        this.notificationService.showSuccessNotification('Member Removed', '');
        this.refreshDataSource();
      } else {
        //POPUP MESSAGE
        this.notificationService.showErrorNotification('Remove Failed', 'An error occurred while removing the member');
      }
    }, (err: http.HttpErrorResponse) => {
      //Handled in error-handler
      this.notificationService.showErrorNotification('Remove Failed', 'An error occurred while removing the member');
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            REFRESH
  /**
   * This function refreshes the Datasource (in most cases, the table that has changed)
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  refreshDataSource() {
    this.viewMembers();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            VIEW MEMBERS
  /**
   * This function calls the *http* service to get all registered Organization Members
   *
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  viewMembers() {

    this.userManagementService.getAllOrganizationMembers().subscribe((response: any) => {


      if (response.success == true && response.code == 200) {
        this.orgMembers = response.data.members;
        this.dataSource = new MatTableDataSource(this.orgMembers);
        this.dataSource.paginator = this.paginator;

        //Deactivate loading table spinners
        this.memberTableLoading = false;

      } else {
        //POPUP MESSAGE
        this.notificationService.showWarningNotification('Error', 'Could not load members');
      }
    }, (err: http.HttpErrorResponse) => {
      //Handled in error-handler
      this.notificationService.showWarningNotification('Error', 'Could not load members');
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE NOTIFICATIONS 
  /**
   * This function will toggle the display of the notifications side panel
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleNotificationsTab() {
    this.notificationsTab = !this.notificationsTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         TOGGLE PROFILE 
  /**
   * This function will toggle the display of the profile side panel
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleProfileTab() {
    this.profileTab = !this.profileTab;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                  LOAD ADMIN PROFILE DETAILS
  /**
   *  This function will use an API service to load all the admin member's details into the elements on the HTML page.
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  loadAdminProfileDetails() {
    //The id number of the user that is currently logged in
    this.id = this.currentUser.ID;
    //The organization of the user that is currently logged in
    this.organization = this.currentUser.organisation;

    //Subscribing to the UserManagementAPIService to get all the staff members details
    this.userManagementService.getUserDetails(this.organization, this.id).subscribe((response: any) => {
      if (response.success == true) {
        //Temporarily holds the data returned from the API call
        const data = response.data;

        //Setting the user type of the user
        this.userType = data.userType;
        //Setting the first name of the user
        this.name = data.fname;
        //Setting the surname of the user
        this.surname = data.surname;
        //Setting the email of the user
        this.email = data.email;
      }
      else {
        //Error handling
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        SAVE CHANGES
  /**
   *  This function will send the details to the API to save the changed details to the system.
   *  @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveChanges() {
    //Indicates if the details can be changed based on whether the passwords match or not
    var valid = true;

    //Checking to make sure that the passwords are not empty
    //Checking to make sure that the password and confirmed password match
    if (this.adminProfileForm.controls.admin_password.value != '' &&
      this.adminProfileForm.controls.admin_password.value == this.adminProfileForm.controls.admin_confirm.value) {
      this.password = this.adminProfileForm.controls.admin_password.value;
    }
    else {
      //Indicates that the changes cannot be saved
      valid = false;

      //POPUP MESSAGE
      let snackBarRef = this.snackBar.open("Please make sure that the passwords are the same", "Dismiss", {
        duration: 3000
      });
    }

    //Indicates that the changes that the user has made to their profile details, can be changed
    if (valid == true) {
      if (this.adminProfileForm.controls.admin_email.value == '') {
        this.email = this.email;
      }
      else {
        this.email = this.adminProfileForm.controls.admin_email.value;
      }

      if (this.adminProfileForm.controls.admin_name.value == '') {
        this.name = this.name;
      }
      else {
        this.name = this.adminProfileForm.controls.admin_name.value;
      }

      if (this.adminProfileForm.controls.admin_surname.value == '') {
        this.surname == this.surname;
      }
      else {
        this.surname = this.adminProfileForm.controls.admin_surname.value;
      }

      if (this.adminProfileForm.controls.admin_password.value == '') {
        this.password == this.password;
      }
      else {
        this.password = this.adminProfileForm.controls.admin_password.value;
      }

      //Making a call to the User Management API Service to save the user's changed profile details
      this.userManagementService.updateFABIMemberDetails(this.email, this.name, this.surname).subscribe((response: any) => {
        if (response.success == true) {
          //Reloading the updated user's details
          this.loadAdminProfileDetails();

          //Display message to say that details were successfully saved
          let snackBarRef = this.snackBar.open("Successfully saved profile changes", "Dismiss", {
            duration: 3000
          });
        }
        else {
          //Error handling
          let snackBarRef = this.snackBar.open("Could not save profile changes", "Dismiss", {
            duration: 3000
          });
        }
      });
    }
    else {
      //Error handling
      let snackBarRef = this.snackBar.open("Please make sure that you provide all the information", "Dismiss", {
        duration: 3000
      });
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        DISPLAY PROFILE SAVE BUTTON 
  /**
   * This function will display the save button option if any details in the profile have been altered
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayProfileSaveBtn() {
    this.saveBtn = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                       DISPLAY PASSWORD CONFIRM INPUT 
  /**
   * This function will display the confirm password input field in the user's password was altered
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  displayConfirmPasswordInput() {
    this.confirmPasswordInput = true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            TOGGLE HELP 
  /**
   * This function will toggle the display of the help side panel
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  toggleHelpTab() {
    this.helpTab = !this.helpTab;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                            RESET MEMBER FIELDS 
  /**
   * This function will clear the inputs in the Add Member modal
   * 
   * @memberof MemberHandlerComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  resetMemberFields() {
    this.addMemberForm.reset();
    this.submitted = false;
  }

}
