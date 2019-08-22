import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmwMenuComponent } from './cmw-menu.component';

describe('CmwMenuComponent', () => {
  let component: CmwMenuComponent;
  let fixture: ComponentFixture<CmwMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmwMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmwMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
