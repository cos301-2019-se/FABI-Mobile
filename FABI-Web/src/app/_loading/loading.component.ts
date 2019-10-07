/**
 * File Name: confirm.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\confirm\confirm.component.ts
 * Project Name: fabi-web
 * Created Date: Monday, June 24th 2019
 * Author: Team Nova - novacapstone@gmail.com
 * -----
 * Last Modified: Sunday, October 6th 2019
 * Modified By: Team Nova
 * -----
 * Copyright (c) 2019 University of Pretoria
 * 
 * <<license>>
 */


import * as core from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";


/**
 *  used to display a loading bar pop-up
 *
 * @export
 * @class LoadingComponent
 * @implements {core.OnInit}
 */
@core.Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements core.OnInit {

  constructor(@core.Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
