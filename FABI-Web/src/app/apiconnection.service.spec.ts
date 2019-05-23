import { TestBed, inject, async } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { APIconnectionService } from './apiconnection.service';

describe('ApiconnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      APIconnectionService,
    ]
  }));

  it('should be created', () => {
    const service: APIconnectionService = TestBed.get(APIconnectionService);
    expect(service).toBeTruthy();
  });
 
});
