/**
 * File Name: pre-diagnosis.component.ts
 * File Path: c:\Users\Kendra\Documents\Varsity\Third Year\COS301\CAPSTONE\Git Repo\FABI-Mobile\FABI-Web\src\app\pre-diagnosis\pre-diagnosis.component.ts
 * Project Name: fabi-web
 * Created Date: Sunday, August 18th 2019
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
import { AuthenticationService } from 'src/app/_services/authentication.service';

@core.Component({
  selector: 'app-pre-diagnosis',
  templateUrl: './pre-diagnosis.component.html',
  styleUrls: ['./pre-diagnosis.component.scss']
})
export class PreDiagnosisComponent implements core.OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          GLOBAL VARIABLES
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  diagnosis: string;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                          CONSTRUCTOR
  /**
   * Creates an instance of PreDiagnosisComponent.
   * 
   * @param {AuthenticationService} authService for calling the *authentication* service
   * 
   * @memberof PreDiagnosisComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private authService: AuthenticationService,
    // @Inject(MAT_DIALOG_DATA) public diagnosis: any
  ) { }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                         NG ON INIT  
  /**
   * This function is called when the page loads
   * 
   * @memberof PreDiagnosisComponent
   */
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit() {
    if (!localStorage.getItem('pre-diagnosis')) {
      this.diagnosis = 'A pre-diagnosis could not be generated based on your sample form data.'
    }
    else {
      this.diagnosis = localStorage.getItem('pre-diagnosis');
      // localStorage.removeItem('pre-diagnosis');
    }
  }

}
