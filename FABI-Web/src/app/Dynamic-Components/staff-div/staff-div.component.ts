import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-staff-div',
  templateUrl: './staff-div.component.html',
  styleUrls: ['./staff-div.component.scss']
})

/*
*   This class is called when dynamic elements pertaining information about FABI/Organisation staff
*   members are created and dynmically inserted into the selected HTML page
*/
export class StaffDivComponent implements OnInit {

  @Input() Name: string;        //This variable is dynamically changed to the name of the staff member
  @Input() Surname: string;     //This variable is dynamically changed to the surname of the staff member
  @Input() Email: string;       //This variable is dynamically changed to the email of the staff member

  constructor() { }

  ngOnInit() {
  }

}
