import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sample-div',
  templateUrl: './sample-div.component.html',
  styleUrls: ['./sample-div.component.scss']
})
export class SampleDivComponent implements OnInit {

  @Input() Number: string;          //The number of the sample
  @Input() Status: string;          //Status of the sample
  @Input() Details: string;         //Details of the sample

  constructor() { }

  ngOnInit() {
  }

}
