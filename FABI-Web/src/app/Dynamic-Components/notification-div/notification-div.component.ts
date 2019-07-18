import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification-div',
  templateUrl: './notification-div.component.html',
  styleUrls: ['./notification-div.component.scss']
})
export class NotificationDivComponent implements OnInit {

  @Input() Number: number;      //The number of the notification
  @Input() Type: string;        //The type of the notification
  @Input() Action: string;      //The action performed
  @Input() Date: string;        //The date of the action
  @Input() Details: string;     //The details of the notification

  constructor() { }

  ngOnInit() {
  }

}
