import { TestBed, inject, async } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiConnectionService } from './api-connection.service';

describe('ApiConnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      ApiConnectionService,
    ]
  }));

  it('should be created', () => {
    const service: ApiConnectionService = TestBed.get(ApiConnectionService);
    expect(service).toBeTruthy();
  });


});
