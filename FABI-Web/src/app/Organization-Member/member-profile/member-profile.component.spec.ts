import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberProfileComponent } from './member-profile.component';
import { MaterialModule } from '../../materials';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('MemberProfileComponent', () => {
  let component: MemberProfileComponent;
  let fixture: ComponentFixture<MemberProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberProfileComponent ],
      imports: [MaterialModule,
      NoopAnimationsModule,
      HttpClientTestingModule, 
      MatSnackBarModule, 
      MatDialogModule,
      RouterTestingModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
