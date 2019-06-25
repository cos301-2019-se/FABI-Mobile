import { TestBed, inject, async } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AdminAPIService } from './admin-api.service';

describe('AdminAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      AdminAPIService,
    ]
  }));

  it('should be created', () => {
    const service: AdminAPIService = TestBed.get(AdminAPIService);
    expect(service).toBeTruthy();
  });

});