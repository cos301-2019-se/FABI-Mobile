import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-staff-div',
  templateUrl: './staff-div.component.html',
  styleUrls: ['./staff-div.component.scss']
})
export class StaffDivComponent implements OnInit {

  @Input() Name: string;
  @Input() Surname: string;
  @Input() Email: string;

  constructor() { }

  ngOnInit() {
  }

}
