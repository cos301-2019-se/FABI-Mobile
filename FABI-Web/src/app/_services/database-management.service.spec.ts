import { TestBed } from '@angular/core/testing';

import { DatabaseManagementService } from './database-management.service';
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
describe('DatabaseManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
  }));

  it('should be created', () => {
    const service: DatabaseManagementService = TestBed.get(DatabaseManagementService);
    expect(service).toBeTruthy();
  });
});
