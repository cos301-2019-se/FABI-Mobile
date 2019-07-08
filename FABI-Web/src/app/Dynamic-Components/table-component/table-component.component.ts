import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit {

  @Input() ColumnName: string;      //This variable will be dynamically changed to the name of the column

  constructor() { }

  ngOnInit() {
  }

}
