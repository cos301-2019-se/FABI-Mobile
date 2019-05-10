//import { ClientFormData } from '../apiconnection.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { LoginInfo } from '../apiconnection.service';
// import { APIconnectionService } from '../apiconnection.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../error/error.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sample-form',
  templateUrl: './sample-form.component.html',
  styleUrls: ['./sample-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SampleFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
