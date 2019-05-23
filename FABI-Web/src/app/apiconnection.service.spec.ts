import { TestBed } from '@angular/core/testing';

import { APIconnectionService } from './apiconnection.service';

describe('ApiconnectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIconnectionService = TestBed.get(APIconnectionService);
    expect(service).toBeTruthy();
  });
});
