import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-div',
  templateUrl: './admin-div.component.html',
  styleUrls: ['./admin-div.component.scss']
})

/*
*   This class is called when dynamic elements pertaining information about administrators
*   are created and dynmically inserted into the selected HTML page
*/
export class AdminDivComponent implements OnInit {

  @Input() Name: string;      //This variable will be dynamically changed to the name of the administrator
  @Input() Surname: string;   //This variable will be dynamically changed to the surname of the administrator
  @Input() Email: string;     //This variable will be dynamically changed to the email of the adminsitrator

  constructor() { }

  ngOnInit() {
  }

}
