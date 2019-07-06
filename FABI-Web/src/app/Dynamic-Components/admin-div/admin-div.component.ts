import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-div',
  templateUrl: './admin-div.component.html',
  styleUrls: ['./admin-div.component.scss']
})
export class AdminDivComponent implements OnInit {

  @Input() Name: string;
  @Input() Surname: string;
  @Input() Email: string;

  constructor() { }

  ngOnInit() {
  }

}
